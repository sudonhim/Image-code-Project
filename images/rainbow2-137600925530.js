function setPixel(x,y) {
  var r,g,b;
  x = 2*x-1;
  y = 2*y;
  
  function hash(d) {
    var f = sin(d*9283+029438.0123)*9831;
    return f-floor(f);
  }
  
  function perlin(p) {
    var j = floor(p);
    var k = floor(p+1);
    var f = hash(j);
    var g = hash(k);
    var mix = p-j;
    return mix*g+(1-mix)*f;
  }
  
  var k = 12;
  var out = 0.0;
  var s = 0.5;
  for (var i=0; i<k; i++) {
    out += perlin(x)*s;
    x *= 1.5;
    x += 43
    s *= 0.85;
    
    var c = 6*max(s/2-abs(out-y),0);
    r += (sin(i*25)+1)*c;
    g += (sin(i*82)+1)*c;
    b += (sin(i*35)+1)*c;
  }
  
  r = min(r,1);
  g = min(g,1);
  b = min(b,1);
  r*=255;g*=255;b*=255;
  
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}