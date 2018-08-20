def getPixel( x,y ):
   r=255/(x+1)   g=255/(y+1)   b=255/((x*y)+1)
   return r%256,g%256,b%256