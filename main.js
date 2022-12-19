// Player factory
const makePlayer = ((name, piece) => {  
  return { name, piece }
});

// Gameboard module
const gameBoard = (() => {
  let values = new Array(9).fill('')
  
  const setCell = (index, value) => {
    values[index] = value
  };

  const getBoard = () => {
    return values
  };

  const reset = (player1, player2) => {
    nodes = document.querySelectorAll('.box')
    values = new Array(9).fill('')
    display.update(getBoard())
    logic.addListeners(nodes, player1, player2)
    document.querySelector('#new-game').classList.toggle('hidden')
    document.querySelector('#reset').classList.toggle('hidden')
  }

  const resetButton = () => {
    values = new Array(9).fill('')
    display.update(getBoard())
  }

  return {setCell, getBoard, reset, resetButton}
})();


// Game logic
const logic = (() => {
  let boxList = document.querySelectorAll('.box');
  let turn = 'X'
  let turnCount = 0
  let playerOne = makePlayer('Player1', 'X')
  let playerTwo = makePlayer('Player2', 'O')  

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

  const winnerCheck = (player1, player2) => {
    let board = gameBoard.getBoard()
    let name 

    winConditions.forEach(winState => {
      if(board[winState[0]] == board[winState[1]] && board[winState[1]] == board[winState[2]] && board[winState[1]] != ''){

        if(playerOne.piece == board[winState[0]]) {
          name = playerOne.name
        } else {
          name = playerTwo.name
        }

        alert(name + ' is the winner!')
        removeListeners()
        resetTurnCount()
        document.querySelector('#new-game').classList.toggle('hidden')
        document.querySelector('#reset').classList.toggle('hidden')
      }
    })
  };

  const resetTurnCount = () => {
    turnCount = 0
  }

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

  const removeListeners = () => {
    let oldItems = document.querySelectorAll('.box')
    let newItems = []
    oldItems.forEach(item => {newItems.push(item.cloneNode(true))})

    newItems.forEach((item, index) => {oldItems[index].parentNode.replaceChild(item, oldItems[index])})
  };

  const addListeners = (nodes, player1, player2) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', () => takeTurn(i, nodes[i], playerOne, playerTwo) )
    };

    document.querySelector('#reset').addEventListener('click', () => gameBoard.resetButton())
    document.querySelector('#new-game').addEventListener('click', () => gameBoard.reset(nodes, playerOne, playerTwo))
  };

  const isTie = () => {
    if(turnCount == 9){ alert('Its a tie') }
  }

  const takeTurn = (index, node, player1, player2) => {
    updateNode(index, node)
    winnerCheck(playerOne, playerTwo)
    isTie()
    changeTurn()
    turnCount++
  };

  const setName = (number, name) => {
    if(number == 1) {
      playerOne.name = name
    } else {
      playerTwo.name = name
    }
  }

  const getName = (number) => {
    if(number == 1) {
      return playerOne.name
    } else {
      return playerTwo.name
    }
  }
  const playGame = (player1, player2) => {
    addListeners(boxList, playerOne, playerTwo)
  };

  return { playGame, addListeners, removeListeners, setName, getName }
})();

// display module
const display = (() => {
  const update = (board) => {
    board.forEach((node, index) => {
      box = document.querySelector(`#box${index}`)
      box.textContent = node
    });
  };

  const modal = () => {
    let modal = document.querySelector('.modal')
    let close = document.querySelector('#name-submit')
    close.addEventListener('click', (event) => {closeModal(event, modal)})
  }

  const closeModal = (event, modal) => {
    modal.style.display = "none"
    event.preventDefault();
    logic.setName(1, document.getElementById('playerone').value)
    logic.setName(2, document.getElementById('playertwo').value)
  };

  return { update, modal }
})();



display.modal()

display.update(gameBoard.getBoard())

logic.playGame()
