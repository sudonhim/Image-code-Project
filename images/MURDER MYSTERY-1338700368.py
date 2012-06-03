def getPixel( x,y ):
   r = sin(x) * 2 * 255   g = sin(y) * 255   b = tan(x+y) + x**2      if b < 0.5:     r = 0      if r > 255:     r = 255      r,g,b = r,g,b*255
   return r%256,g%256,b%256