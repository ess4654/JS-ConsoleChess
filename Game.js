//Global Variables
var player = 1;
var multi_piece = false;
var num_pieces = 0;
var position_array = [];

//Initialize Game
Init("Input Command. Type 'help' for list of commands.");

Object.defineProperty(window, "select_pawn", {
  get: function() {
  	if(multi_piece != "pawns") {
  		refresh();
  		return Select(B_pawn, W_pawn, "pawns");
  	}
	else {
		console.clear();
		DrawBoard();
  		return msg("You must select a pawn to move [A-"+Alphabet[num_pieces-1]+"].");
	}
  }
});

Object.defineProperty(window, "select_rook", {
  get: function() {
  	if(multi_piece != "rooks") {
  		refresh();
  		return Select(B_rook, W_rook, "rooks");
  	}
	else {
		console.clear();
		DrawBoard();
  		return msg("You must select a rook to move [A-"+Alphabet[num_pieces-1]+"].");
	}
  }
});

Object.defineProperty(window, "select_knight", {
  get: function() {
  	if(multi_piece != "knights") {
  		refresh();
  		return Select(B_knight, W_knight, "knights");
  	}
	else {
		console.clear();
		DrawBoard();
  		return msg("You must select a knight to move [A-"+Alphabet[num_pieces-1]+"].");
	}
  }
});

Object.defineProperty(window, "select_bishop", {
  get: function() {
  	if(multi_piece != "bishops") {
  		refresh();
  		return Select(B_bishop, W_bishop, "bishops");
  	}
  	else {
  		console.clear();
		DrawBoard();
  		return msg("You must select a bishop to move [A-"+Alphabet[num_pieces-1]+"].");
  	}
  }
});

Object.defineProperty(window, "select_queen", {
  get: function() { return Select(B_queen, W_queen, "queen"); }
});

Object.defineProperty(window, "select_king", {
  get: function() { return Select(B_king, W_king, "king"); }
});

function Select(p1Piece, p2Piece, type)
{
	position_array = [];
	position_array = (player == 1) ? findPosition(p1Piece) : findPosition(p2Piece);
  	num_pieces = position_array.length;
  	return PieceSelected(position_array, type);
}

Object.defineProperty(window, "select_A", {
  get: function() { return SelectSinglePiece(0); }
});

Object.defineProperty(window, "select_B", {
  get: function() { return SelectSinglePiece(1); }
});

Object.defineProperty(window, "select_C", {
  get: function() { return SelectSinglePiece(2); }
});

Object.defineProperty(window, "select_D", {
  get: function() { return SelectSinglePiece(3); }
});

Object.defineProperty(window, "select_E", {
  get: function() { return SelectSinglePiece(4); }
});

Object.defineProperty(window, "select_F", {
  get: function() { return SelectSinglePiece(5); }
});

Object.defineProperty(window, "select_G", {
  get: function() { return SelectSinglePiece(6); }
});

Object.defineProperty(window, "select_H", {
  get: function() { return SelectSinglePiece(7); }
});

function SelectSinglePiece(pos)
{
	if(num_pieces == 1) {
		console.clear();
		DrawBoard();
		return(msg("Select a location to move piece."));
	}
	if(position_array.length == 0 || num_pieces == 0) {
		console.clear();
		DrawBoard();
		return msg("Error: you must selected a type of piece to move first.");
	}
	if(pos+1 > position_array.length || pos < 0) {
		console.clear();
		DrawBoard();
		return msg("Error: you must selected a type of piece to move first.");
	}
	position_array = [position_array[pos]];
	BuildBoard();
	multi_piece = false;
  	num_pieces = 1;
	SelectPiece(position_array[0]);
	DrawBoard();
	return msg("Select a location to move piece.");
}

Object.defineProperty(window, "deselect", {
  get: function() {
  	multi_piece = false;
  	num_pieces = 0;
  	return refresh("Input Command. Type 'help' for list of commands.");
  }
});

function Init(message)
{
	BuildBoard();
  	DrawBoard();
  	multi_piece = false;
  	num_pieces = 0;
  	console.log("%c"+Array(87).join('*'), "color:red;");
  	console.log("%c"+message, "font-size:16px; padding:7px 0px 7px 0px;");
  	console.log("%c"+Array(87).join('*'), "color:red;");
}

function refresh(message)
{
	BuildBoard();
  	DrawBoard();
  	console.log("%c"+Array(87).join('*'), "color:red;");
  	console.log("%c"+message, "font-size:16px; padding:7px 0px 7px 0px;");
  	return Array(86).join('*');
}

function msg(message)
{
  	console.log("%c"+Array(87).join('*'), "color:red;");
  	console.log("%c"+message, "font-size:16px; padding:7px 0px 7px 0px;");
  	return Array(86).join('*');
}

Object.defineProperty(window, "help", {
  get: function() {
  	return refresh("\nCOMMANDS:\n\nnew_game (use to reset board)\nselect_pawn\nselect_rook\nselect_knight\nselect_bishop\nselect_queen\nselect_king\nselect_queen\nselect_[A-H] (used to select when multiple pieces are available)\nmove_[A-Z, a] (used to move a piece once selected)\ndeselect\nhelp\nquit\n");
  }
});

Object.defineProperty(window, "quit", {
  get: function() {
  	multi_piece = false;
  	num_pieces = 0;
  	console.clear();
  	return "Thank you for playing!";
  }
});

function PieceSelected(position_array, piece)
{
	BuildBoard();
  	for(var i = 0; i<position_array.length; i++)
  		SelectPiece(position_array[i]);
  	DrawBoard();
  	if(position_array.length == 1){
  		multi_piece = false;
  		return msg("Select a location to move piece.");
  	}
  	else if(position_array.length == 0){
  		multi_piece = false;
  		return msg(((piece == "king" || piece == "queen")?"The ":"All ")+piece+" for player "+((player == 1)?1:2)+((piece == "king" || piece == "queen")?" is":" are")+" gone.");
  	}
  	else {
  		multi_piece = piece;
  		return msg("Select a piece.");
  	}
}