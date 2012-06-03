def getPixel( x,y ):
   x = 2*x-1   y = 2*y-1      z = sqrt(x**2+y**2)      r = 0   g = abs(128*(sin(4*pi*(y-z))+sin(4*pi*(x-z))))   b = 0
   return r%256,g%256,b%256