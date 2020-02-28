//define chess pieces
var blank = "%c   ";
/***** black pieces *****/
var B_pawn = "%c♟️ ";
var B_knight = "%c♞ ";
var B_rook = "%c♜ ";
var B_bishop = "%c♝ ";
var B_king = "%c♚ ";
var B_queen = "%c♛ ";
/***** white pieces *****/
var W_pawn = "%c♙ ";
var W_knight = "%c♘ ";
var W_rook = "%c♖ ";
var W_bishop = "%c♗ ";
var W_king = "%c♔ ";
var W_queen = "%c♕ ";

//define the logical game board
var grid = [
['R','H','B','K','Q','B','H','R'],
['P','P','P','P','P','P','P','P'],
[' ',' ',' ',' ',' ',' ','k',' '],
[' ',' ','H',' ',' ',' ','P',' '],
['p',' ',' ','b','Q',' ',' ',' '],
[' ',' ',' ',' ',' ',' ','r',' '],
['p','p','p','p','p','p','p','p'],
['r','h','b','q','k','b','h','r']
];

var odd;
var even;
var board = [];
var selected = [];

function BuildBoard()
{
	//Create board pieces
	board = [];
	for(var i = 0; i<4; i++) {
		odd = "";
		even = "";
		for(var k = 0; k<8; k++) {
			odd += "%c "+getPieceFromBoard(grid[2*i+1][k])+"%c ";
			even += "%c "+getPieceFromBoard(grid[2*i][k])+"%c ";
		}
		board.push(even);
		board.push(odd);
	}

	//Create selected map
	selected = [];
	for(var x = 0; x<64; x++) {
		selected[x] = false;
	}
}

function DrawBoard()
{
	console.clear();
	for(var i = 0; i<4; i++) {
		console.log(board[i*2],
			"background-color:"+((selected[2*i*8+0])?"yellow":getBoardColor(i*2, 0))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+0])?"yellow":getBoardColor(i*2, 0))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][0]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][0]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+1])?"yellow":getBoardColor(i*2, 1))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+1])?"yellow":getBoardColor(i*2, 1))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][1]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][1]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+2])?"yellow":getBoardColor(i*2, 2))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+2])?"yellow":getBoardColor(i*2, 2))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][2]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][2]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+3])?"yellow":getBoardColor(i*2, 3))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+3])?"yellow":getBoardColor(i*2, 3))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][3]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][3]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+4])?"yellow":getBoardColor(i*2, 4))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+4])?"yellow":getBoardColor(i*2, 4))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][4]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][4]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+5])?"yellow":getBoardColor(i*2, 5))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+5])?"yellow":getBoardColor(i*2, 5))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][5]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][5]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+6])?"yellow":getBoardColor(i*2, 6))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+6])?"yellow":getBoardColor(i*2, 6))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][6]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][6]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+7])?"yellow":getBoardColor(i*2, 7))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+7])?"yellow":getBoardColor(i*2, 7))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i][7]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i][7]) == blank)?"transparent":"default")+";",
			"background:white;" //spacer
		);

		console.log(board[i*2+1],
			"background-color:"+((selected[2*i*8+8])?"yellow":getBoardColor(i*2+1, 0))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+8])?"yellow":getBoardColor(i*2+1, 0))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][0]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][0]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+9])?"yellow":getBoardColor(i*2+1, 1))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+9])?"yellow":getBoardColor(i*2+1, 1))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][1]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][1]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+10])?"yellow":getBoardColor(i*2+1, 2))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+10])?"yellow":getBoardColor(i*2+1, 2))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][2]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][2]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+11])?"yellow":getBoardColor(i*2+1, 3))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+11])?"yellow":getBoardColor(i*2+1, 3))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][3]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][3]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+12])?"yellow":getBoardColor(i*2+1, 4))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+12])?"yellow":getBoardColor(i*2+1, 4))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][4]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][4]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+13])?"yellow":getBoardColor(i*2+1, 5))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+13])?"yellow":getBoardColor(i*2+1, 5))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][5]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][5]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+14])?"yellow":getBoardColor(i*2+1, 6))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+14])?"yellow":getBoardColor(i*2+1, 6))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][6]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][6]) == blank)?"transparent":"default")+";",
			"background:white;", //spacer

			"background-color:"+((selected[2*i*8+15])?"yellow":getBoardColor(i*2+1, 7))+"; font-size:30px; line-height:58px; padding: 2px 0px 2px 0px;",
			"background-color:"+((selected[2*i*8+15])?"yellow":getBoardColor(i*2+1, 7))+"; font-size:30px; line-height:58px; padding: 2px "+getPaddingByPiece(getPieceFromBoard(grid[2*i+1][7]))+"px 2px 0px; color:"+((getPieceFromBoard(grid[2*i+1][7]) == blank)?"transparent":"default")+";",
			"background:white;" //spacer
		);
	}
}

function getBoardColor(i, k)
{
	if((k%2 == i%2)) return "rgb("+(139-(k*5))+","+(71-(k*5))+","+(40-(k*5))+")";
	else return "rgb("+(220-(i*5))+","+(204-(i*5))+","+(171-(i*5))+")";
}

function getPieceFromBoard(piece)
{
	switch(piece)
	{
		case 'R':
			return B_rook;
		case 'H':
			return B_knight;
		case 'B':
			return B_bishop;
		case 'K':
			return B_king;
		case 'Q':
			return B_queen;
		case 'P':
			return B_pawn;
		case 'r':
			return W_rook;
		case 'h':
			return W_knight;
		case 'b':
			return W_bishop;
		case 'k':
			return W_king;
		case 'q':
			return W_queen;
		case 'p':
			return W_pawn;
		default:
			return blank;
	}
}

function getPaddingByPiece(piece)
{
	switch(piece)
	{
		case B_pawn || W_pawn:
			return 0;
		case blank:
			return 0;
		default:
			return 3;
	}
}