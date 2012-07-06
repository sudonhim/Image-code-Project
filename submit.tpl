<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">

<link rel="stylesheet" href="/stylesheet.css" type="text/css">

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
          matchBrackets: true,
          onChange: loadPreview
        });
        
        var ready = false
        function loadPreview(event){ 
        if (ready) { loadImage(true) }
        }
        
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
        
        ready = true;
        loadImage(true);
        
      });
    </script>
  </head>
  <body>
  
  <div class="header">
  <table>
  <tr>
  
    <td>
      <b>Image-code Project</b>
      ::
      <a href="/gallery/0">Gallery</a>
      |
      <a href='/submit'>Submit</a>
      |
      <a href='/help'>Help/About</a>
    </td>
    
    <td style="text-align:center;">
      <b>Submit</b>
    </td>
    
    <td style="text-align:right;">
    javascript
    </td>
    
  </tr>
  </table>
  </div>
  
  <br />
  <br />
  <br />
  
  <table style="width:100%;">

    <td width="450px" style="float:right;vertical-align:top;"> 
    <div id="container">
      <div id="codeContainer">
        <div id="codeBlock">
          <b>function setPixel(x, y) {</b>
          <br/>
          &nbsp;&nbsp;&nbsp;var r, g, b;
          <br />
          <textarea id="code" name="code"></textarea>
          <br />
          &nbsp;&nbsp;&nbsp;return [ r % 256, g % 256, b % 256 ];        
          <br/>
          }
        </div>
      </div>
    </div>
    </td>
  
    <td width="5%"></td>  
  
    <td width="45%" style="text-align:left;vertical-align:top;">
    <div id="imageContainer"><div class="progressBorder"><div class="progressBar"></div></div></div>
    </td>
    
  </table>
  
  <p style="text-align:center;">
  Name: <input type="text" id="user" name="user"/>
  <button id="textSubmit">Submit</button> 
  </p>
  
</body>
</html>