function setPixel(x,y) {
  var r=0, g=0, b=0;
  // There's a faster way of storing static data than
  //  writing a mersenne twister and rebuiling it for every
  //  pixel... In this case, new random points are generated
  //  every execution, but they're constant between calls
  //  to setPixel().
  // In fact, you could make this faster still by building
  //  a KD-tree / BSP of these points and doing a log_n
  //  search instead of a linear one.
  
  function dist(a,b) {
    var dx = a[0]-b[0], dy = a[1]-b[1];
    return sqrt(dx*dx + dy*dy);
  }
  
  var i=0, maxd=1;
  
  if (typeof p === "undefined") {
    p = [];
    for(i = 0; i < 100; i++) {
      p[i] = [random(), random()];
    }
  }
  
  for (i = 0; i < 100; i++) {
    maxd = min(maxd, dist(p[i],[x,y]));
  }
  
  r = (1-maxd)*1024;
  g = r;
  b = r;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}