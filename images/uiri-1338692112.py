def getPixel( x,y ):
   # https://jeremykun.wordpress.com/2012/01/01/random-psychedelic-art/ Add random so I can implement some of these here :D      r = sin(pi*x-(pi*y))*255   g = cos(pi*x*y)*255   b = sin(pi*y-(pi*x))*255
   return r%256,g%256,b%256