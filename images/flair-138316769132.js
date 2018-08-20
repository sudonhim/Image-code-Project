function setPixel(x,y) {
  var r,g,b;
  x = 2*x-1;
  y = 2*y-1;
  
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
  
  var rad = sqrt(x*x+y*y);
  var theta = atan(x/y)+pi/2;
  if (y<0) theta += pi;
  
  r=g=b= max(0.0,max(theta-2*pi+0.1,0.1-theta)*3.0);
  
  r += rad+perlin(theta*2);
  g += rad*0.7+perlin(theta*2+0.5);
  b += 1.0;
  
  r = min(r,1);
  g = min(g,1);
  b = min(b,1);
  
  r*=255;g*=255;b*=255;
  
  
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}