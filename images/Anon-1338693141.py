def getPixel( x,y ):
   # https://jeremykun.wordpress.com/2012/01/01/random-psychedelic-art/ Add random so I can implement some of these here :D   var = sin(pi*y-(pi*x))*255   vir = sin(pi*x-(pi*y))   r = sin(pi*x-(pi*y))*255   g = cos(pi*x*y*var*vir)*255   b = var*vir   
   return r%256,g%256,b%256