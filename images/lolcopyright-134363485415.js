function setPixel(x,y) {
  var r=0, g=0, b=0;
  r=g=b = 255;
  
  x = 2*(x-0.5);
  y = 2*(y-0.5);
  
  var theta,rad;
  theta = atan(abs(y)/x);
  rad = sqrt(x*x+y*y);
  
  var circ_r, copy_r, d;
  circ_r = 0.8;
  copy_r = 0.4;
  d = 0.05;
  
  if (circ_r-d < rad && rad < circ_r+d) {
    r=g=b = 0;
  }
  
  if ((theta > 0.7) || x<0) {
    if (theta > 0) {
    	d = min(d,d+(theta-0.8));
    }
    if (copy_r-d < rad && rad < copy_r+d) {
      r=g=b = 0;
    }
  }
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}