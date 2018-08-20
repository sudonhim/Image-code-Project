def getPixel( x,y ):
   r = x   g = y   b = 0   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256