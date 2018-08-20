function setPixel(x,y) {
  var r=0, g=0, b=0;
  if (x < 0.3){
    	r = 100;
    	g = 200
      b = 50
  }
  if (x >= 0.7){
    	b = 100;
    	g = 200
      r = 50
  }	
  
  if (y <= 0.7 && y >= 0.3){
  	g = 100;
      b = 200
      r = 50
  }
  
  
  if (x <= 0.7 && x >= 0.3){
  	r = 100;
      b = 200
      g = 50
  }
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}