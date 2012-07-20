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
      <b>Help/About</b>
    </td>
    
    <td style="text-align:right;">
    </td>
    
  </tr>
  </table>
  </div>
  
  <br />
  <br />
  <br />

  <div class="information">
  
    <h3>About</h3>
    <p>
    Image-code was started in May 2012 as a prototype gallery where users could generate images on
    the server by submitting Python code. The site was then rebuilt and image processing
    was switched to Javascript so that it could be done client-side. Image-code is intended
    to promote coding for fun, and cater to all skill levels. The project has an open-source
    GitHub repository <a href="https://github.com/SudoNhim/Image-code-Project">here</a>.
    </p>
    <br />
    
    <h3>Getting started</h3>
    <p>
    The best way to get going with Image-code, is to modify somebody
    else's submission. To do this, choose an image from the main gallery
    that you would like to change and click it to view its source.
    Then click reuse code to open a new submission based on that code.
    Note that some older images may not be able to be reused.
    </p>
    <br />
    
    <h3>Making images</h3>
    <p>
    Each image is defined by a function <b>getPixel(x,y)</b>,
    which maps the <b>x,y</b> position of each pixel in the image
    to an <b>r,g,b</b> value. To generate an image, you must
    complete the getPixel function, so that <b>r,g</b> and <b>b</b> are
    defined for each <b>x,y</b> coordinate on the image.
    Arguments <b>x,y</b> are floats from 0.0 to 1.0 increasing
    from the top left corner of the image, and <b>r,g,b</b> are,
    numbers from 0 to 255.
    </p>
    <br />
    
    <h3>What code can I use?</h3>
    <p>
    Currently, only Javascript is supported (more languages may be added soon).
    The contents of Javascript's math library are included in the scope of the
    <b>getPixel</b> function, so sin, exp, atan ect can be used without prefix.<br />
    IMPORTANT: In Javascript, the "%" operator is for remainder, not modulus. For
    a modulus that works with negative numbers, use the <b>mod</b> function instead.
    </p>
    <br />
    
    Have fun!

    </div>

</body>
</html>