Add-Type -AssemblyName System.Drawing
$srcPath = 'C:\Users\mirec\.gemini\antigravity\brain\16c64ded-8b2d-4734-8d41-20750d137747\lidl_blue_wheel_1784056496935.png'
$destPath = 'public\app-icon.png'

$img = [System.Drawing.Image]::FromFile($srcPath)
$bmp = new-object System.Drawing.Bitmap $img

# Crop out the outer 30% to guarantee absolute full-bleed yellow (taking only the central 70%)
$cropW = [math]::Round($bmp.Width * 0.70)
$cropH = [math]::Round($bmp.Height * 0.70)
$offX = [math]::Round(($bmp.Width - $cropW) / 2)
$offY = [math]::Round(($bmp.Height - $cropH) / 2)

$rect = New-Object System.Drawing.Rectangle($offX, $offY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$cropped.Dispose()
