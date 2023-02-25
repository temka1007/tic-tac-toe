const cells = document.querySelectorAll(".cell-container button");

const playerName = (() => {
  let firstPlayer;
  let secondPlayer;

  const firstPlayerDiv = document.querySelector(".first-player-name");
  const secondPlayerDiv = document.querySelector(".second-player-name");
  const playerNameSubmitBtn = document.querySelectorAll(
    ".first-player-name button, .second-player-name button"
  );
  const firstPlayerNameInputValue = document.querySelector(
    ".first-player-name input"
  );
  const secondPlayerNameInputValue = document.querySelector(
    ".second-player-name input"
  );

  playerNameSubmitBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.value === "first-player") {
        while (firstPlayerDiv.firstChild) {
          firstPlayerDiv.removeChild(firstPlayerDiv.firstChild);
        }
        firstPlayerDiv.textContent = firstPlayerNameInputValue.value;
        playerName.firstPlayer = firstPlayerNameInputValue.value;
      }
      if (btn.value === "second-player") {
        while (secondPlayerDiv.firstChild) {
          secondPlayerDiv.removeChild(secondPlayerDiv.firstChild);
        }
        secondPlayerDiv.textContent = secondPlayerNameInputValue.value;
        playerName.secondPlayer = secondPlayerNameInputValue.value;
      }
    });
  });
  return {
    firstPlayer,
    secondPlayer,
  };
})();

// eslint-disable-next-line no-unused-vars
const gameboard = (() => {
  function isUndefined() {
    if(playerName.firstPlayer === undefined){
      playerName.firstPlayer = "player 1"
    } 
    if(playerName.secondPlayer === undefined) {
      playerName.secondPlayer = "player 2"
    }
  }

  isUndefined()

  let playerXCells = [];
  let playerOCells = [];
  let player = "x";
  const winningCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  function disableBtn() {
    cells.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = true;
    });
  }
  function enableBtn() {
    cells.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = false;
    });
  }

  function checkX(element) {
    const cell = document.querySelector(`button[value='${element}'`);
    cell.textContent = "X";
  }
  function checkO(element) {
    const cell = document.querySelector(`button[value='${element}'`);
    cell.textContent = "O";
  }
  
  const announcerDiv = document.querySelector(".announcer");

  const draw = () => {
    if(playerXCells.length + playerOCells.length === 9) {
      announcerDiv.textContent = "Game is draw!";
    }
  }

  const announcer = (winner) => {
    if (winner === "x") {
      announcerDiv.textContent = `winner is ${playerName.firstPlayer}`;
    } else if (winner === "o") {
      announcerDiv.textContent = `winner is ${playerName.secondPlayer}`;
    }
  };

  const checkSubset = (parentArray, subsetArray) =>
    subsetArray.every((element) => parentArray.includes(element));

  const checkingEverySubsetX = () => {
    for (let i = 0; i < winningCondition.length; i += 1) {
      if (checkSubset(playerXCells, winningCondition[i])) {
        console.log("winner is x");
        announcer("x");
        disableBtn();
      } 
    }
  };
  const checkingEverySubsetO = () => {
    for (let i = 0; i < winningCondition.length; i += 1) {
      if (checkSubset(playerOCells, winningCondition[i])) {
        console.log("winner is o");
        announcer("o");
        disableBtn();
      }
    }
  };

  const playerTurn = (turn) => {
    if (player === "x") {
      player = "o";
      playerXCells.push(turn);
      announcerDiv.textContent = `${playerName.secondPlayer}'s turn!`;
      draw()
      checkX(turn);
      checkingEverySubsetX();
    } else if (player === "o") {
      player = "x";
      playerOCells.push(turn);
      announcerDiv.textContent = `${playerName.firstPlayer}'s turn!`;
      draw()
      checkO(turn);
      checkingEverySubsetO();
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      playerTurn(+e.target.value);
      // eslint-disable-next-line no-param-reassign
      cell.disabled = true;
      isUndefined()
    });
  });

  const playAgain = document.querySelector(".playAgain");

  playAgain.addEventListener("click", () => {
    playerXCells = [];
    playerOCells = [];
    player = "x";
    for (let i = 1; i < 10; i += 1) {
      const cell = document.querySelector(`button[value='${i}'`);
      cell.textContent = "";
    }
    enableBtn();
  });
})();

