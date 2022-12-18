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
    board.forEach((node, index) => {
      box = document.querySelector(`#box${index}`)
      box.textContent = node
    });
  };

  return { update }
})();

// Game logic
const logic = (() => {
  let boxList = document.querySelectorAll('.box');
  let turn = 'X'
  let turnCount = 0

  const winConditions = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const winnerCheck = () => {
    board = gameBoard.getBoard()
    winConditions.forEach(winState => {
      if(board[winState[0]] == 'X' && board[winState[1]] == 'X' && board[winState[2]] == 'X'){
        alert('winner')
      }
    })
  };

  const changeTurn = () => {
    if(turn == 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    };
  };

  const updateNode = (index, node) => {
    if(node.textContent == '') {
      gameBoard.setCell(index, turn) 
      display.update(gameBoard.getBoard())
    };
  };

  const addListeners = (nodes, piece) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', () => takeTurn(i, nodes[i]) )
    };
  };

  const isTie = () => {
    if(turnCount == 9){ alert('Its a tie') }
  }

  const takeTurn = (index, node) => {
    updateNode(index, node)
    changeTurn()
    turnCount++
    isTie()
    winnerCheck()
  };

  const playGame = (player1, player2) => {
    addListeners(boxList, turn)
  };

  return { playGame }
})();

// Player factory
const makePlayer = ((name, piece) => {
  return { name, piece }
});

const playerOne = makePlayer('justin', 'X')
const playerTwo = makePlayer('maya', 'O')  
let current_player = playerOne

display.update(gameBoard.getBoard())

logic.playGame(playerOne, playerTwo)
