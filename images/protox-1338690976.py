def getPixel( x,y ):
   r = (sin(x*1) + 1) * 128   g = (sin(x*1) + 1) * 128   b = (sin(x*1) + 1) * 128   r,g,b = r*144,g*177,b*231
   return r%256,g%256,b%256