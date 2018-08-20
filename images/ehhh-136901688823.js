function setPixel(x,y) {
  var r,g,b;
  x = x*0.3+0.2;
  y = y*0.3+0.3;
  
  function sample(nx,ny) {  
    var xrange = [-2.0,0.5];
    var x0 = (xrange[1]-xrange[0])*nx+xrange[0];
  
    var yrange = [-1.2,1.2];
    var y0 = (yrange[1]-yrange[0])*ny+yrange[0];
  
    var nx = 0.1;
    var ny = 0.5;
  
    var max_iteration = 50;
    for (var iteration=0; iteration < max_iteration ; iteration++){
      if (nx*nx + ny*ny > 2*2) break;
      xtemp = nx*nx - ny*ny + x0;
      ny = 2*nx*ny + y0;
  
      nx = xtemp;
    }
  
    var f = iteration/max_iteration;
    r = 0.5+0.5*sin(f*20 + 0.2*random() + pi);
    b = 0.5+0.5*sin(f*15 + 0.2*random());
    g = 0.5+0.5*sin(f*10 + 0.2*random());
  }
  
  //Sample 4 sub-pixels
  var ro=0.0,go=0.0,bo=0.0;
  var col = new Array(0,0,0);
  for (var dx=-0.33; dx<=0.33; dx+=0.66) {
    for (var dy=-0.33; dy<=0.33; dy+=0.66) {
      x2 = x + dx/450;
      y2 = y + dy/450;
      sample(x2,y2)
      ro += r/4;
      go += g/4;
      bo += b/4;
    }
  }
  
  r=ro*255;g=go*255;b=bo*255;
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}