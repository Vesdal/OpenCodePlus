// Sets VS_VERSION_INFO display strings of a Windows executable in place.
// Usage: ExeVersionPatch.exe <exePath> Key=Value [Key=Value...]
// Allowed keys: FileDescription, ProductName, InternalName, OriginalFilename.
// Only string-table values change; version numbers, checksums of code, and all
// other resources are preserved. Replacement strings may be longer than the
// originals: the version resource is rebuilt with recomputed lengths.
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

static class ExeVersionPatch
{
    const uint LOAD_LIBRARY_AS_DATAFILE = 2;
    const uint LOAD_LIBRARY_AS_IMAGE_RESOURCE = 0x20;
    const int RT_VERSION = 16;

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern IntPtr LoadLibraryEx(string file, IntPtr reserved, uint flags);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool FreeLibrary(IntPtr handle);
    [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr FindResource(IntPtr handle, IntPtr name, IntPtr type);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern IntPtr LoadResource(IntPtr handle, IntPtr resource);
    [DllImport("kernel32.dll")]
    static extern IntPtr LockResource(IntPtr resource);
    [DllImport("kernel32.dll")]
    static extern uint SizeofResource(IntPtr handle, IntPtr resource);
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern IntPtr BeginUpdateResource(string file, bool deleteExisting);
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern bool UpdateResource(IntPtr handle, IntPtr type, IntPtr name, ushort language, byte[] data, uint size);
    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool EndUpdateResource(IntPtr handle, bool discard);

    sealed class Node
    {
        public ushort ValueLength;
        public ushort Type;
        public string Key = "";
        public byte[] Value;
        public readonly List<Node> Children = new List<Node>();
    }

    static ushort U16(byte[] b, int o) { return (ushort)(b[o] | (b[o + 1] << 8)); }

    static bool IsTableKey(string key)
    {
        if (key.Length != 8) return false;
        foreach (char c in key)
            if (!((c >= '0' && c <= '9') || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f'))) return false;
        return true;
    }

    static bool Debug = Environment.GetEnvironmentVariable("EXEVERPATCH_DEBUG") == "1";

    static int ReadBlock(byte[] b, int off, Node node, int depth)
    {
        int start = off;
        if (off + 6 > b.Length) throw new Exception("header overrun at " + off);
        int length = U16(b, off);
        node.ValueLength = U16(b, off + 2);
        node.Type = U16(b, off + 4);
        off += 6;
        int keyStart = off;
        while (!(b[off] == 0 && b[off + 1] == 0)) off += 2;
        node.Key = Encoding.Unicode.GetString(b, keyStart, off - keyStart);
        off += 2;
        if (Debug) Console.Error.WriteLine(new string(' ', depth * 2) + node.Key + " len=" + length + " vlen=" + node.ValueLength + " type=" + node.Type + " @" + start);
        off = start + ((off - start + 3) & ~3);
        bool container = node.Key == "VS_VERSION_INFO" || node.Key == "StringFileInfo"
            || node.Key == "VarFileInfo" || IsTableKey(node.Key);
        if (node.Key == "VS_VERSION_INFO")
        {
            node.Value = new byte[52];
            Buffer.BlockCopy(b, off, node.Value, 0, 52);
            off += 52;
        }
        if (container)
        {
            while (off < start + length)
            {
                Node child = new Node();
                off = ReadBlock(b, off, child, depth + 1);
                node.Children.Add(child);
            }
        }
        else
        {
            int valueBytes = node.Type == 1 ? node.ValueLength * 2 : node.ValueLength;
            node.Value = new byte[valueBytes];
            Buffer.BlockCopy(b, off, node.Value, 0, valueBytes);
            off += valueBytes;
            off = start + ((off - start + 3) & ~3);
        }
        return off;
    }

    static void PutU16(List<byte> o, ushort v) { o.Add((byte)(v & 255)); o.Add((byte)(v >> 8)); }

    static void WriteBlock(List<byte> o, Node node)
    {
        int start = o.Count;
        PutU16(o, 0);
        PutU16(o, node.ValueLength);
        PutU16(o, node.Type);
        foreach (char c in node.Key) PutU16(o, c);
        PutU16(o, 0);
        while (((o.Count - start) & 3) != 0) o.Add(0);
        if (node.Value != null) o.AddRange(node.Value);
        foreach (Node child in node.Children) WriteBlock(o, child);
        while (((o.Count - start) & 3) != 0) o.Add(0);
        int length = o.Count - start;
        o[start] = (byte)(length & 255);
        o[start + 1] = (byte)((length >> 8) & 255);
    }

    static void Fail(string message)
    {
        Console.Error.WriteLine("ExeVersionPatch: " + message);
    }

    static int Main(string[] args)
    {
        if (args.Length < 2)
        {
            Fail("Usage: ExeVersionPatch.exe <exePath> Key=Value [Key=Value...]");
            return 2;
        }
        var allowed = new HashSet<string>(StringComparer.Ordinal) { "FileDescription", "ProductName", "InternalName", "OriginalFilename" };
        var patch = new Dictionary<string, string>(StringComparer.Ordinal);
        for (int i = 1; i < args.Length; i++)
        {
            int eq = args[i].IndexOf('=');
            if (eq <= 0 || !allowed.Contains(args[i].Substring(0, eq)))
            {
                Fail("Only FileDescription, ProductName, InternalName and OriginalFilename may be patched.");
                return 2;
            }
            patch[args[i].Substring(0, eq)] = args[i].Substring(eq + 1);
        }
        byte[] data;
        var languages = new List<ushort>();
        IntPtr library = LoadLibraryEx(args[0], IntPtr.Zero, LOAD_LIBRARY_AS_DATAFILE | LOAD_LIBRARY_AS_IMAGE_RESOURCE);
        if (library == IntPtr.Zero)
        {
            Fail("Cannot open executable (locked or missing): " + args[0]);
            return 1;
        }
        try
        {
            IntPtr found = FindResource(library, new IntPtr(1), new IntPtr(RT_VERSION));
            if (found == IntPtr.Zero)
            {
                Fail("No version resource in " + args[0]);
                return 1;
            }
            IntPtr loaded = LoadResource(library, found);
            if (loaded == IntPtr.Zero)
            {
                Fail("Cannot load version resource.");
                return 1;
            }
            IntPtr locked = LockResource(loaded);
            uint size = SizeofResource(library, found);
            byte[] buffer = new byte[size];
            Marshal.Copy(locked, buffer, 0, (int)size);
            Node root = new Node();
            ReadBlock(buffer, 0, root, 0);
            if (root.Key != "VS_VERSION_INFO")
            {
                Fail("Unexpected version resource layout.");
                return 1;
            }
            int tables = 0;
            foreach (Node info in root.Children)
            {
                if (info.Key != "StringFileInfo") continue;
                foreach (Node table in info.Children)
                {
                    tables++;
                    ushort lang = ushort.Parse(table.Key.Substring(0, 4), System.Globalization.NumberStyles.HexNumber);
                    if (!languages.Contains(lang)) languages.Add(lang);
                    foreach (var kv in patch)
                    {
                        Node entry = table.Children.Find(x => x.Key == kv.Key);
                        if (entry == null)
                        {
                            entry = new Node { Type = 1, Key = kv.Key };
                            table.Children.Add(entry);
                        }
                        entry.Type = 1;
                        entry.Value = Encoding.Unicode.GetBytes(kv.Value + "\0");
                        entry.ValueLength = (ushort)(kv.Value.Length + 1);
                    }
                }
            }
            if (tables == 0 || languages.Count == 0)
            {
                Fail("No string tables found.");
                return 1;
            }
            var output = new List<byte>();
            WriteBlock(output, root);
            data = output.ToArray();
        }
        finally
        {
            FreeLibrary(library);
        }
        IntPtr update = BeginUpdateResource(args[0], false);
        if (update == IntPtr.Zero)
        {
            Fail("Cannot open executable for update (locked?): " + args[0]);
            return 1;
        }
        bool ok = true;
        foreach (ushort lang in languages)
            if (!UpdateResource(update, new IntPtr(RT_VERSION), new IntPtr(1), lang, data, (uint)data.Length)) ok = false;
        if (!EndUpdateResource(update, !ok))
        {
            Fail("Cannot commit version resource update.");
            return 1;
        }
        if (!ok)
        {
            Fail("Version resource update failed.");
            return 1;
        }
        return 0;
    }
}
