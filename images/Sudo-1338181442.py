def getPixel( x,y ):
   x = 2*(x-0.5)**2*(0.8+2*y)   y = 2*(y-0.5)**2      if x%0.1>y%0.1:     c = x%0.2*10     cv = x   else:     c = y%0.2*10     cv = y         r=g=b=c   #g *= 0.8   if (cv/0.2)%2==0:      r *= 0.8   else:      b *= 0.8               r,g,b = 255*r,255*g,255*b
   return r%256,g%256,b%256