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
                
                     
        var threadProgress = [0,0,0,0]; 
        var imageData = context.createImageData($imageContainer.width(), $imageContainer.height());
        
        function imageProgress() {
          var sum = 0;
          for (var i=0; i<4; i++) {
            sum += threadProgress[i];
          };
          return sum/4;
        };
        
        
        
        function onmessage(event) {
          var data = event.data;
          
          if (data.progress) {
            $progressBar.css({ width: 100*imageProgress()+'%', height: '100%' });
            threadProgress[data.offset] = data.progress;
            
          } else if (data.colors) {
            threadProgress[data.offset] = 1;
            
            var pixelArray = data.colors; 
            var i=0; length = pixelArray.length;
            for (i=0; i<length/4; ++i) {
              var toIndex = 16*i + 4*data.offset;
              var fromIndex = 4*i;
              imageData.data[toIndex  ] = pixelArray[fromIndex  ];
              imageData.data[toIndex+1] = pixelArray[fromIndex+1];
              imageData.data[toIndex+2] = pixelArray[fromIndex+2];
              imageData.data[toIndex+3] = pixelArray[fromIndex+3];
            }
            
            if (imageProgress() == 1) { 
              $progressBar.css({ width: '100%', height: '100%' });
              $(image).remove();
              image = new Image();
              
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
                    data: { user: $user.val(), code: code, uri: uri+'||||' }
                  }).done(function(response) {
                    if (response=='success') {
                      window.location = '/';
                    } else {
                      window.location = '/error/'+response;
                    }
                  });
                }
              };
            };
          };
        };
        
        var imageWorkers = [];
        for (var i=0; i<4; i++) {
          imageWorkers[i] = new Worker('/js/multicore_imageworker.js');
          }

        
        function loadImage(preview) {
        
          previewMode = preview;
          code = editor.getValue() || '';
          code = 'var r=0, g=0, b=0;\n' + code + '\nreturn [ mod(r,256), mod(g,256), mod(b,256) ];';        
        
          for (var i=0; i<4; i++) {
            imageWorkers[i].terminate();
            imageWorkers[i] = new Worker('/js/multicore_imageworker.js');
            imageWorkers[i].onmessage = onmessage;
            imageWorkers[i].postMessage({
              width: $imageContainer.width(),
              height: $imageContainer.height(),
              offset: i,
              definition: code
            });
          }
          $progressBorder.show();
          $progressBar.css({ width: '0%', height: '100%' });
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
    
    <td style="text-align:center;width:10%;">
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
  
  <div style="width:920px;margin-left:auto;margin-right:auto;">

    <div style="width:450px;float:left;"> 
    <div id="container">
      <div id="codeContainer">
        <div id="codeBlock">
          <b>function setPixel(x, y) {</b>
          <br/>
          &nbsp;&nbsp;&nbsp;var r, g, b;
          <br />
          <textarea id="code" name="code"></textarea>
          <br />
          &nbsp;&nbsp;&nbsp;return [ mod(r,256), mod(g,256), mod(b,256) ];        
          <br/>
          }
        </div>
      </div>
    </div>
    </div>
  
    <div style="width:450px;float:right;">
    <div id="imageContainer"><div class="progressBorder"><div class="progressBar"></div></div></div>
    </div>
    
    <p style="text-align:center;">
    Name: <input type="text" id="user" name="user"/>
    <button id="textSubmit">Submit</button> 
    </p>
  
  </div>
  
</body>
</html>