def getPixel( x,y ):
   r = sqrt(x*y + y*x)   g = y   b = sqrt((12-x)*(3-y) + x*x)   r,g,b = r*255,g*255,b*255   
   return r%256,g%256,b%256