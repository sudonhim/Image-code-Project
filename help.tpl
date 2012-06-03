<html>

<head>
  <title>pyImageServer</title>
</head>

<body>

<font face="consolas">
  <h1>Sudo's Image-code Project</h1>
  
<p><a href='/submit'>Make your own!</a>, or <a href='/'>Return to Gallery</a></p>

<h3>About</h3>
This webserver allows you to generate images using a<br />
subset of the Python programming language.It runs on<br />
a CherryPy server, and requests are handled by a<br />
Python program in the Bottle framework.<br />
<br />

<h3>Making images</h3>
Each image is defined by a function <b>getPixel(x,y)</b>,<br />
which maps the <b>x,y</b> position of each pixel in the image<br />
to an <b>r,g,b</b> value. To generate an image, you must<br />
complete the getPixel function, so that <b>r,g</b> and <b>b</b> are<br />
defined for each <b>x,y</b> coordinate on the image.<br />
Arguments <b>x,y</b> are floats from 0.0 to 1.0 increasing<br />
from the top left corner of the image, and <b>r,g,b</b> are,<br />
integers from 0 to 255. Note that they will be<br />
automatically converted from floats and will overflow<br />
if too large/small.<br />
<br />

<h3>What code can I use?</h3>
For security, the code is executed in a much smaller<br />
subset of the Python language, but it should provide<br />
everything you need.<br />
In addition to basic syntax, the
<a href="http://docs.python.org/library/math.html"> Python math library</a><br />
is available, functions like sin(x), tanh(x), exp(x)<br />
should work. Note that execution is timeboxed, so<br />
if your code is overly demanding or has an infinite<br />
loop you will get an error.<br />
<br />

<h3>Viewing source</h3>
The easiest way to get started, is to modify somebody<br />
else's submission. To view the source for an existing<br />
image, simply click on it in the main gallery.<br />
<br />
Have fun! :D

</font>
</body>
</html>