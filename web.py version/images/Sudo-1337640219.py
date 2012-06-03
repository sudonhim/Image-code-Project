def getPixel( x,y ):
   d = sqrt((x-0.5)**2+(y-0.5)**2)
   if x==0.5:
      theta = 5
   else:
      theta = 5*atan((y-0.5)/(x-0.5))
   grey = 255*d+128*0.5*abs(sin(theta))
   
   g=b= 255*abs(sin(d*3.14*10))
   
   r = 255*abs(sin(theta))
   return r%255,g%255,b%255