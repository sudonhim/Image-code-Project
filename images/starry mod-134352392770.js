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
    var moon_c = max(0, 128 - (255*pow(moon_d,1.2)));
    r=g=b= moon_c*2;
    b *= 0.9;
    var dark_moon = pow(moon_x+0.2,2)+pow(moon_y*0.9+0.1,2);
    if (dark_moon < moon_r*moon_r) {
      r=g=b=15;
    }
  } else {
    if (y > c) {
      if ((y-0.1) > c) {
        r = 10;
        g = 100+10*random();
        b = 50;
      } else {
        r=b=200*(y-c)/0.1;
        g = 255*(y-c)/0.1;
      }
    } else {
      var n = random();
      if (n < 0.004)
        r=g=b=255;
    }
  }
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}