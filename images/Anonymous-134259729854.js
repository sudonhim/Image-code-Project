function setPixel(x,y) {
  var r=0, g=0, b=0;
  var r=0, g=0, b=0;
    var r=0, g=0, b=0;
    
    x = 40*pow(x-0.5,2);
    
    y = y-0.5;
    
    
    
    var angle = atan(x/y);
    
    
    
    var radial_stripes = mod(8*angle, 1);
    
    
    
    var cross = floor(1.1-abs(x)-0.05*abs(y))+floor(1.1-abs(y)-0.05*abs(x));
    
    
    var grey = max(cross,radial_stripes);
    r = grey*255;
    
    g = pow(grey,2)*255;
    
    b = r;
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}