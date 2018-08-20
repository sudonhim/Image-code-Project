function setPixel(x,y) {
  var r,g,b;
  function hash2(d,e) {
    var f = sin(d*928309)*9831;
    var g = sin(e*679987)*8933;
    var h = sin(f*84+g*874)/2+0.5;
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
  
  r=g=b = fbm(x*4,y*4,7)*255;
  return [mod(r,256),mod(g,256),mod(b,256)];
}