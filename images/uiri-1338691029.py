def getPixel( x,y ):
   h = (x**2 + y**2)**(1/2)   r = (x/(y+0.1))*255   g = (x/(h+0.1))*255   b = (y/(h+0.1))*255
   return r%256,g%256,b%256