param(
  [string]$Executable = "$env:LOCALAPPDATA\Programs\@opencodedesktop\OpenCode.exe",
  [string]$Icon = "$env:LOCALAPPDATA\Programs\@opencodedesktop\resources\icons\icon.ico"
)
$ErrorActionPreference = 'Stop'
Add-Type -TypeDefinition @'
using System;
using System.IO;
using System.ComponentModel;
using System.Runtime.InteropServices;
public static class PlusExecutableIcon {
  [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
  static extern IntPtr BeginUpdateResource(string path, bool deleteExisting);
  [DllImport("kernel32.dll", SetLastError=true)]
  static extern bool UpdateResource(IntPtr handle, IntPtr type, IntPtr name, ushort language, byte[] data, uint size);
  [DllImport("kernel32.dll", SetLastError=true)]
  static extern bool EndUpdateResource(IntPtr handle, bool discard);
  public static void Apply(string exe, string icon) {
    byte[] bytes=File.ReadAllBytes(icon);
    ushort count=BitConverter.ToUInt16(bytes,4);
    if(BitConverter.ToUInt16(bytes,0)!=0 || BitConverter.ToUInt16(bytes,2)!=1 || count==0) throw new InvalidDataException("Invalid ICO");
    byte[] group=new byte[6+14*count];
    Array.Copy(bytes,0,group,0,6);
    IntPtr handle=BeginUpdateResource(exe,false);
    if(handle==IntPtr.Zero) throw new Win32Exception();
    bool done=false;
    try {
      for(int i=0;i<count;i++) {
        int entry=6+16*i;
        uint length=BitConverter.ToUInt32(bytes,entry+8), offset=BitConverter.ToUInt32(bytes,entry+12);
        byte[] image=new byte[length];Array.Copy(bytes,offset,image,0,length);
        ushort id=(ushort)(i+1);
        if(!UpdateResource(handle,(IntPtr)3,(IntPtr)id,1033,image,length)) throw new Win32Exception();
        Array.Copy(bytes,entry,group,6+14*i,12);
        Array.Copy(BitConverter.GetBytes(id),0,group,6+14*i+12,2);
      }
      if(!UpdateResource(handle,(IntPtr)14,(IntPtr)1,1033,group,(uint)group.Length)) throw new Win32Exception();
      if(!EndUpdateResource(handle,false)) throw new Win32Exception();
      done=true;
    } finally { if(!done) EndUpdateResource(handle,true); }
  }
}
'@
[PlusExecutableIcon]::Apply($Executable, $Icon)
Write-Output 'Embedded O+ executable icon updated.'
