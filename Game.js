var player = 1;

BuildBoard();
DrawBoard();

Object.defineProperty(window, "select_pawn", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_pawn) : findPosition(W_pawn);
  	return PieceSelected(position_array, "pawns");
  }
});

Object.defineProperty(window, "select_rook", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_rook) : findPosition(W_rook);
  	return PieceSelected(position_array, "rooks");
  }
});

Object.defineProperty(window, "select_knight", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_knight) : findPosition(W_knight);
  	return PieceSelected(position_array, "knights");
  }
});

Object.defineProperty(window, "select_bishop", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_bishop) : findPosition(W_bishop);
  	return PieceSelected(position_array, "bishops");
  }
});

Object.defineProperty(window, "select_queen", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_queen) : findPosition(W_queen);
  	return PieceSelected(position_array, "queen");
  }
});

Object.defineProperty(window, "select_king", {
  get: function() {
  	var position_array = (player == 1) ? findPosition(B_king) : findPosition(W_king);
  	return PieceSelected(position_array, "king");
  }
});

Object.defineProperty(window, "deselect", {
  get: function() {
  	BuildBoard();
  	DrawBoard();
  	return "Input Command. Type help for list of commands.";
  }
});

Object.defineProperty(window, "help", {
  get: function() {
  	return "\nCOMMANDS:\n\nnew_game (use to reset board)\nselect_pawn\nselect_rook\nselect_knight\nselect_bishop\nselect_queen\nselect_king\nselect_queen\nselect_[A-H] (used to select when multiple pieces are available)\nmove_[A-Z, a] (used to move a piece once selected)\ndeselect\nhelp\nquit\n";
  }
});

Object.defineProperty(window, "quit", {
  get: function() {
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
  		return "Select a location to move piece.";
  	}
  	else if(position_array.length == 0){
  		return ((piece == "king" || piece == "queen")?"The ":"All ")+piece+" for player "+((player == 1)?1:2)+((piece == "king" || piece == "queen")?" is":" are")+" gone.";
  	}
  	else {
  		return "Select a piece.";
  	}
}