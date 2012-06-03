<html>
<body>
<?php

$img = @imagecreatefrompng("loadme.png");
if ($img === false) die('Couldn\'t load image!');
$SIZE = 450;

echo "board = [";
for ($x = 0; $x < $SIZE; $x++) {
	echo "\n";
	echo "    [";
	$line = array();
	for ($y = 0; $y < $SIZE; $y++) {
		$px = imagecolorat($img, $x, $y);
		$line[] = "[".(($px>>16)&0xFF).','.(($px>>8)&0xFF).','.($px&0xFF).']';
	}
	echo implode(",", $line);
	if ($x != $SIZE-1) echo "],";
}
echo "]\n];\n";
echo "r,g,b = board[int(y*".$SIZE.")][int(x*".$SIZE.")]\n";
?>
</html>
</body>