Add-Type -AssemblyName System.Drawing
$dir = Join-Path $env:LOCALAPPDATA 'Programs\OpenCodePlus\resources\icons'
New-Item -ItemType Directory -Path $dir -Force | Out-Null
$sizes = 16, 24, 32, 48, 64, 128, 256
$images = @()
foreach ($s in $sizes) {
  $k = $s / 256.0
  $bitmap = New-Object System.Drawing.Bitmap $s, $s
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = 'AntiAlias'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::Transparent)
  $black = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::Black)
  $r = 56 * $k; $d = 2 * $r
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0, 0, $d, $d, 180, 90); $path.AddArc($s - $d, 0, $d, $d, 270, 90)
  $path.AddArc($s - $d, $s - $d, $d, $d, 0, 90); $path.AddArc(0, $s - $d, $d, $d, 90, 90); $path.CloseFigure()
  $g.FillPath($black, $path)
  $ring = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), ([single](26 * $k))
  $g.DrawEllipse($ring, [single]((116 - 66) * $k), [single]((140 - 66) * $k), [single](132 * $k), [single](132 * $k))
  $g.FillEllipse($black, [single]((190 - 44) * $k), [single]((66 - 44) * $k), [single](88 * $k), [single](88 * $k))
  $plus = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), ([single][Math]::Max(1.5, 16 * $k))
  $plus.StartCap = 'Round'; $plus.EndCap = 'Round'
  $g.DrawLine($plus, [single](190 * $k), [single](40 * $k), [single](190 * $k), [single](92 * $k))
  $g.DrawLine($plus, [single](164 * $k), [single](66 * $k), [single](216 * $k), [single](66 * $k))
  $ms = New-Object IO.MemoryStream
  $bitmap.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  if ($s -eq 256) { $bitmap.Save((Join-Path $dir 'icon.png'), [System.Drawing.Imaging.ImageFormat]::Png) }
  $images += , @($s, $ms.ToArray())
  $g.Dispose(); $bitmap.Dispose(); $black.Dispose(); $ring.Dispose(); $plus.Dispose(); $path.Dispose(); $ms.Dispose()
}
$stream = [IO.File]::Create((Join-Path $dir 'icon.ico'))
$w = New-Object IO.BinaryWriter $stream
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$images.Count)
$offset = 6 + 16 * $images.Count
foreach ($img in $images) {
  $s = $img[0]; $b = $img[1]; $dim = if ($s -ge 256) { 0 } else { $s }
  $w.Write([byte]$dim); $w.Write([byte]$dim); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([uint16]1); $w.Write([uint16]32); $w.Write([uint32]$b.Length); $w.Write([uint32]$offset)
  $offset += $b.Length
}
foreach ($img in $images) { $w.Write($img[1]) }
$w.Dispose()
