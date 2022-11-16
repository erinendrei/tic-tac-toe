const Gameboard = (function () {
    const gameboard = []

    return { gameboard }
})()

const Game = (function (gameBoard) {
    const gridDivs = document.querySelectorAll(".square")

    const playerFactory = (name, symbol) => {
        const sayName = () => { console.log(name) }
        return { name, symbol, sayName }
    }

    const renderArray = (array) => {

        gridDivs.forEach(div => { div.textContent = array[div.dataset.id] })

    }

    const addMark = function (e) {
        gameBoard[e.target.dataset.id] = currentPlayer.symbol
        renderArray(gameBoard)
        currentPlayer = togglePlayer(currentPlayer)
    }

    gridDivs.forEach(div => div.addEventListener('click', addMark))

    const playerX = playerFactory('name', 'X')
    const playerO = playerFactory('name', 'O')

    const togglePlayer = function (player) {
        if (player == playerX) {
            player = playerO
        }
        else { player = playerX }

        return player
    }

    let currentPlayer = playerX


    return { playerFactory, currentPlayer, playerX, playerO }
})(Gameboard)



