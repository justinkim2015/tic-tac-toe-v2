// Gameboard module
const gameBoard = (() => {
  const values = new Array(9).fill('')
  
  const setCell = (index, value) => {
    values[index] = value
  };

  const getBoard = () => {
    return values
  };

  return {setCell, getBoard}
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
  let boxList = document.querySelectorAll('.box');

  const updateArray = (index, element, piece) => {
    if(element.textContent == '') {
      gameBoard.setCell(index, piece) 
      display.update(gameBoard.getBoard())
    };
  };

  // const removeListener = (node, callback) => {
  //   node.removeEventListener('click', callback )
  // }

  // const addListeners = (nodes, piece) => {
  //   for (let i = 0; i < nodes.length; i++) {
  //     let callback = () => {updateArray(nodes[i], piece)}
  //     nodes[i].addEventListener('click', callback )
  //     nodes[i].addEventListener('click', () => {removeListener(nodes[i], callback)} )
  //   };
  // };

  const removeListeners = (nodes, callbacks) => {
    nodes.forEach( (element, index) => {element.removeEventListener('click', callbacks[index])})
    addListeners(boxList, 'O')
  }

  const addListeners = (nodes, piece) => {
    let callbacks = []

    for (let i = 0; i < nodes.length; i++) {
      callbacks.push(() => {updateArray(i, nodes[i], piece)})
      nodes[i].addEventListener('click', callbacks[i] )
      // nodes[i].addEventListener('click', () => {removeListeners(nodes, callbacks)} )
    };
  };

  const playGame = (player1, player2) => {
    addListeners(boxList, player1.piece)
  };

  return { playGame }
})();

// Player factory
const makePlayer = ((name, piece) => {
  return { name, piece }
});

const playerOne = makePlayer('justin', 'X')
const playerTwo = makePlayer('maya', 'O')  

display.update(gameBoard.getBoard())

logic.playGame(playerOne, playerTwo)
