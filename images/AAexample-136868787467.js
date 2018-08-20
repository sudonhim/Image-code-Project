function setPixel(x,y) {
  var r,g,b;
  function fval(nx){
    return sin(pi*nx);
  }
  
  function sample(x,y) {
    var rx = x*2-1;
    var ry = y*2-1;
    var line_width = 0.01;
  
    if (abs(ry-fval(rx)) < line_width){
      return 1.0;
    } else return 0.0;
    
  }
  
  //Sample 4 sub-pixels
  var out = 0.0;
  var col = new Array(0,0,0);
  for (var dx=-0.33; dx<=0.33; dx+=0.66) {
    for (var dy=-0.33; dy<=0.33; dy+=0.66) {
      x2 = x + dx/450;
      y2 = y + dy/450;
      out += sample(x2,y2)/4;
    }
  }
  
  r=g=b= out*255;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}