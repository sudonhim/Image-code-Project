<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">
<link href="/styles/stylesheet.css" rel="stylesheet" type="text/css">
<link href="/styles/submit.css" rel="stylesheet" type="text/css">
<head>

    <title>Image-code JS</title>
    <link href="/js/stylesheet.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" href="/js/codemirror.css">
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
    <br />

    <div style="width:450px;float:left;"> 

    <b>function setPixel(x, y) {</b>
    <br/>
    &nbsp;&nbsp;&nbsp;var r, g, b;
    <br />
        <textarea id="codeBox" class="codeBox" rows="27"></textarea>
    <br />
    &nbsp;&nbsp;&nbsp;return [ mod(r,256), mod(g,256), mod(b,256) ];        
    <br/>
    <b>}</b>

    </div>

    <div style="width:450px;float:right;">
    
    <input type="text" id="nameInput" class="nameInput" value="Anonymous"/>
    <button id="submitButton" class="submitButton">Submit</button> 
    
    <br />
  
    <canvas id="viewerCanvas" class="viewerCanvas" width="450" height="450">
    </canvas>
    <br />
    <textarea id="viewerConsole" class="viewerConsole" rows="7">
Loading...
    </textarea>
    </div>

</div>
</div>

<script src="js/imageworker.js"></script>
<script>

    var canv = document.getElementById("viewerCanvas");
    var ctxt = canv.getContext("2d");
    var code;
    viewerConsole = document.getElementById("viewerConsole");
    
    var nWorkers = 4;
    var workers = Array(nWorkers);
    for (var i=0; i<workers.length; i++) {
        workers[i] = new Worker("js/imageworker.js");
    }
    
    
    var progress = 0;
    
    function onmessage(m) {
        var pixels = m.data.pixels;
        var range = m.data.range;
        var imageData = ctxt.createImageData(canv.width,(range[1]-range[0]));
        for (var x=0; x<canv.width; x++) {
            for (var y=0; y<(range[1]-range[0]); y++) {
                i = (y*canv.width+x)*4;
                c = Math.floor(pixels[x]);
                imageData.data[i  ] = 255-c;
                imageData.data[i+1] = 255-c;
                imageData.data[i+2] = 255-c;
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
        code = document.getElementById("coBebox").value;
        var img_func = getFunction(code); // To test that it compiles
        img_func(0.0,0.0); // And runs
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

</body>
</html>
