import k from "./kRun.js"
import {chooseWanted, choosePeopleColours, spawnPeople, movePeople, arrestPerson, showWantedPosters, checkPersonHover, clickPerson, addOutlineToPerson} from "./people.js"
import "./sceneLoader.js"
import {reduceTime, fadeToBlack, createTimer, updateTimer} from "./gameTimer.js"
import placeLines from "./tests.js"
import showRound from "./roundText.js"

k.scene("game", (round) => {

    // variables
    if(round == null){ round = 1; }
    let peopleColours;
    let hoveredPerson;
    let focusOutline;
    let timeLeft = 26; // seconds
    let fading = false;
    let timer;
    let canClick = true;
    let arrestedPeople = 0;
    let correctArrests = 0;
    let incorrectArrests = 0;

    if(round == 4){
        timeLeft = 8.5;
    }
    
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

    // timer
    timer = createTimer(uiLayer, timeLeft);

    // show round
    const roundText = showRound(uiLayer, round);

    // people logic
    peopleColours = choosePeopleColours(round);

    // adding people
    let [peopleObjects, wantedPeople] = spawnPeople(peopleColours, spriteLayer);
    const wantedColours = wantedPeople.map(person => person.sprite);
    showWantedPosters(uiLayer, wantedPeople);

    // moving people
    const peopleMoveDuration = 4;
    k.loop(peopleMoveDuration + 0.3, () => {
        movePeople(peopleObjects, peopleMoveDuration);
    });
  
    k.onUpdate(() => {

        if(!fading && canClick){

            if(focusOutline != null){
                k.destroy(focusOutline);
            }
    
            hoveredPerson = checkPersonHover(peopleObjects, k.mousePos());
    
            if(hoveredPerson != null){
                focusOutline = addOutlineToPerson(hoveredPerson, spriteLayer);
            }
        }

        timeLeft = reduceTime(timeLeft);

        updateTimer(timer, timeLeft);

        if(timeLeft <= 0){

            fading = true;
            fadeToBlack(correctArrests, incorrectArrests, round);
        }
    });

    k.onClick(() => {
        if(hoveredPerson != null){
            canClick = false;

            arrestedPeople++;

            clickPerson(hoveredPerson, focusOutline, peopleObjects, wantedPeople, canClick)
            .then((returnedValues)=>{

                peopleObjects = returnedValues[0];
                if(returnedValues[1]){
                    correctArrests++;
                }else{
                    incorrectArrests++;
                }
                canClick = true;
            });
        };
    });

})