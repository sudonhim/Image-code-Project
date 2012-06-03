def getPixel( x,y ):
   r = sin(3.14*x)-sin(3.14*y)
   g = sin(2*3.14*r)
   b = sin(2*3.14*g)
   return r%255,g%255,b%255