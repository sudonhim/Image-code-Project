def getPixel( x,y ):
   r = sinh(y*2)- cosh(x*2)   g = tanh(2*r)       r *= 255   g *= 255   b = r*g/2
   return r%256,g%256,b%256