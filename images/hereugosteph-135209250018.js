function setPixel(x,y) {
  var r=0, g=0, b=0;
  //Attempt at raymarcher
  
  //flip y
  y = 1-y;
  
  //Maximum distance to march
  var MAX_DIST = 10;
  //Decrease this to improve quality
  var INCREMENT_PERCENTAGE = 0.003;
  
  //Ray starts at camera
  var cameraPos = new Array(0,0.7,-2);
  
  //Intersects screen at
  var pixelPos = new Array(1.2*(x-0.5), 1.2*y, 0);
  
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
  function h(x2,y2)
  {
    return ( x2*x2+y2*y2+3
            );
  }
  //And the normal
  function hn(x2,y2)
  {
    mag = sqrt(x2*x2+y2*y2+1);
    return Array(x2/mag,y2/mag,-1/mag);
  }
  
  //Let's define a texture as well
  function tex(x2,z2)
  {
    x = mod(x2*3, 1);
    y = 1-mod(z2*3, 1);
    
    
    var xm,ym,x2,h;
    
    xm = x*2 - 1;
    ym = y*2 - 1;
    
    xm *= 8;
    ym *= -10;
    
    x2 = xm*xm;
    h =  ym-(2*(abs(xm)+x2-6))/(3*(abs(x)+x2+2));
    h = h*h;
    h = h+x2;
    
    if (h<15) {
      return 1;
    } else return 0.2;
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
    
    height = h( rayPos[0], rayPos[1] );
    
    if (height < rayPos[2]) {
      break;
    }
  
    incr = INCREMENT_PERCENTAGE * d;
  }
    
  if (d <= MAX_DIST) {
    //Get the normal
    var normal = hn(rayPos[0],rayPos[1]);
    //Parallel light source
    var lightDir = new Array(0.5,-0.5,1.5);
    //Dot product normal with light
    var specular = (normal[0]*lightDir[0]+
                     normal[1]*lightDir[1]+
                     normal[2]*lightDir[2]);
    specular *= 0.6;
    //Make a texture
    var texture = tex(rayPos[0], rayPos[1]);
    var grey = texture*specular*255;
    var fog = (MAX_DIST-0.4*d)/MAX_DIST
    r = 255;
    g = min(grey*0.5+0.5*grey*fog,255);
    b = min(grey,255);
  } else {
    //Sky color
    r=g=b= sqrt(random())*(4*random()<(x+y))*255;
  }
    
  
    
    
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}