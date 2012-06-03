def getPixel( x,y ):
   x = 4*(x-0.5)   y = 4*(y-0.5)      f = floor(exp(abs(x*y/2))+int(1/cos(x*y)))      g = 1000*f   r = abs(x)*400*f   b = abs(y)*500*f
   return r%256,g%256,b%256