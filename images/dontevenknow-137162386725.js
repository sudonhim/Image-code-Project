function setPixel(x,y) {
  var r,g,b;
  var n = 3;
  
  function f(z) {
    var powz = pow(z,n-1);
    var p = 1+(n-1)*powz*z;
    var q = n*powz;
    return p/q;
  }
  
  d = 1;
  for (var i=0; i<200; i++) {
    d = (f(x-d)+f(y-d))/2;
  }
  
  r = d;
  return [mod(r,256),mod(g,256),mod(b,256)];
}