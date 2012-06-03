def getPixel( x,y ):
   r = hypot((x-0.5), (y-0.5))*2   b = (abs(x-0.5)**3 + abs(y-0.5)**2)   if r+b < 1:     g = 1   else:     g = 0   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256