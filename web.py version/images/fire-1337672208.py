def getPixel( x,y ):
   r = 255   g = 255*y*abs(sin(9.2*x))   b = 0
   return r%256,g%256,b%256