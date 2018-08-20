def getPixel( x,y ):
   r = x   g = y   b = abs(r+g**6 - 0.5)      while b < 1:      b += 0.1      g += 0.05      r,g,b = r*255,min(g*255, 255),min(b*255, 255)
   return r%256,g%256,b%256