function setPixel(x,y) {
  var r=0, g=0, b=0;
  //Adjust these
  const zoom = 1500
  const panx = -0.5
  const pany = 0.5
  //************
      
  var mi = 255
  var x0 = (x-panx)/zoom -1.5
  var y0 = (y-pany)/zoom
  var mx = 0
  var my = 0
  var mx1=0

  var i = 0
  while (i < mi){
    if (mx*mx + my*my >= 4){
       break
    }
    mx1 = mx*mx - my*my + x0
    my = 2*mx*my + y0
    mx = mx1
    i = i + 1
  }
  
  var l = (255 - (255/mi)*i)
  r = (l) * (1 + sin(0.1*l + 0.628)) / 2
  b = (l) * (1 + sin(0.2*l + 0.785))/2
  g = (l) * (1 + sin(0.3*l + 1.047)) / 2
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}
