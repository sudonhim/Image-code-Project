function setPixel(x,y) {
  var r,g,b;
  function hash(d) {
    d += 100;
    var f = sin(d*9283)*9831;
    return f-floor(f);
  }
  
  num_lithos = 10;
  closest = -1;
  dist = 999999999.0;
  for (var i=0; i<num_lithos; i++) {
    x_pos = hash(i);
    y_pos = hash(-i*12);
    r = pow(abs(x_pos-x),3)+pow(abs(y_pos-y),3);
    if (r<dist){
      closest = i;
      dist = r;
    }
  }
  
  r = hash(closest);
  g = hash(closest*2);
  b = hash(closest*3);
  
  r*=255; g*=255; b*=255
  return [mod(r,256),mod(g,256),mod(b,256)];
}