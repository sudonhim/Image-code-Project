def getPixel( x,y ):
   stripe = (y+(x-0.5)**2)%0.1
   r = 255*stripe
   g = 128*stripe+(y+(x-0.5)**2)/0.1*64
   b = 128*stripe+128*abs((x-0.5)*2)
   return r,g,b