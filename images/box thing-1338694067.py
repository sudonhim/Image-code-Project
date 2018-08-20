def getPixel( x,y ):
   r = sin(x*3.14)   g = cos(y*3.14+1.57)   b = r**2+g**2   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256