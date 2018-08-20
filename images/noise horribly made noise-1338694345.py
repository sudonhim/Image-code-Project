def getPixel( x,y ):
   r = sin(cos(tan(tan(x*20))))/sin(cos(tan(tan(y*20))))      g = sin(cos(tan(tan(x*30))))/sin(cos(tan(tan(y*30))))      b = sin(cos(tan(tan(x*40))))/sin(cos(tan(tan(y*40))))      i=0      while (i<10):    r=r+b    g=g+r    b=b+g    i=i+1      r,g,b = r*255, g*255, b*255
   return r%256,g%256,b%256