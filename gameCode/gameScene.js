import k from "./kRun.js"
import {chooseWanted, choosePeopleColours, spawnPeople, movePeople, arrestPerson, showWantedPosters} from "./people.js"
import "./sceneLoader.js"

k.scene("game", (round) => {

    // variables
    if(round == null){ round = 1; }
    let wantedPeople;
    let peopleColours
    
    // layers
    const spriteLayer = add([
        // fixed(),
        z(50),
    ])
    
    const uiLayer = add([
        fixed(),
        z(100),
    ])
    
    // background
    const cameraNoise = add([
        sprite("cameraNoise", {anim: "static"}),
        opacity(0.25),
        pos(0, 0),
        scale(1, 1.05),
        z(80)
    ])
    
    const background = add([
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
    wantedPeople = chooseWanted(peopleColours);

    showWantedPosters(uiLayer, wantedPeople);


    // adding people


  
    onUpdate(() => {

    })
  
})