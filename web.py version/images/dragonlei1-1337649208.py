def getPixel( x,y ):
   r = sin(1*x)-sin(10*y)
   g = sin(10*r)
   b = g
   r,g,b = r*255, g*255, b*255
   return r%255,g%255,b%255