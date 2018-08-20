function setPixel(x,y) {
  var r,g,b;
  x = 2*x-1;
  y = 2*y-1;
  
  function f(a) {
    var k = floor(4*y+0.25);
    y = 4*y-k-0.25;
    return sin(a*2*(k+4))*0.3;
  }
  
  r=g=b = max(20*(0.05-abs(f(x)-y)),0);
  
  r*=255;g*=255;b*=255;
  return [mod(r,256),mod(g,256),mod(b,256)];
}