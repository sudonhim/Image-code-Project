function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = x+sqrt(abs(y-0.5));
  
  if (x < 0.5){
    	r = 100;
    	g = 200
      b = 50;
  }
  if (x >= 0.5){
    	b = 100;
    	g = 200;
      r = 50;
  }	
  
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}