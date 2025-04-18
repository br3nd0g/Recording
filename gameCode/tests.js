import k from "./kRun.js"

function placeLines(){

    const testLayer = k.add([
        fixed(),
        z(200),
    ])

    // bottom middle
    testLayer.add([
        pos(230, 325),
        anchor("topleft"),
        rect(270, 3, {fill: true}),
        color(k.RED),
    ])

    // left up
    testLayer.add([
        pos(230, 295),
        anchor("topleft"),
        rect(3, 30, {fill: true}),
        color(k.RED),
    ])

    // right up
    testLayer.add([
        pos(497, 295),
        anchor("topleft"),
        rect(3, 30, {fill: true}),
        color(k.RED),
    ])

    // right across
    testLayer.add([
        pos(497, 295),
        anchor("topleft"),
        rect(60, 3, {fill: true}),
        color(k.RED),
    ])

    // left across
    testLayer.add([
        pos(170, 295),
        anchor("topleft"),
        rect(60, 3, {fill: true}),
        color(k.RED),
    ])

    // right diagonal
    testLayer.add([
        pos(557, 296),
        anchor("left"),
        rect(170, 3, {fill: true}),
        color(k.RED),
        rotate(7)
    ])

    // left diagonal
    testLayer.add([
        pos(170, 296),
        anchor("right"),
        rect(170, 3, {fill: true}),
        color(k.RED),
        rotate(-6)
    ])

    // OR ALTERNATIVELY ONE SIMPLE LINE LOL!
    // y = 327 is the limit for walking

    testLayer.add([
        pos(0, 327),
        anchor("topleft"),
        rect(720, 1, {fill: true}),
        color(k.GREEN),
    ])

}

export default placeLines;