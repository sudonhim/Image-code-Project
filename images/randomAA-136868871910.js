function setPixel(x,y) {
  var r,g,b;
  function sample(x,y) {
    var rx = x*2-0.5;
    var ry = y*2-0.5;
    var line_width = 0.03;
    var theta = atan(rx/ry);
    if (ry < 0) theta += pi;
    var r = sqrt(rx*rx+ry*ry);
    
  
    if (abs(sin(10*r)+theta-1.0) < line_width){
      return 1.0;
    } else return 0.0;
    
  }
  
  //Sample 4 sub-pixels
  var out = 0.0;
  var nSamples = 50;
  for (var i=0; i<nSamples; i++) {
    var nx = x+(random()-0.5)/450;
    var ny = y+(random()-0.5)/450;
    out += sample( nx,ny)/nSamples;
  }
  
  g=b= out*255;
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}