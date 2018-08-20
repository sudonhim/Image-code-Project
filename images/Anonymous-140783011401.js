function setPixel(x,y) {
  var r,g,b;
  i = round(x*1024)
  j = round(y*1024);
  
  function _sq(x) {
      return x * x;              // the function returns the product of p1 and p2
  }
  
  r = 0.64*(sqrt(_sq(73.-i)+_sq(609-j))+1)/(sqrt(abs(sin((sqrt(_sq(860.-i)+_sq(162-j)))/115.0)))+1);
  g = 0.64*(sqrt(_sq(160.-i)+_sq(60-j))+1)/(sqrt(abs(sin((sqrt(_sq(86.-i)+_sq(860-j)))/115.0)))+1);
  b = 0.64*(sqrt(_sq(844.-i)+_sq(200-j))+1)/(sqrt(abs(sin((sqrt(_sq(250.-i)+_sq(20-j)))/115.0)))+1);
  return [mod(r,256),mod(g,256),mod(b,256)];
}