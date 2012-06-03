def getPixel( x,y ):
   x = x-x%0.1   y = y-y%0.1+x**2   r = 255*x**2   g = 255*y   b = 0
   return r%256,g%256,b%256