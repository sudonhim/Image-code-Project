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
    
    <td style="text-align:center;">
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



  <table style="width:100%;">
  <td width="47%" style="float:right;vertical-align:top;">
  
      <b>Source for {{name}} ({{language}})</b>
      %if language == 'javascript':
        <p><a href="/submit/{{name}}"><b>Reuse this code</b></a></p>
      %else:
        <p><b>Cannot be re-used</b></p>
        <p>Note: This code is written in {{language}}, and comes from a different version of this site</p>
      %end
      
    <div class='codeBlock' style="width:450px;">
    <pre><code data-language="{{language}}">{{code}}</code></pre>
    </div>
  </td>
  
  <td width="6%"></td>  
  
  <td width="47%" style="text-align:left;vertical-align:top;padding-top:14px;">
    <img src="/images/{{name+'.png'}}">
  </td>
  </table>

</font>
</body>
</html>