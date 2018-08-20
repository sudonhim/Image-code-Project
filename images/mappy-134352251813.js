function setPixel(x,y) {
  var r=0, g=0, b=0;
  /* 2D vector helper functions */
  function vsign(a,b,c) {
    return (a.x-c.x)*(b.y-c.y)-(b.x-c.x)*(a.y-c.y);
  }
  function tri_test(p,a,b,c) {
    var ba = vsign(p,a,b) < 0,
        bb = vsign(p,b,c) < 0,
        bc = vsign(p,c,a) < 0;
    return ba==bb && bb==bc;
  }
  
  /* Triangles */
  var tris = [
    
    /* Hi! */
    [{x:.12,y:.10},{x:.23,y:.07},{x:.17,y:.58},[0,0,0]],
    [{x:.18,y:.28},{x:.41,y:.22},{x:.40,y:.32},[0,0,0]],
    [{x:.35,y:.09},{x:.45,y:.07},{x:.40,y:.54},[0,0,0]],
    [{x:.57,y:.10},{x:.64,y:.10},{x:.61,y:.20},[0,0,0]],
    [{x:.61,y:.19},{x:.60,y:.58},{x:.68,y:.56},[0,0,0]],  
    [{x:.80,y:.10},{x:.90,y:.09},{x:.85,y:.45},[0,0,0]],
    [{x:.85,y:.50},{x:.82,y:.56},{x:.89,y:.56},[0,0,0]],
    
    /* Smiley */
    [{x:.35,y:.72},{x:.35,y:.79},{x:.41,y:.75},[255,255,0]],
    [{x:.35,y:.87},{x:.35,y:.94},{x:.41,y:.90},[255,255,0]],
    [{x:.47,y:.66},{x:.56,y:.80},{x:.65,y:.81},[255,255,0]],
    [{x:.50,y:.97},{x:.56,y:.80},{x:.65,y:.81},[255,255,0]]  
  ];
  
  for(var i in tris) {
    if (tri_test({x:x,y:y}, tris[i][0], tris[i][1], tris[i][2])) {
      return tris[i][3];
    }
  }
  
  /* Background */
  r = x*255;
  g = y*255;
  b = 128;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}