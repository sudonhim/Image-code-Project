function setPixel(x,y) {
  var r,g,b;
  function hash(d) {
    d += 100;
    var f = sin(d*9382)*9731;
    return f-floor(f);
  }
  
  num_lithos = 15;
  closest = -1;
  dist = 999999999.0;
  edge = 1.0;
  for (var i=0; i<num_lithos; i++) {
    x_pos = hash(i);
    y_pos = hash(-i*12);
    r = sqrt(pow(x_pos-x, 2)+pow(y_pos-y, 2));
    if (r<dist){
      closest = i;
      edge = dist - r;
      dist = r;
    }
  }
  
  r = hash(closest);
  g = hash(closest*2);
  b = hash(closest*3);
  
  var c = min(edge*10, 1.0);
  
  r*=255*c; g*=255*c; b*=255*c;
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}