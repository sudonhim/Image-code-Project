function setPixel(x,y) {
  var r,g,b;
  var i=0, maxd=1;
  
  if (typeof p === "undefined") {
    p = new Float64Array(200);
    for(i = 0; i < 200; i++) p[i] = random();
    
    dist = function(a,b,c,d) {
    	return sqrt((a-c)*(a-c)+(b-d)*(b-d));
    }
  }
  
  for (i = 0; i < 100; i += 1) {
    maxd = min(maxd, dist(p[i], p[i+1], x, y));
  }
  
  c = maxd*3000;
  if (c>=128) {
    g = c;
  } else {
    r = c;
  }
  
  
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}