const Gameboard = (function () {
    const gameboard = []


    return { gameboard }
})()

const playerFactory = (name, symbol) => {
    const sayName = () => { console.log(name) }
    return { name, symbol, sayName }
}

const Game = (function (gameBoard) {

    const playerX = playerFactory('Player 1', 'X')
    const playerO = playerFactory('Player 2', 'O')

    const togglePlayer = function (player) {
        if (player == playerX) {
            player = playerO
        }
        else { player = playerX }

        return player
    }

    let currentPlayer = playerX
    const gridDivs = document.querySelectorAll(".square")

    const checkArray = (array, currentPlayer) => {

        const winning = [[0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 4, 8],
        [2, 4, 6], [0, 3, 6],
        [2, 5, 8]]
        console.log(currentPlayer.symbol)
        for (i = 0; i < winning.length; i++) {
            currentWinning = winning[i]
            if ((gameBoard[currentWinning[0]] == currentPlayer.symbol) && (gameBoard[currentWinning[1]] == currentPlayer.symbol) && (gameBoard[currentWinning[2]] == currentPlayer.symbol)) {
                //gameIsWon(currentPlayer)
                const wonDiv = document.getElementById("won")
                wonDiv.textContent = `${currentPlayer.name} won!`
                console.log('Won')
            }
        }
    }

    const addMark = function (e) {
        gameBoard[e.target.dataset.id] = currentPlayer.symbol
        e.target.textContent = currentPlayer.symbol
        checkArray(gameBoard, currentPlayer)
        currentPlayer = togglePlayer(currentPlayer)
    }

    gridDivs.forEach(div => div.addEventListener('click', addMark))


    const renderArray = (array) => {

        gridDivs.forEach(div => { div.textContent = array[div.dataset.id] })

    }


    return { playerFactory, currentPlayer, playerX, playerO }
})(Gameboard)



