import k from "./kRun.js"

function placeNewspaper(incorrectArrests){

    let newspaper;

    if(incorrectArrests > 0){

        newspaper = k.add([
            pos(720/2, 450/2),
            sprite("news_extra"),
            rotate(30),
            anchor("center"),
            scale(0.9)
        ])

    }else{

        newspaper = k.add([
            pos(720/2, 450/2),
            sprite("news"),
            rotate(30),
            anchor("center"),
            scale(0.9)
        ])
    }

    k.tween(newspaper.scale, k.vec2(0.3), 1, ( p) => {
        newspaper.scale = p
    }, k.easings.easeInOutSine)

    k.tween(newspaper.angle, 0, 1, (p) => {
        newspaper.use(rotate(p))
    }, k.easings.easeInOutSine)

}

export default placeNewspaper