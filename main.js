// Gameboard module
const gameBoard = (() => {
  let array = ['','','',
               '','','',
               '','',''];
                  
  return {array}
})();

// display module
const display = (() => {
  const update = (board) => {
    board.forEach((element, index) => {
      box = document.querySelector(`#box${index}`)
      box.textContent = element
    });
  };

  return { update }
})();

// Game logic
const logic = (() => {
  const change = (element, piece) => {
    if(element.textContent == '') {
      element.textContent = piece
    }
  };

  const placePiece = (piece) => {
    boxList = document.querySelectorAll('.box');

    for (let i = 0; i < boxList.length; i++) {
      boxList[i].addEventListener('click', change.bind(this, boxList[i], piece))
    };
  };

  return { placePiece }
})();



// Player factory
const makePlayer = ((name, piece) => {
  return { name, piece }
});



function taketurn() {
  const justin = makePlayer('justin', 'X')
  const maya = makePlayer('maya', 'O')  

  display.update(gameBoard.array)
  logic.placePiece(maya.piece)
}

taketurn()