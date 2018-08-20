def getPixel( x,y ):
   r=255*x*x/1+(y*y+y*y)*cos(x);   b=155*x*x/1+(y*y+y*y)*cos(y);   g=75*x*x/1+(y*y+y*y)*cos(x*y);   
   return r%256,g%256,b%256