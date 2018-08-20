function setPixel(x,y) {
  var r,g,b;
  function intersects_triangle(p0, p1, p2, point){
    var A = p1[0] - p0[0];
    var B = p2[0] - p0[0];
    var C = p1[1] - p0[1];
    var D = p2[1] - p0[1];
    
    var _x = point[0];
    var _y = point[1];
    
    var v = (A*(_y - p0[1]) - C*(_x - p0[0]))/(A*D - C*B);
    var u = (_x - p0[0] - B*v)/A;
    
    if ( u >= 0 && v >= 0 && u+v <= 1.0 ){
      return true;
    }else{
    	return false;
    }
  }
  function interp_vectors(p0,p1,weight){
    return new Array(weight*p1[0] + (1-weight)*p0[0],weight*p1[1] + (1-weight)*p0[1])
  }
  var max_depth = 0;
  function serpinski(p0,p1,p2,r_depth){
    if (intersects_triangle(p0, p1, p2, p)){
      var ip0=interp_vectors(p0,p1,0.5);//new Array(0.25,0.5);
      var ip1=interp_vectors(p1,p2,0.5);//new Array(0.75,0.5);
      var ip2=interp_vectors(p0,p2,0.5);//new Array(0.5,0); 
      if (!intersects_triangle(ip0, ip1, ip2, p)){
        if(r_depth == max_depth){
          return true;
        }else{
          var sub_tri_1 = serpinski(ip0,ip2,p0,r_depth+1);
          if (sub_tri_1){
          	return sub_tri_1; 
          }
          var sub_tri_2 = serpinski(ip0,ip1,p1,r_depth+1);
          if (sub_tri_2){
          	return sub_tri_2; 
          }
          var sub_tri_3 = serpinski(ip1,ip2,p2,r_depth+1);
          if (sub_tri_3){
          	return sub_tri_3; 
          }
        }
      }
    }
    return false;
  }
  y=1.0-y;
  var p0=new Array(0,0);
  var p1=new Array(0.5,1.0);
  var p2=new Array(1.0,0);
  var p=new Array(x,y);
  
  var intersect = serpinski(p0,p1,p2,0);
  if(intersect){
    r = 255;
    g = 255;
    b = 10;
  }else{
    r = 0;
    g = 0;
    b = 0;
  }
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}