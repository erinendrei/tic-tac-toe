const Gameboard = (function () {
    const gameboard = []
    const gridDivs = document.querySelectorAll(".square")

    const checkArray = (array, currentPlayer) => {

        const winning = [[0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 4, 8],
        [2, 4, 6], [0, 3, 6], [1, 4, 7],
        [2, 5, 8]]
        for (i = 0; i < winning.length; i++) {
            currentWinning = winning[i]
            if ((array[currentWinning[0]] == currentPlayer.symbol) && (array[currentWinning[1]] == currentPlayer.symbol) && (array[currentWinning[2]] == currentPlayer.symbol)) {
                gameIsWon(currentPlayer)
            }
        }
    }

    const addMark = function (e) {
        gameboard[e.target.dataset.id] = Game.currentPlayer.symbol
        renderArray(gameboard)
        checkArray(gameboard, Game.currentPlayer)
        Game.currentPlayer = Game.togglePlayer(Game.currentPlayer)
    }


    const addCellListeners = () => {
        gridDivs.forEach(div => div.addEventListener('click', addMark))
    }

    addCellListeners()

    const renderArray = (array) => {

        gridDivs.forEach(div => { div.textContent = array[div.dataset.id] })

    }

    const wonDiv = document.getElementById("won")

    const restartGame = () => {
        newGameButton.classList.add("inactive")
        wonDiv.classList.add("inactive")
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = ""
        }
        renderArray(gameboard)
        addCellListeners()
        Game.currentPlayer = Game.playerX
    }

    const newGameButton = btn = document.getElementById("new-game")
    newGameButton.addEventListener('click', restartGame)

    const showNewGameButton = () => {
        newGameButton.classList.remove("inactive")
    }
    const showWonMessage = (player) => {
        wonDiv.textContent = `${player.name} won!`
    }
    const gameIsWon = (player) => {
        showWonMessage(player)
        gridDivs.forEach(div => div.removeEventListener('click', addMark))
        showNewGameButton()
    }

    return { gameboard, gridDivs, addMark, renderArray, addCellListeners }
})()

const playerFactory = (name, symbol, code) => {
    const sayName = () => { console.log(name) }
    return { name, symbol, code, sayName }
}

const Game = (function (gameBoard) {

    const playerX = playerFactory('Player 1', 'X', 'player_1')
    const playerO = playerFactory('Player 2', 'O', 'player_2')

    let currentPlayer = playerX

    const togglePlayer = (player) => {
        if (player == playerX) {
            player = playerO
        }
        else { player = playerX }

        return player
    }

    const setPlayer = (player, name) => {
        player.name = name
    }

    const addPlayerInputListeners = (player) => {
        let playerCode = player.code
        let input = document.getElementById(`${playerCode}_name`)
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            let nameDiv = document.getElementById(`${playerCode}_name_value`)
            if (event.code === 'Enter') {
                nameDiv.textContent = input.value
                nameDiv.classList.remove('inactive');
                input.classList.add('inactive')
                setPlayer(player, input.value)
            }
        })

    }

    addPlayerInputListeners(playerX)
    addPlayerInputListeners(playerO)




    return { togglePlayer, currentPlayer, playerX, playerO }
})(Gameboard)



