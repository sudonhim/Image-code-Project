def getPixel( x,y ):
   r = hypot((x-0.5), (y-0.5))*2
   return r%256,g%256,b%256