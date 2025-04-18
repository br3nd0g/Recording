import k from "./kRun.js"
import {chooseWanted, choosePeopleColours, spawnPeople, movePeople, arrestPerson, showWantedPosters} from "./people.js"
import "./sceneLoader.js"
import placeLines from "./tests.js"

k.scene("game", (round) => {

    // variables
    if(round == null){ round = 1; }
    let peopleColours
    
    // layers
    const spriteLayer = k.add([
        // fixed(),
        z(50),
    ])
    
    const uiLayer = k.add([
        fixed(),
        z(100),
    ])
    
    // background
    const cameraNoise = k.add([
        sprite("cameraNoise", {anim: "static"}),
        opacity(0.25),
        pos(0, 0),
        scale(1, 1.05),
        z(80)
    ])
    
    const background = k.add([
        sprite("background"),
        pos(0, 0),
        scale(0.3515, 0.297),
        z(20)
    ])

    // UI
    const cameraOverlay = uiLayer.add([
        sprite("cameraOverlay"),
        pos(0, 0),
        scale(0.764, 0.85),
    ])

    // people logic
    peopleColours = choosePeopleColours(round);

    // adding people
    const [peopleObjects, wantedPeople] = spawnPeople(peopleColours, spriteLayer);
    showWantedPosters(uiLayer, wantedPeople);

    // moving people
    const peopleMoveDuration = 4;
    k.loop(peopleMoveDuration + 0.3, () => {
        movePeople(peopleObjects, peopleMoveDuration);
    })

    k.onHover("person", () => {
        console.log(k.mousePos())
    })
  
    k.onUpdate(() => {

    })
  
})