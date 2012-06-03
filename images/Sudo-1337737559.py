def getPixel( x,y ):
   circs = [(1,2,1),(5,5,2),(2,5,1),(4,8,3),(7,3,1),(9,6,2),(8,3.5,1)]   x,y = 10*x,10*y      z=0   for cx,cy,s in circs:      a = s - ( (x-cx)**2 + (y-cy)**2 )      if a > 0:         z = sqrt(a)         break      r = 128*z   g = 128*z   b = 0
   return r%256,g%256,b%256