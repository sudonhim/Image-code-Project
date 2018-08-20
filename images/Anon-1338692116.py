def getPixel( x,y ):
   r = sin(1*y*x*y)-sin(5*x*y*x)      g = sin(10*r)      b = tan(2*3.14*r)      r,g,b = r*155, g*155, b*155   
   return r%256,g%256,b%256