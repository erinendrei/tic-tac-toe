const Gameboard = (function () {
  const gameboard = [];
  const playerMoves = { player_1: [], player_2: [] };
  const gridDivs = document.querySelectorAll(".square");
  let moveCount = 0;

  const checkArray = (array, currentPlayer) => {
    const winning = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (i = 0; i < winning.length; i++) {
      currentWinning = winning[i];
      if (
        array[currentWinning[0]] == currentPlayer.symbol &&
        array[currentWinning[1]] == currentPlayer.symbol &&
        array[currentWinning[2]] == currentPlayer.symbol
      ) {
        gameOver();
        showWonMessage(currentPlayer);
      } else if (moveCount === 9) {
        gameOver();
        showTieMessage();
      }
    }
  };

  const addMark = function (e) {
    let mark = Game.currentPlayer.symbol;
    gameboard[e.target.dataset.id] = mark;
    playerMoves[Game.currentPlayer.code][e.target.dataset.id] = mark;
    moveCount++;
    renderArray(gameboard);
    checkArray(playerMoves[Game.currentPlayer.code], Game.currentPlayer);
    Game.currentPlayer = Game.togglePlayer(Game.currentPlayer);
  };

  const addCellListeners = () => {
    gridDivs.forEach((div) => div.addEventListener("click", addMark));
  };

  addCellListeners();

  const renderArray = (array) => {
    gridDivs.forEach((div) => {
      div.textContent = array[div.dataset.id];
    });
  };

  const wonDiv = document.getElementById("won");

  const restartGame = () => {
    newGameButton.classList.add("inactive");
    wonDiv.classList.add("inactive");
    for (let i = 0; i < gameboard.length; i++) {
      playerMoves["player_1"][i] = "";
      playerMoves["player_2"][i] = "";
      gameboard[i] = "";
    }
    renderArray(gameboard);
    addCellListeners();
    Game.currentPlayer = Game.playerX;
    Game.resetDisplay();
    moveCount = 0;
  };

  const newGameButton = (btn = document.getElementById("new-game"));
  newGameButton.addEventListener("click", restartGame);

  const showNewGameButton = () => {
    newGameButton.classList.remove("inactive");
  };
  const showWonMessage = (player) => {
    wonDiv.textContent = `${player.name} won!`;
  };

  const showTieMessage = () => {
    wonDiv.textContent = `It's a tie.`;
  };

  const gameOver = () => {
    wonDiv.classList.remove("inactive");
    removeCellListeners();
    showNewGameButton();
  };

  const removeCellListeners = () => {
    gridDivs.forEach((div) => div.removeEventListener("click", addMark));
  };

  return { gameboard, gridDivs, addMark, renderArray, addCellListeners };
})();

const playerFactory = (name, symbol, code) => {
  const sayName = () => {
    console.log(name);
  };

  const setName = (newName) => {
    name = newName;
  };
  return { name, symbol, code, sayName, setName };
};

const Game = (function (gameBoard) {
  const playerX = playerFactory("Player 1", "X", "player_1");
  const playerO = playerFactory("Player 2", "O", "player_2");

  let currentPlayer = playerX;

  const togglePlayer = (player) => {
    if (player == playerX) {
      player = playerO;
    } else {
      player = playerX;
    }

    return player;
  };

  const resetDisplay = () => {
    const divs = document.querySelectorAll("[id$=value]");
    divs.forEach((div) => {
      div.classList.add("inactive");
    });
    const inputs = document.querySelectorAll("input");
    inputs.forEach((inp) => {
      inp.classList.remove("inactive");
      inp.value = "";
    });
  };

  const addKeyupListeners = (input, player, nameOrSymbol) => {
    input.addEventListener("keyup", function (event) {
      event.preventDefault();
      let div = document.getElementById(`${player.code}_${nameOrSymbol}_value`);
      if (event.code === "Enter") {
        div.textContent = input.value;
        div.classList.remove("inactive");
        input.classList.add("inactive");
        if (nameOrSymbol == "name") {
          player.name = input.value;
        } else if (nameOrSymbol == "symbol") {
          player.symbol = input.value;
        }
      }
    });
  };
  const addInputListeners = (player) => {
    let inputName = document.getElementById(`${player.code}_name`);
    let inputSymbol = document.getElementById(`${player.code}_symbol`);

    addKeyupListeners(inputName, player, "name");
    addKeyupListeners(inputSymbol, player, "symbol");
  };

  addInputListeners(playerX);
  addInputListeners(playerO);

  return { togglePlayer, resetDisplay, currentPlayer, playerX, playerO };
})(Gameboard);
