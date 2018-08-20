function setPixel(x,y) {
  var r,g,b;
  y = 1-y;
  x = 2*x-1.1; y = 2*y-1.5;
  var z = 1.0;
  var m = sqrt(x*x + y*y + z*z);
  x/=m; y/=m; z/=m;
  var x_d=x; var y_d=y; var z_d=z;
  var x_dd=abs(1/x); var y_dd=abs(1/y); var z_dd=abs(1/z);
  var d; var x_i=0; var y_i=0; var z_i=0;
  function sign(f) {return f<0 ? -1 : 1;}
  var x_s=sign(x); var y_s=sign(y); var z_s=sign(z);
  var id = 0;
  function f(xi,yi,zi) {
    if (yi < -8) { id=1; return true; }
    if (yi < (2*sin(zi/8+5)+sin(xi/8)*(sin(xi/3) + sin(zi/3))*3 - 8)) {
      id=2; return true; }
    return false;
  }
  var hit = false; var side=0;
  for (var i=0; i<45; i++) {
    if (x_d < y_d)
      if (x_d < z_d) {
        d = x_d; x_d += x_dd; x_i+=x_s; side=1;
      } else {
        d = z_d; z_d += z_dd; z_i+=z_s; side=3;
      }
    else
      if (y_d < z_d) {
        d = y_d; y_d += y_dd; y_i+=y_s; side=2;
      } else {
        d = z_d; z_d += z_dd; z_i+=z_s; side=3;
      }
    if (f(x_i, y_i, z_i)) {hit=true; break;}
  }
  if (hit) {
    switch (id) {
      case 1:
        r=100;g=130;b=180;
        break;
      case 2:
        r=50;g=160;b=40;
        break;
    }
    switch (side) {
      case 1:
        r*=0.8;g*=0.8;b*=0.8;
        break;
      case 3:
        r*=0.9;g*=0.9;b*=0.9;
        break;
    }
  } else {
    r=200-y*50; g=180; b=200+y*50+x*20;
  }
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}