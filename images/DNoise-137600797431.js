function setPixel(x,y) {
  var r,g,b;
  x = 2*x-1;
  y = 2*y-1;
  
  function hash(d) {
    var f = sin(d*9283)*9831;
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
  
  function f(a, b) {
    var k = 8;
    var out = 0.0;
    var s = 0.5;
    for (var i=0; i<k; i++) {
      out += perlin(a)*s;
      a *= 2;
      s *= 0.85;
    }
    return out;
  }
  
  r= f(x,y);
  g= f(x+100,y);
  b= f(x-45,y);
  
  r*=255;g*=255;b*=255;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}