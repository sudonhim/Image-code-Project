function setPixel(x,y) {
  var r,g,b;
  x -= 0.5;
  y -= 0.5;
  y *= -1;
  
  function sample(x,y) {
    var r,g,b;
    r=g=b=255;
    
    var rad = sqrt(x*x+y*y);
    var theta = atan2(x,y);
    
    if (0.35 < rad && rad < 0.45
        && -2.3 < theta && theta < 2.3) {
      r=g = 220;
      b = 230;
    }
    
    if (0.365 < rad && rad < 0.435
        && -2.26 < theta && theta < 1.3) {
      r = 240;
      g = 100;
      b = 70;
      if (rad < 0.37) {
        r *= 0.8;
        g *= 0.8;
        b *= 0.8;
      }
    }
    return new Array(r,g,b);
  }
  
  //Sample 4 sub-pixels
  for (var dx=-0.33; dx<=0.33; dx+=0.66) {
    for (var dy=-0.33; dy<=0.33; dy+=0.66) {
      x2 = x + dx/450;
      y2 = y + dy/450;
      arr = sample(x2,y2);
      r += arr[0]/4;
      g += arr[1]/4;
      b += arr[2]/4;
    }
  }
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}