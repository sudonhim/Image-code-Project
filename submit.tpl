<html>

<head>
  <title>pyImageServer</title>
</head>

<body>

<font face="consolas">
  <h1>Sudo's Image-code Project</h1>
</font>

<a href='/help'>Help</a>, or <a href='/'>Return to Gallery</a>

%if not defined("ucode"):
  %ucode = "r = x\ng = y\nb = 0\nr,g,b = r*255,g*255,b*255"
%end

<code>
<form method="POST">
<pre>
def getPixel( x,y ):
<textarea rows="15" cols="52" name="code" id="code">{{ucode}}</textarea>
  return r,g,b
</pre>
<br />
<button id="Preview" name="Preview">Preview</button>
<br />


%if defined('err'):
	<img src="/images/linebreak.png">
	<p><b>
	<font color="red">
	{{err}}
	</font><br />
	<img src="/images/linebreak.png">
	</b></p>
%end
%if defined('imageurl'):
	<img src="/images/linebreak.png">
	<br /><pre>                <img src="{{imageurl}}"></pre><br />
	<img src="/images/linebreak.png">
	<br />
	Your name: <input type="text" id="user" name="user"/>
        <button id="Submit" name="Submit">Submit</button>
	<br />Stop making really cool images and then not submitting them!
%end
</form>
	
</code>
</body>
</html>