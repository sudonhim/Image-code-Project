def getPixel( x,y ):
   x = sqrt(x)
   y = sqrt(y)
   b = 5*(x%0.2)-5*(y%0.2)
   r,g,b = 255, 255, b*255
   return r%255,g%255,b%255