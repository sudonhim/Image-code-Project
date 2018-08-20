function setPixel(x,y) {
  var r,g,b;
  i = round(1024*x);
  j = round(1024*y);
  r= i&&j?(i%j)&(j%i):0;
  g= i&&j?(i%j)+(j%i):0;
  b= i&&j?(i%j)|(j%i):0;
  
  r /= 4;
  g /= 4;
  b /= 4;
  return [mod(r,256),mod(g,256),mod(b,256)];
}