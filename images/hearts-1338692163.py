def getPixel( x,y ):
   xm = x*2 - 1   ym = y * 2 - 1      xm *= 8   ym *= -10      x2 = xm**2   y2 = (ym - (2 * (abs(xm) + x2 - 6)) / (3 * (abs(x) + x2 + 2)))**2      g = 0   b = 0   r = 255- (x2 + y2)*10
   return r%256,g%256,b%256