Add-Type -AssemblyName System.Drawing
$srcPath = 'C:\Users\mirec\.gemini\antigravity\brain\16c64ded-8b2d-4734-8d41-20750d137747\lidl_icon_prop1_1784055029830.png'
$destPath = 'public\app-icon.png'

$img = [System.Drawing.Image]::FromFile($srcPath)
$bmp = new-object System.Drawing.Bitmap $img

$cropW = [math]::Round($bmp.Width * 0.85)
$cropH = [math]::Round($bmp.Height * 0.85)
$offX = [math]::Round(($bmp.Width - $cropW) / 2)
$offY = [math]::Round(($bmp.Height - $cropH) / 2)

$rect = New-Object System.Drawing.Rectangle($offX, $offY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$cropped.Dispose()
