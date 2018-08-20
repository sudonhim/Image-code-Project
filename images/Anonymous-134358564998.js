function setPixel(x,y) {
  var r=0, g=0, b=0;
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
  
  if (mod(floor(y*20+0.5),2) && mod(floor(x*20+0.5),2))
  {
    r = (1-maxd)*1024;
  } else {
    b = maxd*1024;
  }
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}