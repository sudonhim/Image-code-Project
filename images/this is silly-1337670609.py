def getPixel( x,y ):
   r = cos(255*x)*134   g = 255*y*675   b = 255*x*30
   return r%256,g%256,b%256