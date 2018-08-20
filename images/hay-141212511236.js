function setPixel(x,y) {
  var r,g,b;
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
  
  var hi = ("101000000000"+
            "111010000000"+
            "101010010101");
  
  y *= (x+0.5)+0.8
  y *= 3.5;
  y += 0.5;
  x *= 1.5;
  x +=0.4;
  x += y/5;
  if (0 < x && x < 1 && 0 < y && y < 1)
  if (hi[floor(y*3)*12+floor(x*12)] == "1") {
    r=g=b=255
  }
  
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}