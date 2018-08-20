function setPixel(x,y) {
  var r=0, g=0, b=0;
  //cell noise javascript
  function dist(x, y, i,j){
      var dx = x-i;
      var dy = y-j;
      return sqrt( dx*dx + dy* dy );
  }
  
  function nextRandomNumber(){
    var hi = this.seed / this.Q;
    var lo = this.seed % this.Q;
    var test = this.A * lo - this.R * hi;
    if(test > 0){
      this.seed = test;
    } else {
      this.seed = test + this.M;
    }
    return (this.seed * this.oneOverM);
  }
  
  function RandomNumberGenerator(seed){
    this.seed = seed
    this.A = 48271;
    this.M = 2147483647;
    this.M += 2;
    this.Q = this.M / this.A;
    this.R = this.M % this.A;
    this.oneOverM = 1.0 / this.M;
    this.next = nextRandomNumber;
    return this;
  }
  
  var ran = RandomNumberGenerator(55)
  
  
  //create the points
  var size = 100
  px = new Array(size);
  py = new Array(size);
  
  for ( var i=0;i<size;i++){
    px[i]=ran.next();
    py[i]=ran.next();
  }
  
  var low=dist(x,y,px[0],py[0] );
  for ( var i=0; i<size; i+=1){
       var d = dist( x,y,px[i],py[i] );
       if ( low > d ){
           low = d;
       }
   }
   
   b=low*1000
   r=b
   g=b
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}