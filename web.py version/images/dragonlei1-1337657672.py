def getPixel( x,y ):
   r = sin(9*x)+ cos(6*y)
   g = exp(sin(9)+cos(8*r))
   b = g
   r,g,b = r*255, g*255, b*255
   return r%255,g%255,b%255