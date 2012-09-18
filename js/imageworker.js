// The worker sends back lines as they are completed to allow gradual image construction

var worker = self;
worker.postMessage = worker.webkitPostMessage || worker.postMessage;

importScripts('/js/seedrandom.js');

worker.onmessage = function(m) {
    var width = m.data.width;
    var height = m.data.height;
    var lower = m.data.lower;
    var upper = m.data.upper;
    var code = m.data.code;
    var debug = m.data.debug;
    var px = m.data.px;
    var py = m.data.py;
    
    // So img_func is the function to trace
    img_func = getFunction(code);
    
    if (debug) {
        worker.postMessage({"log":debugPixel(width,height,img_func,px,py)});
    } else {
        var order = calculateOrderBFS(lower,upper);
        for (var i=0; i<order.length; i++) {
            var y = order[i][0];
            pixel_band = renderLine(width,height,img_func,y);
            worker.postMessage({"pixels":pixel_band,"range":[order[i][1],order[i][2]+1]});
        }
    }
};


function getFunction(code) {
	var worker, XMLHttpRequest, Worker, importScripts;
	worker=XMLHttpRequest=Worker=importScripts=undefined;
	var sin = Math.sin, PI = Math.PI, pi = Math.PI, cos = Math.cos, 
      tan = Math.tan, log = Math.log, sqrt = Math.sqrt, abs = Math.abs,
      floor = Math.floor, ceil = Math.ceil, round = Math.round, exp = Math.exp,
      acos = Math.acos, asin = Math.asin, atan = Math.atan, atan2 = Math.atan2,
      max = Math.max, min = Math.min, pow = Math.pow, random = Math.random;
	// as Javascript's modulus operator fails for negative numbers
    function fixedModulus(x,m) { return ((x%m)+m)%m; };
    var mod = fixedModulus;
	eval("function f(x,y,z) { Math.seedrandom('0'); "+code+"}");
	return f;
}


// Takes queue = [[min,max]] and list order and adds the correct sequence
// for a breadth first traversal of numbers from min to max along with the
// range of adjacent unrendered lines
function calculateOrderBFS(lower,upper) {
	var queue = [[lower,upper]];
    var order = [];
    while (queue.length > 0) {
		var indices = queue.shift();
		newIndex = Math.floor((indices[0]+indices[1])/2);
		if (newIndex == indices[0]) {
		    order.push([newIndex,newIndex,newIndex]);
		    if (newIndex != indices[1]) {
		        order.push([indices[1],indices[1],indices[1]]);
		    }
		} else {
		    queue.push([indices[0],newIndex-1]);
		    queue.push([newIndex+1,indices[1]]);
		    order.push([newIndex,indices[0],indices[1]]);
		}
	}
	return order;
}



function renderLine( width, height, img_func, y ) {
    var pixels = Array(width);
    width = width-1;
    height = height-1;
    for (var x=0; x<=width; x++) {
        pixels[x] = img_func(x/width,y/height);
    }
    return pixels;
}



function debugPixel(width,height,img_func,px,py) {
    return "(.5,.5): "+img_func(0.5,0.5);
    out = "Debug mode pixel: ("+px+","+py+")"+'\n';
    width = width-1;
    height = height-1;
	out += "Image coordinate: ("+[px/width,py/height]+")\n";
    out += "Output color: ("+img_func(px/width,py/height)+")\n";
    return out;
}
