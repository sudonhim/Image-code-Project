function setPixel(x,y) {
  var r,g,b;
    var xrange = [-2.0,0.5];
    var x0 = (xrange[1]-xrange[0])*x+xrange[0];
  
    var yrange = [-1.2,1.2];
    var y0 = (yrange[1]-yrange[0])*y+yrange[0];
  
    var x = 0;
    var y = 0;
  
    var max_iteration = 100;
    for (var iteration=0; iteration < max_iteration ; iteration++){
      if (x*x + y*y > 2*2) break;
      xtemp = x*x - y*y + x0;
      y = 2*x*y + y0;
  
      x = xtemp;
    }
  
    r = 255.0*iteration/max_iteration;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}