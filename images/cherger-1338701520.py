def getPixel( x,y ):
   r = x**2 + y**2 - 0.5   g = ((y - 0.5)**2 - 3 * (x)) * 3   b = (y**2 + x - 1) * 5      r,g,b = r*255*10,min(g*255, 255),min(b*255, 255)
   return r%256,g%256,b%256