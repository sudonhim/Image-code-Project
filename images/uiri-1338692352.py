def getPixel( x,y ):
   # https://jeremykun.wordpress.com/2012/01/01/random-psychedelic-art/ Add random so I can implement some of these here :D      k = 10**15   r = sin(pi*x-(pi*y))*k   g = cos(pi*x)*k   b = sin(pi*y-(pi*x))*k
   return r%256,g%256,b%256