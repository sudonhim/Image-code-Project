def getPixel( x,y ):
   x = 4*(x-0.5)   y = 4*(y-0.5)      f = cos(abs(x)+abs(y))*(abs(x)+abs(y))      g = 255*f   r = x*f   b = y*f
   return r%256,g%256,b%256