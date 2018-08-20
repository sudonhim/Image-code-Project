def getPixel( x,y ):
   r = 0   g = 0   b = 100*abs(sin(18.4*x))+1000*abs(cos(9.2*y))
   return r%256,g%256,b%256