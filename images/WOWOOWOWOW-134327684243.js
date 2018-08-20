function setPixel(x,y) {
  var r=0, g=0, b=0;
  var dx = (x+0.1) - 0.5;
  var dy = y - 0.5;
  var d = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  var a = ((atan2(dx, dy) / pi) + 1.0) * 0.5;
  
  var dx2 = (x-0.1) - 0.5;
  var dy2 = (y-0.1) - 0.5;
  var d2 = sqrt(dx2*dx2 + dy2*dy2);
  //var d2 = abs(dx2) > abs(dy2) ? abs(dx2) : abs(dy2);
  var a2 = ((atan2(dx2, dy2) / pi) + 1.0) * 0.5;
  
  function tex(u, v) {
    //u = mod(floor(u*16), 2);
    //v = mod(floor(v*16), 2);
    //return (u|v)&!(u&v);
    
    var s0 = (sin(u*50) + 1.0) / 2.0;
    var s1 = (sin(v*50) + 1.0) / 2.0;
    var s2 = (sin(u*100+v*50) + 1.0) / 2.0;
    var v = (s0+s1+s2) / 1.5
  
    return v;
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