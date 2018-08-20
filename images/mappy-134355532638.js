function setPixel(x,y) {
  var r=0, g=0, b=0;
  // Quick implementation of Floyd-Steinburg dithering algorithm. You can theoretically use any existing image with this wrapper!
  
  
  function oldSetPixel(x,y) {
    var r,g,b;
    
    /* == original codeblock == */
    var r=0, g=0, b=0;
    var r=0, g=0, b=0;
    
    //Attempt at raymarcher
    //MESSING WITH
    
    //flip y
    y = 1-y;
    
    //Maximum distance to march
    var MAX_DIST = 50;
    //Decrease this to improve quality
    var INCREMENT_PERCENTAGE = 0.012;
    
    //Ray starts at camera
    var cameraPos = new Array(0.75,0.7,-2);
    
    //Intersects screen at
    var pixelPos = new Array(1.5*x, 1.2*y, 0);
    
    //Giving the direction as
    var rayDir = new Array( pixelPos[0]-cameraPos[0],
                            pixelPos[1]-cameraPos[1],
                            pixelPos[2]-cameraPos[2] );
    
    //Normalise...
    var mag = sqrt( pow( rayDir[0], 2 ) +
                    pow( rayDir[1], 2 ) +
                    pow( rayDir[2], 2 ) )
    rayDir[0] /= mag;
    rayDir[1] /= mag;
    rayDir[2] /= mag;
    
    var rayPos = pixelPos;
    
    //Now we have our ray with a direction and origin,
    //lets define the scenery as a heightmap
    function h(x2,z2)
    {
      return ( 0.1*sin(2.0*x2+1.0)+
               0.1*sin(1.5*z2)+
               0.25*sin(x2+z2)
               -0.5
              );
    }
    //And the normal
    function hn(x2,z2)
    {
      //0.1sin(2x)+0.1sin(1.5z)+0.1sin(x+z)-y=0
      var dx = 0.2*cos(2*x2+1.0)+0.1*cos(x2+z2);
      var dy = -1.0;
      var dz = 0.25*cos(1.5*z2)+0.1*cos(x2+z2);
      //Normalise
      var mag = sqrt(dx*dx+dy*dy+dz*dz);
      dx /= mag;
      dy /= mag;
      dz /= mag;
      return Array(dx,dy,dz);
    }
    
    //Begin "marching" the ray from the screen until
    //it falls below the height map
    var height;
    var incr = 0.01;
    for (var d=1.0; d<=MAX_DIST; d+=incr)
    {
      rayPos[0] += rayDir[0]*incr;
      rayPos[1] += rayDir[1]*incr;
      rayPos[2] += rayDir[2]*incr;
    
      height = h( rayPos[0], rayPos[2] );
      if (height > rayPos[1]) {
        break;
      }
      incr = INCREMENT_PERCENTAGE * d;
    }
    
    if (d <= MAX_DIST) {
      //Get the normal
      var normal = hn(rayPos[0],rayPos[2]);
      //Parallel light source
      var lightDir = new Array(1.0,-1.0,1.0);
      //Dot product normal with light
      var specular = ( normal[0]*lightDir[0]+
                       normal[1]*lightDir[1]+
                       normal[2]*lightDir[2]);
      specular *= 0.6;
      var grey = specular*255;
      var fog = (MAX_DIST-0.4*d)/MAX_DIST
      r = 0.5*grey*fog;
      g = grey*0.5+0.5*grey*fog;
      b = 0.5*grey;
    } else {
      //Sky color
      r=20; 
      g=100;
      b=100*x+130;
    }  
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
        
        /*
        // Dither algorithm: Floyd-Steinburg
        var er = (grey - adjusted) >> 4;      
        check_set_px( ix, iy, 1, 0, 7, er );
        check_set_px( ix, iy,-1, 1, 3, er );
        check_set_px( ix, iy, 0, 1, 5, er );
        check_set_px( ix, iy, 1, 1, 1, er );
  	  */      
        
        // Dither algorithm: Atkinson
        var er = (grey - adjusted) >> 3;
        check_set_px( ix, iy, 1, 0, 1, er );
        check_set_px( ix, iy, 2, 0, 1, er );
        check_set_px( ix, iy,-1, 1, 1, er );
        check_set_px( ix, iy, 0, 1, 1, er );
        check_set_px( ix, iy, 1, 1, 1, er );
        check_set_px( ix, iy, 0, 2, 1, er );
  
        /*
        // Dither algorithm: Horizontal bars
        var er = (grey - adjusted) >> 3;
        check_set_px( ix, iy, 0, 1, 4, er );
        check_set_px( ix, iy, 0, 2, 2, er );
        check_set_px( ix, iy, 0, 3, 1, er );
        */
  
        p[ix][iy] = adjusted;
      }
    }
  }
  
  // Set final pixel
  
  r=g=b= p[round(x*450)][round(y*450)];
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}