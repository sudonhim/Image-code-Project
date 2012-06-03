<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">
  <head>
    <title>Image Code JS</title>
    <link href="/js/stylesheet.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" href="/js/codemirror.css">
    <script src="/js/codemirror.js"></script>
    <script src="/js/javascript.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="/js/worker.js"></script>
    <script>
      
      $(document).ready(function() {
        var $textSubmit = $('#textSubmit');
        var $textPreview = $('#textPreview');
        var $user = $('#user');
        var $imageCodeText = $('#code');
        var defaultText = 'r = x * 255;\ng = y * 255;\nb = 0;';
        var $imageContainer = $('#imageContainer');
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var image = new Image();
        var editor = CodeMirror.fromTextArea($imageCodeText[0], {
          lineNumbers: true,
          matchBrackets: true
        });
        var code = '';
        var previewMode = true;
        $imageCodeText.val(defaultText);
        editor.setValue(defaultText);
        $imageContainer.css({ width: 500, height: 500 });
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
          code = editor.getValue() || '';
          code = 'var r=0, g=0, b=0;\n' + code + '\nreturn [ r%256, g%256, b%256 ];';
          imageWorker.postMessage({
            width: $imageContainer.width(),
            height: $imageContainer.height(),
            definition: code
          });
        }
        
        $textSubmit.click(function() {
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
      <div id="codeBlock">
        function setPixel(x, y) {
        <br/>
        &nbsp;&nbsp;&nbsp;var r, g, b;
        <br />
        &nbsp;&nbsp;&nbsp;<textarea id="code" name="code" rows="20" cols="80"></textarea>
        <br />
        &nbsp;&nbsp;&nbsp;return [ r % 256, g % 256, b % 256 ];        
        <br/>
        } 	Your name: <input type="text" id="user" name="user"/>
      </div>
      <button id="textPreview">Preview</button>
      <button id="textSubmit">Submit</button>
    </div>
  </body>
</html>