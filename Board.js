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
['1','2','3','4','5','6','7','8'],
['9','10','11','12','13','14','15','16'],
[' ',' ',' ',' ',' ',' ',' ',' '],
[' ',' ',' ',' ',' ',' ',' ',' '],
[' ',' ',' ',' ',' ',' ',' ',' '],
[' ',' ',' ',' ',' ',' ',' ',' '],
['25','26','27','28','29','30','31','32'],
['17','18','19','20','21','22','23','24']
];

//define alphabet for selection logic
var Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a'];

var odd;
var even;
var board = [];
var selected = [];

function BuildBoard()
{
	//reset grid of selected elements
	for(var z = 0; z<64; z++) {
		if(selected[z]) {
			var num = grid[parseInt(z/8)][z%8];
			var num2 = Math.round(100 * (num - parseInt(num)));
			if(num2 > 0) {
				grid[parseInt(z/8)][z%8] = num2;
			}
		}
	}

	//Create selected map
	selected = [];
	for(var x = 0; x<64; x++) {
		selected[x] = false;
	}

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
	//console.log(grid);
}

function getBoardColor(i, k)
{
	if((k%2 == i%2)) return "rgb("+(139-(k*5))+","+(71-(k*5))+","+(40-(k*5))+")";
	else return "rgb("+(220-(i*5))+","+(204-(i*5))+","+(171-(i*5))+")";
}

function getPieceFromBoard(piece)
{
	var p = piece;
	switch(true)
	{
		case p == 1 || p == 8:
			return W_rook;
		case p == 2 || p == 7:
			return W_knight;
		case p == 3 || p == 6:
			return W_bishop;
		case p == 4:
			return W_king;
		case p == 5:
			return W_queen;
		case p >= 9 && p <= 16:
			return W_pawn;
		case p == 17 || p == 24:
			return B_rook;
		case p == 18 || p == 23:
			return B_knight;
		case p == 19 || p == 22:
			return B_bishop;
		case p == 21:
			return B_king;
		case p == 20:
			return B_queen;
		case p >= 25 && p <= 32:
			return B_pawn;
		case p >= 33:
			return "%c" + Alphabet[parseInt(p)%33] + "  " ;
		default:
			return blank;
	}
}

function getPaddingByPiece(piece)
{
	var p = piece;
	switch(true)
	{
		case p == B_pawn || p == blank:
			return 0;
		case (p[2] >= 'A' && p[2] <= 'Z') || p[2] == 'a':
			return 0;
		default:
			return 3;
	}
}

function findPosition(piece)
{
	var array = [];
	for(var i = 0; i<64; i++) {
		if(getPieceFromBoard(parseInt(grid[parseInt(i/8)][i%8])) == piece) {
			array.push(i);
		}
	}

	if(array.length == 1 || array.length == 0) return array;
	var A;
	var B = 33;
	for(var j = 0; j < array.length; j++) {
		A = B - array[j];
		A = A + array[j];
		if(!selected[i])
			grid[parseInt(array[j]/8)][array[j]%8] = A + (grid[parseInt(array[j]/8)][array[j]%8]/100);
		else
			grid[parseInt(array[j]/8)][array[j]%8] = grid[parseInt(array[j]/8)][array[j]%8];
		B++;
	}
	return array;
}

function SelectPiece(i)
{
	selected[i] = true;
}