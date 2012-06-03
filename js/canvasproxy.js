(function(window) {

var CanvasProxy = function(parentElement, width, height) {
  var that = this;
  
  if (typeof parentElement === 'string') {
    parentElement = document.getElementById(parentElement);
  }
  
  this.canvas = document.createElement('canvas');
  parentElement.appendChild(this.canvas);
  this.canvas.id = 'drawingCanvas';
  this.canvas.width = width || 450;
  this.canvas.height = height || 450;
  this.$canvas = $(this.canvas);
  this.context = this.canvas.getContext('2d');
  
  this.setPixelArray = function(pixelArray) {
    var width = that.canvas.width;
    for (var i=0, length=pixelArray.length; i<length; ++i) {
      var x = i%width, y = parseInt(i/width);
      var r = pixelArray[i*4], g = pixelArray[i*4+1], 
          b = pixelArray[i*4+2], a = pixelArray[i*4+3] || 255;
      that.setPixel(x, y, r, g, b, a);
    }
  };
  
  this.setPixel = function(x, y, r, g, b, a) {
    that.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + ((a / 255) || 255) + ')';
    that.context.fillRect(x, y, 1, 1);
  };
};

window.CanvasProxy = CanvasProxy;
  
})(window);