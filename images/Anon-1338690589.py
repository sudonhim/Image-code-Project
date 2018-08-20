def getPixel( x,y ):
   grey = int(100*sin(x*15))/5.0*(10-y)   r = sqrt(x*x + y*y)   g = grey   b = sqrt((x-1)*(x-1) + y*y)      r,g,b = r*255,g*255,b*255   
   return r%256,g%256,b%256