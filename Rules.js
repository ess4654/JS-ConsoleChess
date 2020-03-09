function ShowPositions(pos, numPieces, player, callback=null)
{
	if(numPieces != 1) 
	{
		if(callback != null)
			callback("fail");
		return;
	}

	var X = pos%8;
	var Y = parseInt(pos/8);
	var type = grid[Y][X];
	var MoveList = GetPossibleMoves(X, Y, type, player);

	if(callback != null)
		callback(MoveList);
	return "Select a location to move piece.";
}

function GetPossibleMoves(X, Y, piece, player)
{
	var possible_moves = [];
	switch(getPieceFromBoard(piece))
	{
		case B_pawn || W_pawn:
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var diffX = Math.abs(X-(d%8));
				var diffY = Math.abs(Y-(parseInt(d/8)));
				var Xsame = ((d%8)==X);
				var Ysame = ((parseInt(d/8))==Y);
   				var CrossKill = (getPieceFromBoard(grid[parseInt(d/8)][d%8]) != blank);
				
   				if((Xsame&&((Y+player)==parseInt(d/8)))&&!CrossKill)
					possible_moves.push([parseInt(d/8), d%8]);
				else if((diffX==1&&parseInt(d/8)-Y==parseInt(d/8))&&CrossKill)
					possible_moves.push([parseInt(d/8), d%8]);
				else if((Xsame&&Y+(parseInt(d/8)*2)==parseInt(d/8))&&!CrossKill&&((Y==parseInt((-2.5*parseInt(d/8)+3.5)))))
					possible_moves.push([parseInt(d/8), d%8]);			
			}
			break;
		case B_rook || W_rook:
			//Horizontal Movement
			//Vertical Movement
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var Xsame = ((d%8)==X);
				var Ysame = ((parseInt(d/8))==Y);
				if((Xsame&&!Ysame)||(!Xsame&&Ysame))
					possible_moves.push([parseInt(d/8), d%8]);
			}
			break;
		case B_knight || W_knight:
			//Horse Movement
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var diffX = Math.abs(X-(d%8));
				var diffY = Math.abs(Y-(parseInt(d/8)));
				if((diffX==2&&diffY==1)||(diffX==1&&diffY==2))
					possible_moves.push([parseInt(d/8), d%8]);
			}
			break;
		case B_bishop || W_bishop:
			//Diagonal Movement
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var diffX = Math.abs(X-(d%8));
				var diffY = Math.abs(Y-(parseInt(d/8)));
				if(diffX==diffY)
					possible_moves.push([parseInt(d/8), d%8]);
			}
			break;
		case B_king || W_king:
			//Vertical Movement
			//Horizontal Movement
			//Diagonal Movement
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var diffX = Math.abs(X-(d%8));
				var diffY = Math.abs(Y-(parseInt(d/8)));
				if((diffX==1&&diffY==0)||(diffX==0&&diffY==1)||(diffX==1&&diffY==1))
					possible_moves.push([parseInt(d/8), d%8]);
			}
			break;
		case B_queen || W_queen:
			//Vertical Movement
			//Horizontal Movement
			//Diagonal Movement
			for(var d = 0; d < 64; d++)
			{
				if(player == 1 && (parseInt(grid[parseInt(d/8)][d%8]) > 16 && parseInt(grid[parseInt(d/8)][d%8]) <= 32)) continue;
				if(player == -1 && (parseInt(grid[parseInt(d/8)][d%8]) > 0 && parseInt(grid[parseInt(d/8)][d%8]) <= 16)) continue;

				var diffX = Math.abs(X-(d%8));
				var diffY = Math.abs(Y-(parseInt(d/8)));
				var Xsame = ((d%8)==X);
				var Ysame = ((parseInt(d/8))==Y);
				if((diffX==diffY)||(Xsame&&!Ysame)||(!Xsame&&Ysame))
					possible_moves.push([parseInt(d/8), d%8]);
			}
			break;
		default:
			return null;
	}

	return possible_moves;
}