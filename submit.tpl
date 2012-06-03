<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">
  <head>
    <title>Image Code JS</title>
    <link href="/js/stylesheet.css" rel="stylesheet" type="text/css"></link>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="/js/worker.js"></script>
    <script>
      
      $(document).ready(function() {
      
        var $textSubmit = $('#textSubmit');
        var $textPreview = $('#textPreview');
        var $user = $('#user');
        var $imageCodeText = $('#imageCodeText');
        var defaultText = 'var r = x;\nvar g = y;\nvar b = 0;\n\nreturn [ r%256, g%256, b%256 ];';
        var $imageContainer = $('#imageContainer');
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var image = new Image();
        var code = '';
        var previewMode = true;
        $imageCodeText.val(defaultText);
        $imageContainer.css({ width: 640, height: 480 });
        canvas.width = $imageContainer.width();
        canvas.height = $imageContainer.height();
                           
        var imageWorker = new Worker('js/imageworker.js');
        imageWorker.onmessage = function(event) {
          var data = event.data;
          if (data) {
            var pixelArray = data.colors;
            image = new Image();
            image.src = data.uri;
            image.onload = function() {
              context.drawImage(image, 0, 0);
              var uri = canvas.toDataURL('image/png');
              $imageContainer.empty();
              image = new Image();
              image.src = uri;
              $imageContainer.append(image);
              if (!previewMode) {
                $.ajax({
                  type: "POST",
                  url: "imageSubmitted",
                  data: { user: $user.val(), code: code, uri: uri }
                }).done(function() {
                  window.location = '/';
                });
              }
            };
          }
        };
        
        function loadImage(preview) {
          previewMode = preview;
          imageWorker.postMessage({
            width: $imageContainer.width(),
            height: $imageContainer.height(),
            definition: $imageCodeText.val()
          });
        }
        
        $textSubmit.click(function() {
          code = $imageCodeText.val();
          loadImage(false);
        });
        
        $textPreview.click(function() {
          loadImage(true);
        });
        
      });
    </script>
  </head>
  <body>
    <div id="container">
      <div id="imageContainer"></div>
      function setPixel(x, y) {
      <br />
      <textarea id="imageCodeText" rows="20" cols="80"></textarea>
      <br />
      } 	Your name: <input type="text" id="user" name="user"/>
      <button id="textPreview">Preview</button>
      <button id="textSubmit">Submit</button>
    </div>
  </body>
</html>