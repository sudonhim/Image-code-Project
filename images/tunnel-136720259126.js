function setPixel(x,y) {
  var r,g,b;
  //Attempt at raymarcher
  
  //flip y
  y = 1-y;
  
  //Maximum distance to march
  var MAX_DIST = 30;
  //Decrease this to improve quality
  var INCREMENT_PERCENTAGE = 0.002;
  
  //Ray starts at camera
  var cameraPos = new Array(0,0,-5);
  
  //Intersects screen at
  var pixelPos = new Array(2*(x-0.5), 2*(y-0.5), 0);
  
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
  
  function fdist( pos ) {
    var l = sqrt(pow(pos[0],2)+
                 pow(pos[1],2));
    return 1-l;
  }
  
  var dist = 0;
  var fd = 1.0;
  var rayp;
  while (fd > 0.05 && dist<10) {
    rayp = new Array(rayDir[0]*dist,
                         rayDir[1]*dist,
                         rayDir[2]*dist);
    fd = fdist(rayp);
    dist += fd;
  }
    
  r = (11-dist)/10*255;
  g = r*0.2;
  b = 255*mod(rayp[2],1);
  
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}