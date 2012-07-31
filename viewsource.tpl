<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">

<link rel="stylesheet" href="/stylesheet.css" type="text/css">

<head>
  <title>Image-code Project</title>
  <script src="/js/rainbow.min.js"></script>
  <script src="/js/language/generic.js"></script>
  <script src="/js/language/python.js"></script>
  <script src="/js/language/javascript.js"></script>
  <link href="/js/syntaxhighlight.css" rel="stylesheet" type="text/css"></link>
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
      <b>Source</b>
    </td>
    
    <td style="text-align:right;">
      {{name}}
    </td>
    
  </tr>
  </table>
  </div>
  
  <br />
  <br />
  <br />



  <div style="width:920px;margin-left:auto;margin-right:auto;">
  
    <b>Source for {{name}} ({{language}})</b>
    %if language == 'javascript':
      <p><a href="/submit/{{name}}"><b>Reuse this code</b></a></p>
    %else:
      <p><b>Cannot be re-used</b></p>
      <p>Note: This code is written in {{language}}, and comes from a different version of this site</p>
    %end
    
  <div class='codeBlock' style="width:450px;float:left;">
  <pre><code data-language="{{language}}">{{code}}</code></pre>
  </div>
  
  
  <div" style="width:450px;float:right;">
  <br />
    <img src="/images/{{name+'.png'}}">
  </div>
  </div>

</body>
</html>