function setPixel(x,y) {
  var r,g,b;
  function Complex(real, imaginary) {
    this.r = real;
    this.i = imaginary;
  }
  Complex.prototype.add = function(that) {
      return new Complex(this.r + that.r, this.i + that.i);
  };
  Complex.prototype.sub = function(that) {
      return new Complex(this.r - that.r, this.i - that.i);
  };
  Complex.prototype.conj = function() {
      return new Complex(this.r , -this.i);
  };
  Complex.prototype.mul = function(that) {
      return new Complex(this.r * that.r - this.i * that.i,
                         this.r * that.i + this.i * that.r);
  };
  Complex.prototype.smul = function(that) {
      return new Complex(that*this.r, that*this.i);
  };
  Complex.prototype.div = function(that) {
      return this.mul(that.conj()).smul(1.0/(that.r*that.r+that.i*that.i));
  };
  Complex.prototype.mag = function() {
      return Math.sqrt(this.r*this.r + this.i*this.i);
  };
  Complex.prototype.neg = function() { return new Complex(-this.r, -this.i); };
  Complex.prototype.equals = function(that) {
      return that != null &&
          that.constructor === Complex &&
          this.r === that.r && this.i === that.i;
  };
  Complex.ZERO = new Complex(0,0);
  Complex.ONE = new Complex(1,0);
  Complex.I = new Complex(0,1);
  
  //sclae for axes
  x1 = 3.0*x-1.5;
  y1 = 3.0*y-1.5;
  
  var z = new Complex(x1,y1);
  //Solve the equation z^3-1=0, and colour based on root
  var i = 0;
  threshold = 0.1;
  
  do{
    f = z.mul(z.mul(z)).sub(Complex.ONE);
    df = z.mul(z).smul(4);
    z = z.add(f.div(df).neg());
  
    m = f.mag();
    i++;
  } while (m > threshold);
  
  
  root0 = Complex.ONE;
  root1 = new Complex(-0.5, 0.8660254);
  root2 = new Complex(-0.5, -0.8660254);
  if (z.sub(root0).mag() < 1){
    r = 255*(i/10.0);
    return [ mod(r,256), mod(g,256), mod(b,256) ]; 
  }
  if (z.sub(root1).mag() < 1){
    g = 255*(i/10.0);
    return [ mod(r,256), mod(g,256), mod(b,256) ]; 
  }
  if (z.sub(root2).mag() < 1){
    b = 255*(i/10.0);
    return [ mod(r,256), mod(g,256), mod(b,256) ]; 
  }
  return [mod(r,256),mod(g,256),mod(b,256)];
}