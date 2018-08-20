def getPixel( x,y ):
   r = 100*abs(sin(4.2*x))+100*abs(cos(2*y))   g = 100*abs(sin(4.2*x))+100*abs(cos(2*y))   b = 100*abs(sin(4.2*x))+100*abs(cos(2*y))
   return r%256,g%256,b%256