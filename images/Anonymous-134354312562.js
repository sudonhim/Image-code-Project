function setPixel(x,y) {
  var r=0, g=0, b=0;
  var i=0, maxd=1;
  
  if (typeof p === "undefined") {
    p = new Float64Array(200);
    for(i = 0; i < 200; i++) p[i] = random();
    
    dist = function(a,b,c,d) {
    	return sqrt((a-c)*(a-c)+(b-d)*(b-d));
    }
  }
  
  for (i = 0; i < 200; i += 2) {
    maxd = min(maxd, dist(p[i], p[i+1], x, y));
  }
  
  r=g=b = maxd*1024;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}