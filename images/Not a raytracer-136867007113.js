function setPixel(x,y) {
  var r,g,b;
    function fval(nx){
      return sin(pi*nx);
    }
    var xrange = [-1.0,1.0];
    var yrange = [-1.0,1.0];
    var rx = (xrange[1]-xrange[0])*x + xrange[0];
    var ry = (yrange[1]-yrange[0])*(1-y) + yrange[0];
    var line_width = 0.01;
  
   //shitty antialiasing
    var out_intensity = 0.0;
    var num_samples = 10;
    for(var i = 0; i < num_samples; i++){
      nx = rx+0.002*random()-0.001;
      ny = ry+0.002*random()-0.001;
      if (abs(ny-fval(nx)) < line_width){
        out_intensity += 1/num_samples;
      }
    }
    r = 255.0*out_intensity;
    g = 255.0*out_intensity;
    b = 255.0*out_intensity;
  return [mod(r,256),mod(g,256),mod(b,256)];
}