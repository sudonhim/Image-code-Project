function setPixel(x,y) {
  var r,g,b;
  function hash(d) {
    d += 1000;
    var f = sin(d*9283)*9831;
    return f-floor(f);
  }
  
  max_c = 0.0;
  litho_id = -1;
  closeness = 9999;
  
  num_lithos = 8;
  for (var i=0; i<num_lithos; i++) {
    x_o = hash(i+1);
    y_o = hash(-i-5);
    num_interps = hash(i+999)*9;
    contrib = 0;
    for (var j=0; j<num_interps; j++) {
      x_i = x_o + hash(x_o + j+1+i)*0.5;
      y_i = y_o + hash(y_o - j-1-i)*0.5;
      offs_x = x_i - x;
      offs_y = y_i - y;
      stren = offs_x*offs_x + offs_y*offs_y;
      contrib += 1/stren;
      }
    if (contrib > max_c) {
      litho_id = i;
      close = contrib - max_c;
      closeness = min(close, closeness);
      max_c = contrib;
    }
  }
  
  r = hash(litho_id);
  g = hash(litho_id*2);
  b = hash(litho_id*3);
  
  c = 0.75+0.25*sin(log(closeness));
  
  r *= c*255;
  g *= c*255;
  b *= c*255;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}