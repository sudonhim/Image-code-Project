function setPixel(x,y) {
  var r,g,b;
  resolution = 40;
  
  
  u = x*resolution;
  v = y*resolution;
  x = floor(u)/resolution;
  y = floor(v)/resolution;
  
  function hash(d) {
    d += 11;
    var f = sin(d*9283)*9731;
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
  
  c = 1.0;
  px = mod(u, 1.0);
  py = mod(v, 1.0);
  
  
  if (px < 1.0/3) { r *= 0; g *= 0;
  } else if (px < 2.0/3) { g *= 0; b *= 0;
  } else { r *= 0; b *= 0; }
  
  edgex = min(px, 1.0-px);
  c *= min(1.0, edgex*4+0.5);
  
  edgey = min(py, 1.0-py);
  c *= min(1.0, edgey*4+0.5);
  
  c *= max(min(1*(cos(py*3.14*4)+0.99), 1.0), 0.0);
  
  //if (floor(mod(u, 2)) - floor(mod(v, 2))) { c *= 0.2; }
  
  
  
  r *= c; g*= c; b *= c;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}