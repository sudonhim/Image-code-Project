def getPixel( x,y ):
   r = sqrt(x*y + y*x)   g = x   b = sqrt((3-x)*(1-y) + x*x)   r,g,b = r*255,g*255,b*255   
   return r%256,g%256,b%256