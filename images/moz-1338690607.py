def getPixel( x,y ):
   if x%2==0:       r = x   else:       r = y      if y%2==0:       g = y   else:       g = x   b = x*y   r,g,b = r*255,g*255,b*2040
   return r%256,g%256,b%256