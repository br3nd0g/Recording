const gameWidth = 720;
const gameHeight = 450;

const k = kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    canvas: document.querySelector("#gameCanvas"),
    background: [ 150, 150, 150 ],
});

export default k;