function setPixel(x,y) {
  var r,g,b;
  function intersects_triangle(p0, p1, p2, point){
    var A = p1[0] - p0[0];
    var B = p2[0] - p0[0];
    var C = p1[1] - p0[1];
    var D = p2[1] - p0[1];
    
    var _x = point[0];
    var _y = point[1];
    
    var v = (A*(_y - p0[1]) - C*(_x - p0[0]))/(A*D - B*C);
    var u = (_x - p0[0] - B*v)/A;
    
    if ( u >= 0 && v >= 0 && u+v <= 1.0 ){
      return true;
    }else{
    	return false;
    }
  }
  y=1.0-y;
  var p0=new Array(0,0);
  var p1=new Array(0.5,1.0);
  var p2=new Array(1.0,0);
  var p=new Array(x,y);
  if (intersects_triangle(p0, p1, p2, p)){
    var ip0=new Array(0.25,0.5);
    var ip1=new Array(0.75,0.5);
    var ip2=new Array(0.5,0); 
    if (!intersects_triangle(ip0, ip1, ip2, p)){
      r = 255 - 30*(sin(15*x-15*y)+1);
      g = 255 - 30*(sin(15*x-15*y)+1);
      b = 0;
    }
  }
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}