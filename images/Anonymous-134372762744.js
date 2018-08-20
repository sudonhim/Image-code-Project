function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = x-0.5;
  y = y-0.5;
  
  var z = pow(x,2)+pow(y,2);
  
  var disp = x/z;
  
  var stripe = mod(floor(8*disp),2);
  
  var glow=0;
  var f = 1.0-(pow(x,2)+pow(y,2));
  if (f>=0){
    glow = pow(f,3);
  }
  
  r = max(stripe,glow);
  
  r *= 255*random();
  r = min(r,glow*200);
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}