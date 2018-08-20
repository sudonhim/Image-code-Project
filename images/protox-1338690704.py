def getPixel( x,y ):
   r = x*12-1*3.14212532   g = y*3.14   b = 0*3.14   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256