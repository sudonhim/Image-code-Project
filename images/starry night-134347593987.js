function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 4*(x-0.5);
  y = 4*(y-0.5);
  var s = sin((x+5.9)*2)*sin((x+1234) * 0.65)*sin((x+3456)*0.6);
  var d = abs((y-0.9) - s);
  var c = max(0, 1 - d);
  
  var moon_x = x - 1;
  var moon_y = y + 1;
  var moon_r = 0.68;
  var moon_d = moon_x * moon_x + moon_y * moon_y;
  if (moon_d < moon_r*moon_r) {
    var moon_c = max(0, 128 - (255*moon_d));
    r=moon_c*2;
    g=moon_c*x*1.8;
    b=moon_c*2;
  } else {
    if (y > c) {
      if ((y-0.1) > c) {
        r = 10;
        g = 130;
        b = 50;
      } else {
        r=g=b=255;
      }
    } else {
      var n = random();
      if (n < 0.004)
        r=g=b=255;
    }
  }
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}