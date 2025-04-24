import k from "./kRun.js"
import "./sceneLoader.js"

k.scene("start", () => {
    
    const startButton = k.add([
        text("PLAY GAME", {size: 60, font: "cctv"}),
        pos(720/2,450/2),
        color(k.Color.fromHex("#c42b4e")),
        area(),
        anchor("center")
    ])

    const camera = k.add([
        pos(530, 0),
        anchor("topright"),
        sprite("cctvcamera", {flipX: true}),
        anchor("topleft"),
        scale(0.24)
    ])
  
    startButton.onHover(() => {
        startButton.use(color(k.Color.fromHex("#9c1131")));

    });

    startButton.onHoverEnd(() => {
        startButton.use(color(k.Color.fromHex("#c42b4e")));
    });

    startButton.onClick(
    () => {
        go("game")  
    }) 
  
})