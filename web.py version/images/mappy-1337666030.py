def getPixel( x,y ):
   cr = [255, 0, 0]
   cg = [0, 255, 0]
   cb = [0, 0, 255]
   cz = [0, 0, 0]
   cw = [255, 255, 255]
   
   BOARD_WIDTH = 6
   BOARD_HEIGHT = 6
   
   board = [
     [cw, cw, cw, cw, cw, cw],
     [cw, cz, cw, cw, cz, cw],
     [cw, cw, cw, cw, cw, cw],
     [cw, cz, cw, cw, cz, cw],
     [cw, cw, cz, cz, cw, cw],
     [cw, cw, cw, cw, cw, cw]
   ];
   
   sq = board[int(y*BOARD_HEIGHT)][int(x*BOARD_WIDTH)]
   
   r,g,b = sq
   return r%256,g%256,b%256