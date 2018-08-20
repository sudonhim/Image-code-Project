function setPixel(x,y) {
  var r=0, g=0, b=0;
  var p = 0.5;
  var px = (x / p);
  var py = (y / p);
  var cx = (0.5 / p);
  var cy = (0.5 / p);
  
  var dx = px - cx;
  var dy = py - cy;
  var d = sqrt(dx*dx + dy*dy);
  if (d == 0) d = 1;
  var d2 = (d*d);
  if (d2 > 1) d2 = 1;
  var a = ((atan2(dx, dy) / pi) + 1.0) / 2.0;
  
  function tex(u, v) {
    var x = mod(floor(2*u), 2);
    var y = mod(floor(2*v), 1);
    return (x|y)&!(x&y);
  }
  
  
  var u = a*1234;
  var v = (d*2)/p;
  var t = tex(u, v);
  
  
  
  r = (t*255)*d2;
  g = (t*255)*d2;
  b = (t*255)*d2;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}