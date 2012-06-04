<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">

<head>
  <title>Image-code Project</title>
  <script src="/js/rainbow.min.js"></script>
  <script src="/js/language/generic.js"></script>
  <script src="/js/language/python.js"></script>
  <script src="/js/language/javascript.js"></script>
  <link href="/js/syntaxhighlight.css" rel="stylesheet" type="text/css"></link>
</head>

<body>

<font face="consolas">
  <h1>Image-code Project</h1>
%if language == 'javascript':
  <p><a href="/submit/{{name}}">Reuse this code</a>, or <a href='/'>Return to Gallery</a></p>
%else:
  <p>Cannot be re-used - <a href='/'>Return to Gallery</a></p>
  <p>Note: This code is written in {{language}}, and comes from a different version of this site</p>
%end

<code>
<p><b>Source for {{name}}</b></p>
<img src="/images/linebreak.png">
<div class='codeBlock'>
<pre><code data-language="{{language}}">{{code}}</code></pre>
</div>
<img src="/images/linebreak.png">
</code>  
<br />
<img src="/images/{{name+'.png'}}">

</font>
</body>
</html>