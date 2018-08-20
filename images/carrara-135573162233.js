function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 255;
  g = y * 255;
  b = 0;
  
  var x1 = y*x*x-x*y*y
      
  b=g
   r=b
     
  var x2=345921
     
  b=x2*x1/2
  r=x2*x1
  g=x2*x1/4
  
   
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}