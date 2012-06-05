<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">
  <head>
    <title>Image-code JS</title>
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
        var startText = '{{!startWithCode}}';
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
        var $progressBar = $('.progressBar');
        var $progressBorder = $('.progressBorder').hide();
        $imageCodeText.val(startText);
        editor.setValue(startText);
        $imageContainer.css({ width: 450, height: 450 });
        canvas.width = $imageContainer.width();
        canvas.height = $imageContainer.height();
                           
        var imageWorker = new Worker('/js/imageworker.js');
        imageWorker.onmessage = function(event) {
          var data = event.data;
          if (data.progress) {
            $progressBar.css({ width: parseInt(data.progress) + '%', height: '100%' });
          } else if (data.colors) {
            $progressBar.css({ width: parseInt(data.progress) + '100%', height: '100%' });
            var pixelArray = data.colors;
            $(image).remove();
            image = new Image();
            var imageData = context.createImageData($imageContainer.width(), $imageContainer.height());
            var i=0; length = pixelArray.length;
            for (i=0; i<length; ++i) {
              imageData.data[i] = pixelArray[i];
            }
            context.putImageData(imageData, 0, 0);
            var uri = canvas.toDataURL('image/png');
            image.src = uri;
            $imageContainer.prepend(image);
            image.onload = function() {
              $progressBorder.fadeOut();
              if (!previewMode) {
                $.ajax({
                  type: "POST",
                  url: "/imageSubmitted",
                  data: { user: $user.val(), code: code, uri: uri }
                }).done(function(response) {
                  if (response=='success') {
                    window.location = '/';
                  } else if (response=='duplicate') {
                    window.location = '/error/duplicate';
                  } else { window.location=response }
                });
              }
            };
          }
        };
        
        function loadImage(preview) {
          $progressBorder.fadeIn();
          $progressBar.css({ width: '0%', height: '100%' });
          previewMode = preview;
          code = editor.getValue() || '';
          code = 'var r=0, g=0, b=0;\n' + code + '\nreturn [ r % 256, g % 256, b % 256 ];';
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
      <div id="imageContainer"><div class="progressBorder"><div class="progressBar"></div></div></div>
      <div id="codeContainer">
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
    </div>
  </body>
</html>