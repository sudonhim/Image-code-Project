def getPixel( x,y ):
   d = sqrt((x-0.5)**2+(y-0.5)**2)      if x==0.5:      theta = atan(99999999999)   else:      theta = atan((y-0.5)/(x-0.5))      sp = sin(d*8*pi+theta*pi)      r = 255*max(0,sp)   b = 255*max(0,-1*sp)   g = 0
   return r%256,g%256,b%256