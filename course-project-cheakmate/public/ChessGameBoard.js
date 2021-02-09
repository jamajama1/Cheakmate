var board;
function start() {
	board = [
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null]
			];
	populate();
}
function populate() {
	var alternate = true;
	for (i = 0; i < board.length; i++) {
		/*alternate is true for even false for odd rows*/
		if (i % 2 == 0) {
			alternate = true;
		} else {
			alternate = false;
		}
		for(j = 0; j < board[i].length; j++) {
			id = "" + i + j;
			square = document.getElementById(id);
			/*Image decider*/
			if (board[i][j] == null) {
			/*starting pieces get priority placing*/
			/*starting for black*/
				if (i == 0 && j == 1) {
					square.innerHTML = '<img src = "images/sprites/dob.png">';
				} else if (i == 0 && j == 2) {
					square.innerHTML = '<img src = "images/sprites/lkb.png">';
				} else if (i == 0 && j == 3) {
					square.innerHTML = '<img src = "images/sprites/dhb.png">';
				} else if (i == 0 && j == 4) {
					square.innerHTML = '<img src = "images/sprites/lqb.png">';
				} else if (i == 0 && j == 5) {
					square.innerHTML = '<img src = "images/sprites/dgb.png">';
				} else if (i == 0 && j == 6) {
					square.innerHTML = '<img src = "images/sprites/lhb.png">';
				} else if (i == 0 && j == 7) {
					square.innerHTML = '<img src = "images/sprites/dkb.png">';
				} else if (i == 0 && j == 8) {
					square.innerHTML = '<img src = "images/sprites/lob.png">';
				} else if (i == 1 && j % 2 == 0  && j != 0 && j != 9) {
					square.innerHTML = '<img src = "images/sprites/dpb.png">';
				} else if (i == 1 && j % 2 == 1  && j != 0 && j != 9) {
					square.innerHTML = '<img src = "images/sprites/lpb.png">';
				}
				/*starting for white*/
				else if (i == 9 && j == 1) {
					square.innerHTML = '<img src = "images/sprites/low.png">';
				} else if (i == 9 && j == 2) {
					square.innerHTML = '<img src = "images/sprites/dkw.png">';
				} else if (i == 9 && j == 3) {
					square.innerHTML = '<img src = "images/sprites/lhw.png">';
				} else if (i == 9 && j == 4) {
					square.innerHTML = '<img src = "images/sprites/dqw.png">';
				} else if (i == 9 && j == 5) {
					square.innerHTML = '<img src = "images/sprites/lgw.png">';
				} else if (i == 9 && j == 6) {
					square.innerHTML = '<img src = "images/sprites/dhw.png">';
				} else if (i == 9 && j == 7) {
					square.innerHTML = '<img src = "images/sprites/lkw.png">';
				} else if (i == 9 && j == 8) {
					square.innerHTML = '<img src = "images/sprites/dow.png">';
				} else if (i == 8 && j % 2 == 0 && j != 0 && j != 9) {
					square.innerHTML = '<img src = "images/sprites/lpw.png">';
				} else if (i == 8 && j % 2 == 1 && j != 0 && j != 9) {
					square.innerHTML = '<img src = "images/sprites/dpw.png">';
				}
				/*end of starting pieces*/
				// populating tiles
				else if ((i * 10 + j) % 2 == 0 && alternate) {
					square.innerHTML  = '<img src = "images/sprites/l.png">';
				} else if ((i * 10 + j) % 2 == 0 && !alternate) {
					square.innerHTML  = '<img src = "images/sprites/d.png">';
				} else if (alternate) {
					square.innerHTML  = '<img src = "images/sprites/d.png">';
				} else {
					square.innerHTML  = '<img src = "images/sprites/l.png">';
				}
			}
		}
	}
} //end of populate function

//chess pieces with their id's on the board with their correct array index locations
// White and Black Rooks
console.log(board[0][1] = "dob");
console.log(board[9][8] = "dow");
console.log(board[0][8] = "lob");
console.log(board[9][1] = "low");

// White and Black Knights
console.log(board[9][2] = "dkw");
console.log(board[0][7] = "dkb");
console.log(board[9][7] = "lkw");
console.log(board[0][2] = "lkb");

//White and Black Bishops
console.log(board[0][3] = "dhb");
console.log(board[9][6] = "dhw");
console.log(board[0][6] = "lhb");
console.log(board[9][3] = "lhw");

//White and Black Queens
console.log(board[9][4] = "dqw");
console.log(board[0][4] = "lqb");

//White and Black Kings
console.log(board[0][5] = "dgb");
console.log(board[9][5] = "lgw");

//White and Black Pawns
console.log(board[1][1] = "dpw");
console.log(board[1][2] = "dpb");
console.log(board[1][3] = "dpw");
console.log(board[1][4] = "dpb");
console.log(board[1][5] = "dpw");
console.log(board[1][6] = "dpb");
console.log(board[1][7] = "dpw");
console.log(board[1][8] = "dpb");
console.log(board[8][1] = "lpb");
console.log(board[8][2] = "lpw");
console.log(board[8][3] = "lpb");
console.log(board[8][4] = "lpw");
console.log(board[8][5] = "lpb");
console.log(board[8][6] = "lpw");
console.log(board[8][7] = "lpb");
console.log(board[8][8] = "lpw");