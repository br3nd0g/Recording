import k from "./kRun.js"     

function showRound(uiLayer, round){

    const roundText = uiLayer.add([
        pos(500, 10),
        text("Round:" + round, {
            size: 28,
            font: "cctv",
        }),
        color(k.Color.fromHex("#c42b4e")),
        layer("ui"),
    ])

    return roundText
}

export default showRound