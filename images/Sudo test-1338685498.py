def getPixel( x,y ):
   grey = int(10*sin(x*15))/10.0*(1-y)      r = grey   g = grey   b = grey      r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256