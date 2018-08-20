def getPixel( x,y ):
   x = (x-0.5)*exp(x)   y = (y-0.5)*exp(y)      cx = (10*x)%1   cy = (10*y)%1      f = 1 - cx**2 - cy**2      if f>0:     r = 255*sqrt(f)   else:     r = 0      g=b=0
   return r%256,g%256,b%256