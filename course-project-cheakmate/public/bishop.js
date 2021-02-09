/*@Author: Richard*/
var board; /*2-D array keeping image sources for board*/
var moves; /*Keeps track of possible moves for a selected chess piece*/

var first = ""; /*Keeps track of first img to be moved*/
var second = ""; /*Keeps track of second img to be moved*/

function initialize(){
  /*Create a 10 x 10 board*/
  board = new Array(10);
  for(var i = 0; i < board.length; i++){
    board[i] = new Array(10);
  }

  /*Set up a 10 x 10 board*/

  /*Set up Rooks*/
  board[0][1] = "images/sprites/dob.png";
  board[0][8] = "images/sprites/lob.png";
  board[9][1] = "images/sprites/low.png";
  board[9][8] = "images/sprites/dow.png";

  /*Set up Knights*/
  board[0][2] = "images/sprites/lkb.png";
  board[0][7] = "images/sprites/dkb.png";
  board[9][2] = "images/sprites/dkw.png";
  board[9][7] = "images/sprites/lkw.png";

  /*Set up Bishops*/
  board[0][3] = "images/sprites/dhb.png";
  board[0][6] = "images/sprites/lhb.png";
  board[9][3] = "images/sprites/lhw.png";
  board[9][6] = "images/sprites/dhw.png";

  /*Set up Kings*/
  board[0][5] = "images/sprites/dgb.png";
  board[9][5] = "images/sprites/lgw.png";

  /*Set up Queens*/
  board[0][4] = "images/sprites/lqb.png";
  board[9][4] = "images/sprites/dqw.png";

  /*Set up Queens*/
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      if(i % 2 == 0 && j == 0 && board[i][j] == null){
        board[i][j] = "images/sprites/l.png";
      }
      else if (i % 2 == 1 && j == 0 && board[i][j] == null){
        board[i][j] = "images/sprites/d.png";
      }

      if(i % 2 == 0 && j == 9 && board[i][j] == null){
        board[i][j] = "images/sprites/d.png";
      }
      else if (i % 2 == 1 && j == 9 && board[i][j] == null){
        board[i][j] = "images/sprites/l.png";
      }

      if(i >= 2 && i <= 7){
        if(i % 2 == 0 && j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/l.png";
        }
        else if (i % 2 == 0 && j % 2 == 1 && board[i][j] == null) {
          board[i][j] = "images/sprites/d.png";
        }
        if(i % 2 == 1 && j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/d.png";
        }
        else if (i % 2 == 1 && j % 2 == 1 && board[i][j] == null) {
          board[i][j] = "images/sprites/l.png";
        }
      }

      /*Set up Pawns*/
      if (i == 1) {
          if(j % 2 == 0 && board[i][j] == null){
            board[i][j] = "images/sprites/dpb.png";
          }
          else if (j % 2 == 1 && board[i][j] == null){
            board[i][j] = "images/sprites/lpb.png";
          }
      }
      else if (i == 8) {
        if(j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/lpw.png";
        }
        else if (j % 2 == 1 && board[i][j] == null){
          board[i][j] = "images/sprites/dpw.png";
        }
      }
    }
  }

  /*Display board*/
  populate();
}

/*Reads the 2-D array and changes the image source accoring to its image id*/
function populate(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).src = board[i][j];
    }
  }
}

/*Exits the game and returns to main menu*/
function exit(){
  if (confirm("Are you sure you want to leave the game?")) {
    window.location.href = "index.html";
  }
}

function clearMoves(){
  first = "";
  second = "";
  moves = new Array();
}

/*Changes border color of image
  Happens when the image is selected
  Happens when possible moves are shown*/
function changeBorderColor(imageId, color){
  document.getElementById(imageId).style.border = "3px solid " + color;
}

/*Resets border color of all images
  Happens when the image selected is changed
  Happens when turn is over*/
function resetBorderColor(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).style.border = "3px solid black";
    }
  }
}

/*Each image onclick calls for the function to run game
  This works by
  Checking the type of chess piece
  Finding the possible moves of the chess piece
  Moving the chess piece*/
