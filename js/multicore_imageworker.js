var worker = self;
worker.postMessage = worker.webkitPostMessage || worker.postMessage;

(function() {
    
var ColorSetter = function(width, height, offset) {
  width = width || 450;
  height = height || 450;
  offset = offset; // Offset is the number of pixels to skip at the start
  var normalPosition = [];
  
  this.colors = new Float32Array(width * height);
  
  this.setPixels = function(callback) {
    var length = width * height;
    var x, y,iActual, i=0;
    var colors, colorOffset;
    for (i=0; i<(length/4); ++i) {
      iActual = (i+offset)*4+offset*4;
      colorOffset = i*4;
      x = (iActual-offset*7) % width;
      y = parseInt(iActual / width);
      normalPosition[0] = x / width;
      normalPosition[1] = y / height;
      colors = callback.apply(null, normalPosition);
      this.colors[colorOffset] =   colors[0];
      this.colors[colorOffset+1] = colors[1];
      this.colors[colorOffset+2] = colors[2];
      this.colors[colorOffset+3] = 255;
      if (x === width-1) {
        worker.postMessage({ progress: normalPosition[1], offset: offset });
      }
    }
  };
};

worker.onmessage = function(event) {
  var data = event.data;
  if (data) {
    var colorSetter = new ColorSetter(data.width, data.height, data.offset);
    var callback = getFunction(data.definition, data.width, data.height);
    colorSetter.setPixels(callback);
    worker.postMessage({ colors: colorSetter.colors, offset: data.offset });
  }
};

var getFunction = function(definition, width, height) {
  var worker = XMLHttpRequest = Worker = importScripts = undefined;
  
  // as Javascripts modulus operator fails for negative numbers
  function fixedModulus(x,m) { return ((x%m)+m)%m; };
  var mod = fixedModulus;
  
  var sin = Math.sin, PI = Math.PI, pi = Math.PI, cos = Math.cos, 
      tan = Math.tan, log = Math.log, sqrt = Math.sqrt, abs = Math.abs,
      floor = Math.floor, ceil = Math.ceil, round = Math.round, exp = Math.exp,
      acos = Math.acos, asin = Math.asin, atan = Math.atan, atan2 = Math.atan2,
      max = Math.max, min = Math.min, pow = Math.pow, random = Math.random;
  definition = 'var definition = undefined; function setPixels(x, y) { seedrandom("0"); ' + definition + '}';
  eval(definition);
  return setPixels;
};

})();