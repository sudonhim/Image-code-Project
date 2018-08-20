def getPixel( x,y ):
   r = 1/(tan(x**2)+.0000001)   g = tan(2**y**x)   b = sin((x*y)*2)   r,g,b = r*255,g*255,b*255
   return r%256,g%256,b%256