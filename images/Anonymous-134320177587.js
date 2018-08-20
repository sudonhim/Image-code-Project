function setPixel(x,y) {
  var r=0, g=0, b=0;
  y = 4*(y-0.5);
  x = 4*(x-0.24);
  
  res = (1.0+y)/50;
  
  gridx = floor(x/res);
  gridy = floor(y/res);
  
  height = 0.7*sin(gridx/PI);
  dist = abs((gridy*0.1+0.05)-height)
      
  intensity = 1-max(0, 1-dist);
  
  r=g=b= intensity*255;
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}