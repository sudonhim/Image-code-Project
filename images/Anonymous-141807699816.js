function setPixel(x,y) {
  var r,g,b;
  x = 4*(x-0.5);
  y = 4*(0.5-y);
  theta = atan(y/x) + pi/4;
  if (x<0) theta += pi;
  rad = sqrt(x*x+y*y);
  
  function interp(x, a,b, c,d) {
    x = max(x,a);
    x = min(x,b);
    t = (x-a)/(b-a);
    t = t*t;
    return t*(d-c)+c;
  }
  
  function blend(f, a,b) {
    return f*a + (1-f)*b;
  }
  
  r=g=b= 1.0;
  
  //Iris
  iris = 1-interp(rad, 0.5,0.55, 0.0,1.0);
  
  ir = 0.5;
  ig = 0.4;
  ib = 0.1;
  c = 1.0;
  
  phase = theta*20 + 0.3*sin(rad*40+theta);
  osc = (sin(phase)+1)/2;
  c *= blend(osc, 0.9,1.0);
  
  c *= interp(rad, 0.4,0.55, 1.0,0.7);
  
  ir*=c;ig*=c;ib*=c;
  r = blend(iris, ir, r);
  g = blend(iris, ig, g);
  b = blend(iris, ib, b);
  
  //Cornea
  cornea = 1-interp(rad, 0.9,1.0, 0.0,1.0);
  r*=cornea;g*=cornea;b*=cornea*0.9;
  veins = 1-interp(sin(theta*12+sin(rad*20)), 0.9,1.0, 0.0,0.2);
  g*=veins;b*=veins
  
  //Pupil
  pupil = interp(rad, 0.2,0.25, 0.0,1.0);
  r*=pupil;g*=pupil;b*=pupil;
  
  //Specular reflection
  c = 1.0;
  c1 = 1-interp(abs(rad-0.5), 0.10,0.15, 0.0,0.2);
  c2 = 1-interp(abs(theta-pi), 0.15,0.3, 0.0,0.2);
  c *= min(c1,c2);
  r=min(r+(c-0.8)*0.5, 1.0);
  g=min(g+(c-0.8)*0.5, 1.0);
  b=min(b+(c-0.8)*0.0, 1.0);
  r*=c;g*=c;b*=c;
  
  //Diffuse lighting 
  c = 1.0;
  function fz(x,y) {
    return x*x+y*y;
  }
  nx = (fz(x,y)-fz(x+0.001,y))/0.001;
  ny = (fz(x,y)-fz(x,y+0.001))/0.001;
  nl = nx*0.3 + ny*0.3 + 0.4;
  c *= 1 + 0.2*nl;//max(0, nl);
  r*=c;g*=c;b*=c;
  r=min(r,1);g=min(g,1);b=min(b,1);
  
  //Flesh
  flesh = interp(rad, 0.9,1.0, 0.0,1.0);
  rf = 0.35;
  gf = 0.2;
  bf = 0.2;
  r = blend(flesh, rf,r);
  g = blend(flesh, gf,g);
  b = blend(flesh, bf,b);
  
  //Lids
  c = 1.0;
  nx = x+0.55;
  u = 0.45-0.4*nx*nx +nx/2-0.2;
  l = 0.6-0.4*x*x;
  c *= interp(y, u-0.05,u+0.05, 1.0,0.0);
  c *= interp(-y, l-0.05,l+0.05, 1.0,0.0);
  r*=c;g*=c;b*=c;
  
  r*=255;g*=255;b*=255;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}