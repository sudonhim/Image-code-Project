def getPixel( x,y ):
   r = 0*x   g = 0*cos(3*x)   b = 100*abs(sin(9.4*x))+100*abs(cos(9.4*y))   
   return r%256,g%256,b%256