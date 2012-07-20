<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="en">

<link rel="stylesheet" href="/stylesheet.css" type="text/css">

<head>
  <title>Image-code Project</title>
</head>

<body>

  <div class="header">
  <table>
  
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
        <b>Gallery</b>
    </td>
    
    <td style="text-align:right;">
        %lastImage = imageNum+len(imageurls)
        showing {{imageNum}}-{{lastImage}}...
        %if imageNum+imagesPerPage>=totalImages:
          -END
        %else:
          <a href='/gallery/{{lastImage}}'>NEXT</a>
        %end
        %if imageNum>0:
          /
          <a href='/gallery/{{max(imageNum-imagesPerPage,0)}}'>PREV</a>
        %end
    </td>
    
  </table>
  </div>
  
  <br />
  <br />
    
  <div class="images_area">
    %for i in range(len(imageurls)):
      %contributor = contributors[i]
      %imgurl = "/images/thumbnails/"+imageurls[i]+"-thumb.png"
      %codeurl = "/code/"+imageurls[i]
        <a href="{{codeurl}}">
           <img
             src="{{imgurl}}"
             title="{{contributor}}"
             class="image_tile"
             >
        </a>
    %end
  </div>
   
</body>

</html>