function setPixel(x,y) {
  var r=0, g=0, b=0;
  //example - rendering chessboard with modulus
  
  COLS = 8;
  ROWS = 8;
  
  //transform x to an integer from 0 to COLS-1
  x = floor( COLS*x );
  //likewise
  y = floor( ROWS*y );
  
  //transform to modulus 2, so 0,1,0,1
  x = mod(x, 2);
  y = mod(y, 2);
  
  //perform XOR
  checker = (x|y)&!(x&y);
  
  //set color
  r=g=b = checker*255;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}