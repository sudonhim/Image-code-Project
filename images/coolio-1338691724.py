def getPixel( x,y ):
   r = x/180   g = y/180   b = 0   r,g,b = sin(x) * 255, sin(y) * 255, cos(x) * sin(y) * 255
   return r%256,g%256,b%256