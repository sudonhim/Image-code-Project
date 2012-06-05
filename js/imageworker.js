var worker = self;
importScripts('bmplib.js');

(function() {
    
var ColorSetter = function(width, height) {
  width = width || 450;
  height = height || 450;
  var position = [];
  var normalPosition = [];
  
  this.colors = [];
  
  
  this.setPixels = function(callback) {
    var length = width * height;
    var x, y, i;
    var colors;
    for (i=0; i<length; ++i) {
      x = i%width;
      y = parseInt(i/width);
      normalPosition[0] = x / width;
      normalPosition[1] = y / height;
      colors = callback.apply(null, normalPosition);
      colors[0] = Math.floor(colors[0]);
      colors[1] = Math.floor(colors[1]);
      colors[2] = Math.floor(colors[2]);
      while (colors[0] < 0 || colors[1] < 0 || colors[2] < 0) {
        colors[0] += 256;
        colors[1] += 256;
        colors[2] += 256;
      }
      colors[0] %= 256;
      colors[1] %= 256;
      colors[2] %= 256;
      this.colors[y] = this.colors[y] || [];
      this.colors[y][x] = colors;
      if (x === width-1) {
        worker.postMessage({ progress: normalPosition[1] * 75 });
      }
    }
    this.uri = BMPLib.imageSource(this.colors);
      worker.postMessage({ progress: 90 });
  };
};

worker.onmessage = function(event) {
  var data = event.data;
  if (data) {
    var colorSetter = new ColorSetter(data.width, data.height);
    var callback = getFunction(data.definition, data.width, data.height);
    colorSetter.setPixels(callback);
    worker.postMessage({ uri: colorSetter.uri });
  }
};

var getFunction = function(definition, width, height) {
  var worker = XMLHttpRequest = Worker = importScripts = undefined;
  var sin = Math.sin, PI = Math.PI, pi = Math.PI, cos = Math.cos, 
      tan = Math.tan, log = Math.log, sqrt = Math.sqrt, abs = Math.abs,
      floor = Math.floor, ceil = Math.ceil, round = Math.round, exp = Math.exp,
      acos = Math.acos, asin = Math.asin, atan = Math.atan, atan2 = Math.atan2,
      max = Math.max, min = Math.min, pow = Math.pow, random = Math.random;
  definition = 'var definition = undefined; function setPixels(x, y) {' + definition + '}';
  definition = definition.replace('return [ r%256, g%256, b%256 ]', 'return [ r, g, b ]');
  eval(definition);
  return setPixels;
};

})();