
// ALL GAME CODE

let cur_url = window.location.href
let cur_url_sub = cur_url.substring(0, cur_url.search('game.html'));
// const aspectRatio = 10/16;
const gameWidth = 720;
const gameHeight = 450;

kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    canvas: document.querySelector("#gameCanvas"),
    background: [ 150, 150, 150 ],
});

// sprite loading
loadRoot(cur_url_sub + "static/")

// images
loadSprite("cameraOverlay", "images/cameraOverlay.png")
loadSprite("cameraNoise", "images/cameraNoiseAnimated.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        static: {
            from: 0,
            to: 1,
            loop: true,
            speed: 4,
        }
    }
})
loadSprite("background", "images/background.png")


// audio



// SCENES, GAME LOOPS AND SPRITES

// LAYERS
const backgroundLayer = add([
    fixed(),
    z(20),
])

const spriteLayer = add([
    fixed(),
    z(50),
])

const uiLayer = add([
    fixed(),
    z(100),
])

// SPRITES
const cameraOverlay = uiLayer.add([
    sprite("cameraOverlay"),
    pos(0, 0),
    scale(0.764, 0.85)
])

const cameraNoise = add([
    sprite("cameraNoise", {anim: "static"}),
    opacity(0.25),
    pos(0, 0),
    scale(1, 1.05),
    z(80)
])

const background = backgroundLayer.add([
    sprite("background"),
    pos(0, 0),
    scale(0.3515, 0.297)
])