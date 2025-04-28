import k from "./kRun.js"     

function createTimer(uiLayer, time){

    const timer = uiLayer.add([
        pos(415, 44),
        text("Time Left:" + Math.trunc(time), {
            size: 28,
            font: "cctv",
        }),
        color(k.Color.fromHex("#c42b4e")),
        layer("ui"),
    ])

    return timer
}

function updateTimer(timer, time){

    timer.use(text("Time Left:" + Math.trunc(time), {
        size: 28,
        font: "cctv",
    }));

}

function reduceTime(curTime){

    curTime -= k.dt()

    if(curTime <= 0){
        curTime = 0
    }

    return curTime
}

function fadeToBlack(correctArrests, incorrectArrests, round){

    const black = k.add([
        pos(0, 0),
        rect(720, 450),
        color(k.BLACK),
        anchor("topleft"),
        z(1000),
        opacity(0),
    ])
    
    k.tween(black.opacity, 1, 1, (p) => {
        black.opacity = p;
    }).then(() => {
        if(round == 4){
            let cur_url = window.location.href
            let cur_url_sub = cur_url.substring(0, cur_url.search('game.html'));

            window.location.href = cur_url_sub + 'end.html';
        }else{
            k.go("midround", correctArrests, incorrectArrests, round) // change to midround scene
        }
    })

}

export {reduceTime, fadeToBlack, createTimer, updateTimer}