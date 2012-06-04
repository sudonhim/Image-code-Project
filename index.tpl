<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">

<head>
  <title>Image-code Project</title>
</head>

<body>

<font face="consolas">
  <h1>Image-code Project</h1>
  
<p><a href='/submit'>Make your own!</a></p>

%for i in range(len(imageurls)):
   %contributor = contributors[i]
   %imgurl = "/images/"+imageurls[i]+".png"
   %codeurl = "/code/"+imageurls[i]
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