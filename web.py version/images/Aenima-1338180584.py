def getPixel( x,y ):
   r = sinh(3.14*x)-cosh(3.14*y)   g = tanh(2*3.14*r)       r *= 255   g *= 255   b =g
   return r%256,g%256,b%256