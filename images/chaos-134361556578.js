function setPixel(x,y) {
  var r=0, g=0, b=0;
  var dx = (x+0.1) - 0.5;
  var dy = y - 0.5;
  var d = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  var a = ((atan2(dx, dy) / pi) + 1.0) * 0.5;
  
  var dx2 = (x-0.1) - 0.5;
  var dy2 = (y-0.1) - 0.5;
  var d2 = sqrt(dx2*dx2 + dy2*dy2);
  var a2 = ((atan2(dx2, dy2) / pi) + 1.0) * 0.5;
  
  function tex(u, v) {
    return ((u * 16) ^ (v * 16));
  }
  
  var u = (a+a2) / 2;
  var v1 = mod(32 * (1/d), 256) / 256;
  var v2 = mod(32 * (1/d2), 256) / 256;
  var v = (v1+v2) / 2;
  var t = tex(u, v);
  
  var dm = (d*d)*20;
  var dm2 = (d2*d2)*20;
  if (dm > 1) dm = 1;
  if (dm2 > 1) dm2 = 1;
  t = t*dm*dm2
  r = (t*255)*cos(x);
  g = (t*255)*sin(x);
  b = (t*255);
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}