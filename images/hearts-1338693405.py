def getPixel( x,y ):
   mi = 16   x0 = x * 3.5 - 2.5   y0 = y * 2 - 1      mx = 0   my = 0      i = 0      while (i < mi):       if (mx**2 + my**2 >= 4):           break       (mx,my) = (mx*mx - my*my + x0, 2*mx*my + y0)       i = i + 1      r = (255/mi)*i   b = r   g = r
   return r%256,g%256,b%256