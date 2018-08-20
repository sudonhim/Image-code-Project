function setPixel(x,y) {
  var r,g,b;
  y = 1-y;
  x = 2*x-1; y = 2*y-1;
  var r = sqrt(x*x+y*y);
  var theta = atan2(x, y);
  theta += r;
  x = r*sin(theta);
  y=r*cos(theta);
  var z = 1.0;
  var m = sqrt(x*x + y*y + z*z);
  x/=m; y/=m; z/=m;
  var x_d=x; var y_d=y; var z_d=z;
  var x_dd=abs(1/x); var y_dd=abs(1/y); var z_dd=abs(1/z);
  var d; var x_i=0; var y_i=0; var z_i=0;
  function sign(f) {return f<0 ? -1 : 1;}
  var x_s=sign(x); var y_s=sign(y); var z_s=sign(z);
  for (var i=0; i<15; i++) {
    if (x_d < y_d)
      if (x_d < z_d) {
        d = x_d; x_d += x_dd; x_i+=x_s;
      } else {
        d = z_d; z_d += z_dd; z_i+=z_s;
      }
    else
      if (y_d < z_d) {
        d = y_d; y_d += y_dd; y_i+=y_s;
      } else {
        d = z_d; z_d += z_dd; z_i+=z_s;
      }
    if (y_i < ((sin(x_i/3) + sin(z_i/3))*3 - 8)) break;
  }
  
  r=g=b = 128 + sin(d)*64 + sin(x_i*11+y_i*13+z_i*7)*64;
  
  b=g *= 0.5+0.5*sin(z_i)
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}