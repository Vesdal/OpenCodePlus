using System;
using System.IO;
using System.IO.Compression;
using System.Diagnostics;
using System.Reflection;
using System.Windows.Forms;

internal static class PackageLauncher {
    [STAThread] private static void Main() {
        try {
            bool installer = Assembly.GetExecutingAssembly().GetName().Name.Contains("Setup");
            string directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), installer ? "Programs\\OpenCodePlus" : "OpenCodePlus\\Portable-20261010");
            if (installer && MessageBox.Show("Install OpenCode+ for the current user? Existing projects and session history will not be deleted.", "OpenCode+ Setup", MessageBoxButtons.OKCancel) != DialogResult.OK) return;
            string marker = Path.Combine(directory, "package.complete");
            if (installer || !File.Exists(marker)) {
                Directory.CreateDirectory(directory);
                using (Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("payload.zip"))
                using (ZipArchive archive = new ZipArchive(stream, ZipArchiveMode.Read)) {
                    foreach (ZipArchiveEntry entry in archive.Entries) {
                        string target = Path.GetFullPath(Path.Combine(directory, entry.FullName));
                        if (!target.StartsWith(Path.GetFullPath(directory) + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase)) throw new IOException("Invalid package path");
                        if (entry.Name.Length == 0) { Directory.CreateDirectory(target); continue; }
                        Directory.CreateDirectory(Path.GetDirectoryName(target));
                        entry.ExtractToFile(target, true);
                    }
                }
                File.WriteAllText(marker, "OpenCode+ 2.0.24 customization 2026-10-10");
            }
            string launcher = Path.Combine(directory, "resources", "launch-opencode-plus.vbs");
            if (installer) {
                Type type = Type.GetTypeFromProgID("WScript.Shell");
                dynamic shell = Activator.CreateInstance(type);
                foreach (string folder in new[] {Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), Environment.GetFolderPath(Environment.SpecialFolder.Programs)}) {
                    dynamic shortcut = shell.CreateShortcut(Path.Combine(folder, "OpenCodePlus.lnk"));
                    shortcut.TargetPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.System), "wscript.exe");
                    shortcut.Arguments = "\"" + launcher + "\"";
                    shortcut.WorkingDirectory = directory;
                    shortcut.IconLocation = Path.Combine(directory, "OCodePlus.exe");
                    shortcut.Save();
                }
                MessageBox.Show("Installation completed. Use the OpenCodePlus shortcut to launch the app.", "OpenCode+ Setup");
            } else {
                Process.Start(new ProcessStartInfo(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.System), "wscript.exe"), "\"" + launcher + "\"") {UseShellExecute = false, CreateNoWindow = true, WorkingDirectory = directory});
            }
        } catch (Exception error) { MessageBox.Show(error.Message, "OpenCode+", MessageBoxButtons.OK, MessageBoxIcon.Error); }
    }
}
