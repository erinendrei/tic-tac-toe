const Gameboard = (function () {
    const gameboard = ['x', 'x', 'x', 'o', 'x', 'o', 'o', 'o', 'x']
    return gameboard
})()

const playerFactory = (name) => {
    const sayName = () => { console.log(name) }
    return { name, sayName }
}

const renderArray = (array) => {
    const gridDivs = document.querySelectorAll(".square")
    gridDivs.forEach(div => { div.textContent = array[div.dataset.id] })

}

renderArray(Gameboard)