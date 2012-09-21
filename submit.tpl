<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">
<link href="/styles/stylesheet.css" rel="stylesheet" type="text/css">
<link href="/styles/submit.css" rel="stylesheet" type="text/css">
<head>

    <title>Image-code JS</title>
    <link href="/js/stylesheet.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" href="/styles/codemirror.css">
    <script src="/js/codemirror.js"></script>
    <script src="/js/javascript.js"></script>
    <script type="text/javascript" src="/js/worker.js"></script>
    
</head>
<body>

<div class="background">

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

<div class="contentArea">

    <br />
    <br />

    <div style="width:450px;float:left;"> 
        <div class="codemirrorContainerTop">
        <code>
            <b>function setPixel(x, y) {</b><br />
            &nbsp;var r, g, b;
        <code>
        </div>
        <div class="codemirrorContainer">
            <textarea id="codeBox" class="codeBox" rows="27">
{{!startWithCode}}</textarea>
        </div>
        <div class="codemirrorContainerBottom">
        <code>
            &nbsp;return [ mod(r,256), mod(g,256), mod(b,256) ];        
            <br/>
            <b>}</b>
        </code>
        </div>
        <br />
        <textarea id="viewerConsole" class="viewerConsole" rows="5">
Loading...
        </textarea>
    
    </div>

    <div style="width:450px;float:right;">
  
    <canvas id="viewerCanvas" class="viewerCanvas" width="450" height="450">
    </canvas>
    <br />
    <input type="text" id="nameInput" class="nameInput" value="Anonymous"/>
    <button id="submitButton" class="submitButton">Submit</button> 
    </div>

</div>
</div>

</body>

<script>

    var canv = document.getElementById("viewerCanvas");
    var ctxt = canv.getContext("2d");
    var myCodeMirror = CodeMirror.fromTextArea( document.getElementById("codeBox"),
                                                { matchBrackets:true, onChange:render});
    var code;
    code = myCodeMirror.getValue();
    viewerConsole = document.getElementById("viewerConsole");
    
    var nWorkers = 1;
    var workers = Array(nWorkers);
    for (var i=0; i<workers.length; i++) {
        workers[i] = new Worker("js/imageworker.js");
    }
    
    
    var progress = 0;
    
    function onmessage(m) {
        if (m.data.log) { //There was an error
            viewerConsole.value = m.data.log;
            return;
        }
        var pixels = m.data.pixels;
        var range = m.data.range;
        var imageData = ctxt.createImageData(canv.width,(range[1]-range[0]));
        for (var x=0; x<canv.width; x++) {
            for (var y=0; y<(range[1]-range[0]); y++) {
                i = (y*canv.width+x)*4;
                c = pixels[x];
                imageData.data[i  ] = c[0];
                imageData.data[i+1] = c[1];
                imageData.data[i+2] = c[2];
                imageData.data[i+3] = 255;
            }
        }
        ctxt.putImageData(imageData,0,range[0]);
        progress++;
        viewerConsole.value = ("Rendering "+Math.floor(progress*100/canv.height)
                               +"% completed\n");
        if (progress >= canv.height) {
            viewerConsole.value = "Rendering completed, click a pixel to debug it";
        }
    }
    
    
    function render() {
        try {
        progress = 0;
        code = myCodeMirror.getValue();
        var band_height = Math.floor(canv.height/nWorkers);
        var remaining_pixels = canv.height%nWorkers;
        for (var i=0; i<workers.length; i++) {
            //respawn all our workers in case some are stuck
            workers[i].terminate();
            workers[i] = new Worker("js/imageworker.js");
            workers[i].onmessage = onmessage;
            
            var lower = i*band_height;
            var upper = lower + band_height;
            if (i==workers.length-1) { // give the last worker any extra pixels
                upper += remaining_pixels;
            }
            workers[i].postMessage({
                "lower": lower,
                "upper": upper,
                "width": canv.width,
                "height": canv.height,
                "code": code,
            });
        }
        } catch(e) {
            viewerConsole.value = e.toString();
        }
    }
    
    
    // DEBUG
    
    var debugWorker =  new Worker("js/imageworker.js");
    
    debugWorker.onmessage = (function (m) {
        var log = m.data.log;
        viewerConsole.value = log;
    });
    
    canv.addEventListener('click', onCanvasClick, false);
    function onCanvasClick(ev) {
        var px = ev.clientX - canv.offsetLeft;
        var py = ev.clientY - canv.offsetTop;
        viewerConsole.value = "debug initiated";
        debugWorker.postMessage({
            "width": canv.width,
            "height": canv.height,
            "code": code,
            "debug": true,
            "px": px,
            "py": py
        });
    }
    
    
</script>
</html>
