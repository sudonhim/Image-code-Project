def getPixel( x,y ):
   r=(x>sin(y))*255   g=(x<sin(y))*255   b=(x>sin(y))*255
   return r%256,g%256,b%256