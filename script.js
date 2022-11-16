const Gameboard = (function () {
    const gameboard = ['x']

    return { gameboard }
})()
const Game = (function (gameBoard) {
    let isPlayerX = true

    const gridDivs = document.querySelectorAll(".square")

    const playerFactory = (name, symbol) => {
        const sayName = () => { console.log(name) }
        return { name, symbol, sayName }
    }

    const renderArray = (array) => {

        gridDivs.forEach(div => { div.textContent = array[div.dataset.id] })

    }

    const addMark = function (e) {
        Gameboard[e.target.dataset.id] = getPlayerSymbol(isPlayerX)
        renderArray(gameBoard)
        togglePlayer(isPlayerX)

    }


    const getPlayerSymbol = function (bool) {
        if (bool == true) {
            return 'X'
        }
        else { return 'O' }
    }

    const togglePlayer = function (bool) {
        if (isPlayerX) {
            isPlayerX = false
        }
        else { isPlayerX = true }
    }
    gridDivs.forEach(div => div.addEventListener('click', addMark))


    return {}
})(Gameboard)







playerO = playerFactory('me', 'X')
playerX = playerFactory('you', 'O')

