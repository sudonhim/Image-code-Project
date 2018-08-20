function setPixel(x,y) {
  var r=0, g=0, b=0;
  y = 4*(y-0.5);
  x = 4*(x-0.5);
  
  
  gridx = floor(x/0.1);
  gridy = floor(y/0.1);
  
  height = 1.9997*sin(gridx/PI);
  dist = abs((gridy*.3+0.55)-height)
      
  intensity = 9-max(0, 9-dist);
  
  r=g=b= intensity*255;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}