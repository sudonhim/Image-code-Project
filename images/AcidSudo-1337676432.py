def getPixel( x,y ):
   d = sqrt((x)**2+(y-0.5)**2)      if x==0:      theta = atan(99999999999)   else:      theta = atan((y-0.5)/(x))      sp = sin(d*8*pi+theta*pi)      r = ((d*8*pi+theta*pi)/(2*pi)-(d*8*pi+theta*pi)%(2*pi))*255/(2*pi)   b = 255*max(0,-1*sp)   g = 255*max(0,sp)
   return r%256,g%256,b%256