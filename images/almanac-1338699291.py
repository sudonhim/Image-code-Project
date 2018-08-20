def getPixel( x,y ):
   r = tan(x * 3.14)   g = abs(0.5 - y) * 2   b = (x**2 + y**2)/2   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256