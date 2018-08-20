function setPixel(x,y) {
  var r=0, g=0, b=0;
  // Quick implementation of Floyd-Steinburg dithering algorithm. You can theoretically use any existing image with this wrapper!
  
  
  function oldSetPixel(x,y) {
    var r,g,b;
    
    /* == original codeblock == */
    var p = 0.5;
    var px = (x / p);
    var py = (y / p);
    var cx = (0.5 / p);
    var cy = (0.5 / p);
    
    var dx = px - cx;
    var dy = py - cy;
    var d = sqrt(dx*dx + dy*dy);
    if (d == 0) d = 1;
    var d2 = (d*d);
    if (d2 > 1) d2 = 1;
    var a = ((atan2(dx, dy) / pi) + 1.0) / 2.0;
    
    function tex(u, v) {
      var x = mod(floor(2*u), 2);
      var y = mod(floor(2*v), 2);
      return (x|y)&!(x&y);
    }
    
    var u = a*32;
    var v = (d*2)/p;
    var t = tex(u, v);
    
    r = (t*255)*d2;
    g = (t*255)*d2;
    b = (t*255)*d2;
    
    /* == end original codeblock == */
    
    return [ mod(r,256), mod(g,256), mod(b,256) ];
  }
  
  // The following code only runs once
  
  if (typeof p === "undefined") {
    
    // Cache all pixels in original code
    p = [];
    for (var ix = 0; ix < 450; ix++) {
      p[ix] = [];
      for (var iy = 0; iy < 450; iy++) {
        p[ix][iy] = oldSetPixel(ix/450,iy/450);
      }
    }
    
    // Cast to greyscale
  
    for (var ix = 0; ix < 450; ix++) {
      for (var iy = 0; iy < 450; iy++) {
        p[ix][iy] = (p[ix][iy][0] + p[ix][iy][1] + p[ix][iy][2]) / 3;
      }
    }
    
    // Floyd-steinburg dithering to black and white
    
    function check_set_px(ix,iy,xoff,yoff,emul,er) {
      if (
        (iy+yoff) > 0 &&
        (iy+yoff) < 450 &&
        (ix+xoff) > 0 &&
        (ix+xoff) < 450
      ){
        var unclamped = p[ix+xoff][iy+yoff] + (emul*er);
        p[ix+xoff][iy+yoff] = unclamped > 0 ?
          (unclamped < 255 ? unclamped : 255)
          : 0;
      }
    }
    for (var ix = 0; ix < 450; ix++) {
      for (var iy = 0; iy < 450; iy++) {
        var grey = p[ix][iy];
        var adjusted = (grey > 128) ? 255 : 0;
        var er = (grey - adjusted) >> 4;
        
        check_set_px( ix, iy, 1, 0, 7, er );
        check_set_px( ix, iy,-1, 1, 3, er );
        check_set_px( ix, iy, 0, 1, 5, er );
        check_set_px( ix, iy, 1, 1, 1, er );
        
        p[ix][iy] = adjusted;
      }
    }
  }
  
  // Set final pixel
  
  r=g=b= p[round(x*450)][round(y*450)];
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}