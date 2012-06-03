def getPixel( x,y ):
   r = g = b = 200      if x > 0.5:     b = 0     if y <= 0.5:       r = 0   if x <= 0.5:     g = 0     if y > 0.5:       r = 0     else:       b = 0
   return r%256,g%256,b%256