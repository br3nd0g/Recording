import k from "./kRun.js";

let cur_url = window.location.href
let cur_url_sub = cur_url.substring(0, cur_url.search('game.html'));

function getColourCombos(){
    const colours = ["red", "green", "blue"]

    let combos = [];

    for (let i of colours) {
        for (let j of colours) {
            for (let k of colours) {
                combos.push([i, j, k]);
            }
        }
    }

    return combos
}

function loadPeople(){

    let combos = getColourCombos();

    for (let colours of combos) {

        const colourName = colours.join("_");

        k.loadSprite(colourName, `images/gen_people/${colourName}.png`, {
            sliceX: 2,
            sliceY: 2,
            anims: {
                walk: {
                    from: 0,
                    to: 3,
                    loop: true,
                    speed: 2,
                }
            }
        })
    }
}

function loadPeopleForward(){

    let combos = getColourCombos();

    for (let colours of combos) {

        const colourName = colours.join("_");

        k.loadSprite(`${colourName}_wanted`, `images/gen_wanted/${colourName}.png`)
    }
}

const resourceLoader = () => {

    // setting load root
    k.loadRoot(cur_url_sub + "static/")

    // loading sprites
    k.loadSprite("cameraOverlay", "images/cameraOverlay.png")
    k.loadSprite("background", "images/background.png")

    k.loadSprite("cameraNoise", "images/cameraNoiseAnimated.png", {
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

    loadPeople();
    loadPeopleForward();

    // FONTS
    k.loadFont("cctv", "./static/fonts/cctv.ttf")

}

export {resourceLoader, getColourCombos};