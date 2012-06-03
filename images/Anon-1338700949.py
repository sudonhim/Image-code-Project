def getPixel( x,y ):
   r = sin(pi*x-(pi*y))   g = cos(pi*x*y)*(pi*r)   b = sin(cos(tan(tan(x*40))))/sin(cos(tan(tan(y*40))))      r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256