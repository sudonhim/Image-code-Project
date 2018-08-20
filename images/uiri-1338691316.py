def getPixel( x,y ):
   h = (x**2 + y**2)**(1/2)   c = 1/(max(x,y)+10**10)   g = (x/(y+c))*255   b = (x/(h+c))*255   r = (y/(h+c))*255
   return r%256,g%256,b%256