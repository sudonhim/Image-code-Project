def getPixel( x,y ):
   r = (sin(x*20) + 1) * 128   g = (cos(x*20) + 1) * 128   b = (sin(x*40) + 1) * 128   
   return r%256,g%256,b%256