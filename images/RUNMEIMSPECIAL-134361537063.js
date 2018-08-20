function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 2*(x-0.5);
  y = 2*(y-0.5);
  
  if (typeof cScheme === "undefined") {
    cScheme = floor(random()*100);
  }
  
  
  var theta,rad,h,c;
  theta = atan(x/y);
  h = sin(theta);
  rad = sqrt(x*x+y*y);
  
  c = floor(mod(h+rad+0.1,1)*5)*cScheme;
  
  r = sin(c)*255;
  g = cos(c)*255;
  b = tan(c)*255;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}