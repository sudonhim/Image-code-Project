function setPixel(x,y) {
  var r,g,b;
  resolution = 80;
  
  c = 1.0;
  u = x*resolution;
  v = y*resolution;
  x = floor(u)/resolution;
  y = floor(v)/resolution;
  
  rad = sqrt(pow(x-0.5, 2) + pow(y-0.5, 2));
  theta = atan2(x-0.5, y-0.5);
  inface = rad < 0.3;
  insmile = (0.15 < rad && rad < 0.18 
             && -0.75 < theta &&theta < 0.75);
  x2 = abs(x-0.5);
  ineyes = (0.06 < x2 && x2 < 0.1
            && 0.3 < y && y < 0.5);
  if (inface && !insmile && !ineyes) {
    r=g = 1.0;
  } else {
    r=g=b = 0.1;
  }
  
  
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
  
  if (floor(mod(u, 2)) - floor(mod(v, 2))) { c *= 0.2; }
  
  
  
  r *= c; g*= c; b *= c;
  r *= 255; g*= 255; b *= 255;
  return [mod(r,256),mod(g,256),mod(b,256)];
}