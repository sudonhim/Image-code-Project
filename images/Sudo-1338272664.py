def getPixel( x,y ):
   x = 4*(x-0.5)   y = 4*(y-0.5)      f = cos(abs(x)+abs(y))*(abs(x)+abs(y))      g = 255*f   r = x*g   b = y*g
   return r%256,g%256,b%256