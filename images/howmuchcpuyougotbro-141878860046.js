function setPixel(x,y) {
  var r,g,b;
  function hash2(d,e) {
    var f = sin(d*928309)*9831;
    var g = sin(e*679987)*8933;
    var h = sin(f*36547+g*87408)/2+0.5;
    return h-floor(h);
  }
  
  function perlin(u,v) {
    j = floor(u);
    k = floor(v);
    tl = hash2((j  ),(k  ));
    tr = hash2((j+1),(k  ));
    br = hash2((j+1),(k+1));
    bl = hash2((j  ),(k+1));
    a = u-j;
    b = v-k;
    c = 1-a;
    d = 1-b;
    return ( tl*c*d
            +tr*a*d
            +br*a*b
            +bl*c*b );
  }
  
  // fractional brownian motion with n harmonics
  function fbm(u,v, n) {
    out = 0.0;
    s = 1.0;
    for (var i=1;i<=n;i++) {
      out += perlin(u,v);
      u *= 2;
      v *= 2;
    }
    
    return out/n;
  }
  
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
    xi += 13;
    zi -= 40;
    if (yi < -9) { id=1; return true; }
    var h = fbm(xi/15, zi/15, 2);
    if (yi < h*14-15) {
      id=2; return true; }
    return false;
  }
  var hit = false; var side=0;
  for (var i=0; i<75; i++) {
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
    r *= 0.75 + 0.25*sin((d%z_dd)*15/z_dd);
    g *= 0.75 + 0.25*sin((d%x_dd)*15/x_dd);
    b *= 0.75 + 0.25*sin((d%y_dd)*15/y_dd);
  } else {
    r=200-y*50; g=180; b=200+y*50+x*20;
  }
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}