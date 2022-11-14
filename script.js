const Gameboard = (function () {
    const gameboard = []
    return gameboard
})()

const playerFactory = (name) => {
    const sayName = () => { console.log(name) }
    return { name, sayName }
}