def getPixel( x,y ):
   x = 4*(x-0.5)   y = 4*(y-0.5)      f = (x**2+3*y**2)*exp(0-x**2-y**2)      g = 1000*sqrt(f)   r = abs(x)*400*f   b = abs(y)*500*f
   return r%256,g%256,b%256