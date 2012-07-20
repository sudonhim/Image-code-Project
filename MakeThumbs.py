from PIL import Image
import glob, os, sys

size = (200,200)

for infile in glob.glob("images/*.png"):
    filepath, ext = os.path.splitext(infile)
    im = Image.open(infile)
    im.thumbnail(size, Image.ANTIALIAS)
    if sys.platform == "win32":
        sep = '\\'
    else:
        sep = '/'
    name = filepath.split( sep )[-1]
    im.save("images/thumbnails/"+name+"-thumb.png", "PNG")
