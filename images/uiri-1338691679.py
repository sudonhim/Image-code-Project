def getPixel( x,y ):
   h = (x**2 + y**2)**(1/2)   c = 1/(0 - (x**2-1))   r = (y/(x+c))   g = (x/(h+c))   b = (h/(y+c))   while g < 100:       g += 1   while b < 100:       b += 1   while r < 100:       r += 1   g *= (2.5*(100-g))   r *= (2.5*(100-r))   b *= (2.5*(100-b))
   return r%256,g%256,b%256