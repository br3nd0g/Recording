import k from "./kRun.js"
import "./sceneLoader.js"
import placeNewspaper from "./placeNewspaper.js"
import showMidRoundText from "./midRoundText.js"

function fadeToFullOpacity(obj) {

    return k.tween(obj.opacity, 1, 1, (p) => {
        obj.opacity = p;
    }, k.easings.easeInOutSine);
}

k.scene("midround", (correctArrests, incorrectArrests, round) => {

    placeNewspaper(incorrectArrests);

    let readBelow;

    k.wait(2, () => {
        readBelow = k.add([
            pos(k.center().x, 395),
            anchor("center"),
            text("Read further below", {
                size: 30,
                font: "cctv",
            }),
            color(k.Color.fromHex("#c42b4e")),
            opacity(0),
        ]);

        fadeToFullOpacity(readBelow);

        k.wait(1.4, () => {
            showMidRoundText(correctArrests, incorrectArrests, round)
        });
    });
  
})