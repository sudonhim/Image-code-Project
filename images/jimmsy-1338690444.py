def getPixel( x,y ):
   r = x - sin(x%0.1*20)   g = y - sin(y%0.1*20)   b = r*g         r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256