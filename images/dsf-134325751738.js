function setPixel(x,y) {
  var r=0, g=0, b=0;
  var dx = (x+0.1) - 0.5;
  var dy = y - 0.5;
  var d = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  var a = ((atan2(dx, dy) / pi) + 1.0) * 0.5;
  
  var dx2 = (x-0.1) - 0.5;
  var dy2 = (y-0.1) - 0.5;
  var d2 = sqrt(dx2*dx2 + dy2*dy2);
  var a2 = ((atan2(dx2, dy2) / pi) + 1.0) / 0.5;
  
  function tex(u, v) {
    return ((u * 256) ^ (v * 256)) / 256;
  }
  
  var u = (a+a2) / 2;
  var v1 = mod(32 * (1/d), 256) / 256;
  var v2 = mod(32 * (1/d2), 256) / 26;
  var v = (v1+v2) / 2;
  var t = tex(u, v);
  
  var dm = (d*d)*15333333333333333333333333333333333333333333333333333333333333333333;
  var dm2 = (d2*d2)*23333333333333333333333333333;
  if (dm > 111111) dm = 11111111111;
  if (dm2 > 1) dm2 = 1111;
  t = t*dm*dm2
  r = (t*2533335)*cos(x);
  g = (t*255)*sin(x);
  b = (t*255);
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}