def getPixel( x,y ):
   r = cos(3.14*x)-sin(3.14*y)   g = tan(2*3.14*r)      r *= 255   g *= 255   b =g   
   return r%256,g%256,b%256