function runGame(imageId){
  resetBorderColor();
  var r = parseInt(imageId.substring(0,1));
  var c = parseInt(imageId.substring(1));

  if(!isEmptyTile(r, c)){
    changeBorderColor(imageId, "#33cccc");
  }

  if(first == ""){
    if(isPawn(r, c)){
      first = imageId;
      showPossiblePawnMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Rook here
      //If it is, show possible moves*/

    /* TODO:
    //Checks if it is a Knights here
      //If it is, show possible moves*/

    /* TODO:
    //Checks if it is a Bishops here
	  //If it is, show possible moves*/
	if(isBishop(r, c)){
		first = imageId;
		showPossibleBishopMoves(r,c);
	}

    /* TODO: DONE
    //Checks if it is a King here
	  //If it is, show possible moves*/

    /* TODO:
    //Checks if it is a Queen here
	  //If it is, show possible moves*/
	if(isQueen(r,c)){
		first = imageId;
		showPossibleQueenMoves(r,c);
	}
  }
  else if (isInMoves(imageId)){
    second = imageId;
    moveChessPiece(first, second);
    clearMoves();
  }
  else {
    first = "";
    runGame(imageId);
  }
}

function isEmptyTile(r, c){
  if(board[r][c].includes("l.png") || board[r][c].includes("d.png")){
    return true;
  }
  else {
    return false;
  }
}

function isPawn(r, c){
  if(board[r][c].includes("pb") || board[r][c].includes("pw")){
    return true;
  }
  else {
    return false;
  }
}

function isBishop(r, c){
	if(board[r][c].includes("hb") || board[r][c].includes("hw")){
		return true;
	}
	else{
		return false;
	}
}

function isQueen(r, c){
	if(board[r][c].includes("qb") || board[r][c].includes("qw")){
		return true;
	}
	else{
		return false;
	}
}


function isInMoves(imageId){
  for(var i = 0; i < moves.length; i++){
    if(moves[i] == imageId){
      return true;
    }
  }
  return false;
}

/*Conditions are made in order and according to the following rules
  Rule 1 : Pawns can only move forward one square at a time
  Rule 1.5 : Pawns can not move backwards
  Rule 2 : Pawns can move forward two squares for their very first move
  Rule 2.5 : There must be no chess pieces in between the two squares
  Rule 3 : Pawns can only capture one square diagonally in front of them*/
function showPossiblePawnMoves(r, c){
  var num;
  moves = new Array(4);
  for(var i = 0; i < moves.length; i++){
    moves[i] = "";
  }

  if(board[r][c].includes("pw")){
    if(r - 1 >= 0 && (board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
      num = "" + (r - 1) + c;
      changeBorderColor(num, "#33cccc");
      moves[0] = num;
    }
    if(r == 8 && (c >= 1 || c <= 8) ){
      if((board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
        if(r - 2 >= 0 && (board[r - 2][c].includes("l.png") || board[r - 2][c].includes("d.png"))){
          num = "" + (r - 2) + c;
          changeBorderColor(num, "#33cccc");
          moves[1] = num;
        }
      }
    }
    if(r - 1 >= 0 && c - 1 >= 0){
      num = "" + (r - 1) + (c - 1);
      if(!(board[r - 1][c - 1].includes("l.png")) && !(board[r - 1][c - 1].includes("d.png")) && !(board[r - 1][c - 1].includes("pw.png"))){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(r - 1 >= 0 && c + 1 <= 9){
      num = "" + (r - 1) + (c + 1);
      if(!(board[r - 1][c + 1].includes("l.png")) && !(board[r - 1][c + 1].includes("d.png")) && !(board[r - 1][c + 1].includes("pw.png"))){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
  }

  if(board[r][c].includes("pb")){
    if(r + 1 <= 9 && (board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
      num = "" + (r + 1) + c;
      changeBorderColor(num, "#33cccc");
      moves[0] = num;
    }
    if(r == 1 && (c >= 1 || c <= 8) ){
      if((board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
        if(r + 2 <= 9 && (board[r + 2][c].includes("l.png") || board[r + 2][c].includes("d.png"))){
          num = "" + (r + 2) + c;
          changeBorderColor(num, "#33cccc");
          moves[1] = num;
        }
      }
    }
    if(r + 1 <= 9 && c + 1 <= 9){
      num = "" + (r + 1) + (c + 1);
      if(!(board[r + 1][c + 1].includes("l.png")) && !(board[r + 1][c + 1].includes("d.png")) && !(board[r + 1][c + 1].includes("pb.png"))){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(r + 1 <= 9 && c - 1 >= 0){
      num = "" + (r + 1) + (c - 1);
      if(!(board[r + 1][c - 1].includes("l.png")) && !(board[r + 1][c - 1].includes("d.png")) && !(board[r + 1][c - 1].includes("pb.png"))){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
  }
}
/* Conditions for king's movement
	1. Kings can only move one space
	2. Kings can go in all 8 directions
	3. Kings can capture any opposite colored piece if in movement range
		***not implimented yet***
	4. Kings cannot move to a tile that causes a check
	5. Kings can do a castle with rook
	6. */
function showPossibleBishopMoves(r, c){
	var num;
	var rw = r;
	var cl = c;
	moves = new Array();
	if(board[r][c].includes("hw")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* up right movement */
		for(i=rw-1, j=cl+1; i>-1 && j<10; i--, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down left movement */
		for(i=rw+1, j=cl-1; i<10 && j>-1; i++, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down right movement */
		for(i=rw+1, j=cl+1; i>-1 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
  }
  if(board[r][c].includes("hb")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* up right movement */
		for(i=rw-1, j=cl+1; i>-1 && j<10; i--, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down left movement */
		for(i=rw+1, j=cl-1; i<10 && j>-1; i++, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down right movement */
		for(i=rw+1, j=cl+1; i>-1 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
	}
}



/*Moves selected chess piece to selected location*/
function moveChessPiece(first, second){
  var r1 = parseInt(first.substring(0,1));
  var c1 = parseInt(first.substring(1));
  src1 = board[r1][c1];

  var r2 = parseInt(second.substring(0,1));
  var c2 = parseInt(second.substring(1));
  src2 = board[r2][c2];

  board[r1][c1] = src1.substring(0, 16) + ".png";
  board[r2][c2] = src2.substring(0, 16) + src1.substring(16);

  populate();
}
