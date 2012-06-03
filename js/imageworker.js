var worker = self;
importScripts('bmplib.js');

(function() {
    
var ColorSetter = function(width, height) {
  var position = [];
  var normalPosition = [];
  
  this.colors = [];
  
  this.setPixels = function(callback) {
    var length = width * height;
    for (var i=0; i<length; ++i) {
      position[0] = i%width;
      position[1] = parseInt(i/width);
      normalPosition[0] = position[0] / (width+0.0000001);
      normalPosition[1] = position[1] / (height+0.0000001);
      var colors = callback.apply(null, normalPosition);
      this.colors[position[1]] = this.colors[position[1]] || [];
      this.colors[position[1]][position[0]] = colors;
    }
    this.uri = BMPLib.imageSource(this.colors);
  };
};

worker.onmessage = function(event) {
  var data = event.data;
  if (data) {
    var colorSetter = new ColorSetter(data.width, data.height);
    var callback = getFunction(data.definition, data.width, data.height);
    colorSetter.setPixels(callback);
    worker.postMessage({ colors: colorSetter.colors, uri: colorSetter.uri });
  }
};

var getFunction = function(definition, width, height) {
  var worker = XMLHttpRequest = Worker = importScripts = undefined;
  var sin = Math.sin, PI = Math.PI, pi = Math.PI, cos = Math.cos, 
      tan = Math.tan, log = Math.log, sqrt = Math.sqrt, abs = Math.abs,
      floor = Math.floor, ceil = Math.ceil, round = Math.round, exp = Math.exp,
      acos = Math.acos, asin = Math.asin, atan = Math.atan, atan2 = Math.atan2,
      max = Math.max, min = Math.min, pow = Math.pow, random = Math.random;
  eval('var definition = undefined; function setPixels(x, y) {' + definition + '}');
  return setPixels;
};

})();