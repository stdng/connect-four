/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


const makeBoard = () => {

  for (let y = 0; y < HEIGHT; y++) {
    let row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */


const makeHtmlBoard = () => {

  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code

  //Create a TR element and set it to the variable top
  let top = document.createElement("tr");

  //give top an atribute of id = column-top
  top.setAttribute("id", "column-top");

  //give top a click event listener which when clicked will run handleClick
  top.addEventListener("click", handleClick);

  //loop through the x values, create a td element and set each td element with an 
  //ID of whatever number is x as it loops and then append it to the TR that we just made & then append to board
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //this is making the main board, setting up TR and TDs and giving each TD an ID of y and x values 
  //appending it to the board 
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }

  //creating my own restart button , tried to do e.preventdefault but didn't work!!!!!!!
  let restart = document.createElement('button');
  restart.classList.add('restartButton');
  restart.innerText = 'Restart';
  restart.addEventListener('click', function (e) {
    e.preventDefault();
    document.location.href = '';
  });

  htmlBoard.append(restart);

}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell

  let div = document.createElement('div');

  div.classList.add('piece');
  div.classList.add(`p${currPlayer}`);

  let spot = document.getElementById(`${y}-${x}`)
  spot.append(div);
}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  setTimeout(function () {
    alert(msg);
  }, 1000);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  //Don't really understand this line !!!!!!!!!!!!!!!! updating the value of [y][x] to = p1 or 2?
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    // top.removeEventListener('click', handleClick); didn't work in this spot !!!!
    return endGame(`Player ${currPlayer} won!`, y, x);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //Did not understand this line !!!!!!!!!!!!!!!!!!! don't understand double everys esp in es2015  
  if (board.every(row => row.every(cell => cell))) {
    // top.removeEventListener('click', handleClick); didn't work in this spot !!!!
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
      y >= 0 &&
      y < HEIGHT &&
      x >= 0 &&
      x < WIDTH &&
      board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //Loop through the row and columns and gather all the possible divs that you can win with 
  //when they are aligned 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]
      ];

      //if any of the variable runned with _win is true then there is a winner so return true 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }

  // top.removeEventListener('click', handleClick); didn't work in this spot !!!!!!!!!


}

makeBoard();
makeHtmlBoard();


//questions have !!!!!! also below: 

//tried to add a remove event listener to stop the clicking but the places i put it on didn't work. !!!!
//tried 3 diff spots ^
//no idea how the animation exactly works but it drops my pieces above the dashed circles 
//issue with left box being more wider than the rest 