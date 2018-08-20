function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 255;
  g = y * 255;
  b = 0;
  
  var x1 = y*x
      
  
     
  var x2=115474
     
  b=x1*x2
  g=x1*x2
  
   
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}