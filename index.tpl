<html>

<head>
  <title>pyImageServer</title>
</head>

<body>

<font face="consolas">
  <h1>Sudo's Image-code Project</h1>
  
<p><a href='/submit'>Make your own!</a></p>

%for i in range(len(imageurls)):
   %contributor = contributors[i]
   %imgurl = "/images/"+imageurls[i]+".png"
   %codeurl = "/code/"+imageurls[i]+".py"
   <p>
     <a href="{{codeurl}}" style="text-decoration: none">
     <img src="{{imgurl}}"><br />
     <font color=black>{{contributor}}</font>
     </a>
   </p>
%end
   
</font>
</body>
</html>