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
  
  x += 0.1*perlin(x*4,1.0);
  y += 0.1*perlin(y*4,1.0);
  
  r=fbm(x*2,y*2+999,5)*255;
  g=fbm(x*2,y*2,9)*255;
  b=fbm(x*2+999,y*2,13)*255;
  
  drk = perlin(x*5-987,y*5);
  r*=drk;g*=drk;b*=drk;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}