const aspectRatio = 10/16;

const gameWidth = (document.getElementById("gameContainer").clientWidth / 100) * 70;
const gameHeight = gameWidth * aspectRatio;

kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    canvas: document.querySelector("#gameCanvas"),
    background: [ 150, 150, 150 ],
});

// sprite loading
loadRoot("https://github.com/br3nd0g/Recording/tree/main/static/")

// images
loadSprite("cameraOverlay", "images/cameraOverlay.png")


// audio