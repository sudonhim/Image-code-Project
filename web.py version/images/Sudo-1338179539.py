def getPixel( x,y ):
   c = max(x%0.2,y%0.2)*10      r=g=b=c      r,g,b = 255*r,255*g,255*b
   return r%256,g%256,b%256