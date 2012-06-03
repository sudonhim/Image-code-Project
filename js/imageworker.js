var worker = self;
importScripts('bmplib.js');

(function() {
    
var ColorSetter = function(width, height) {
  var position = [];
  
  this.colors = [] ;
  
  this.setPixels = function(callback) {
    var length = width * height;
    for (var i=0; i<length; ++i) {
      position[0] = i%width;
      position[1] = parseInt(i/width);
      var colors = callback.apply(null, position);
      this.colors[position[1]] = this.colors[position[1]] || [];
      this.colors[position[1]][position[0]] = colors;
    }
    this.uri = BMPLib.imageSource(this.colors);
  };
};

worker.onmessage = function(event) {
  var data = event.data;
  if (data) {
    data.definition = data.definition || 'return [ 255, 255, 255 ]';
    var colorSetter = new ColorSetter(data.width, data.height);
    var callback = getFunction(data.definition, data.width, data.height);
    colorSetter.setPixels(callback);
    worker.postMessage({ colors: colorSetter.colors, uri: colorSetter.uri });
  }
};

var getFunction = function(definition, width, height) {
  var worker = XMLHttpRequest = Worker = importScripts = undefined;
  eval('var definition = undefined; function setPixels(x, y) {' + definition + '}');
  return setPixels;
};

})();