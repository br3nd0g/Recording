import k from "./kRun.js"     
import {resourceLoader, getColourCombos} from "./resourceLoad.js";


function chooseWanted(people){
    // randomly choose 1 or 2 wanted colour orders
    // return list of wanted colours

    const numWanted = Math.random() < 0.5 ? 1 : 2;
    const wantedPeople = [];

    for (let i = 0; i < numWanted; i++) {
        const randomIndex = Math.floor(Math.random() * people.length);
        wantedPeople.push(people[randomIndex]);
        people.splice(randomIndex, 1); 
    }

    return wantedPeople;
}

function choosePeopleColours(roundNum){
    // dependent on round num  people ( 50 - (roundNum * 10) )

    const possibleColours = getColourCombos()

    const numPeople = (50 - (roundNum * 10))

    let peopleColours = [];

    for(let i = 0; i < numPeople; i++){
        const randomIndex = Math.floor(Math.random() * possibleColours.length)
        const colour = possibleColours[randomIndex].join("_")

        peopleColours.push(colour);
    };


    return peopleColours;
}

function spawnPeople(){
}

function movePeople(){
    // choose a movable point and move them there, scaling size if y goes lower
}

function arrestPerson(){
    // highlight person with flashing red box and remove them from game

    
}

function showWantedPosters(uiLayer, wantedColours){
    // show wanted posters on screen

    const wantedText = uiLayer.add([
        text("WANTED", {size: 30, font: "cctv"}),
        pos(90, 10),
        color(k.Color.fromHex("#c42b4e")),
        anchor("topleft"),
        outline(2, k.BLACK)
    ])

    let offsetSpace = 75;

    for(let i = 0; i < wantedColours.length; i++){

        let offset = offsetSpace * i;

        uiLayer.add([
            sprite(`${wantedColours[i]}_wanted`),
            pos(90 + offset, 50),
            scale(0.7),
            anchor("topleft"),
            z(10)
        ])

        uiLayer.add([
            pos(90 + offset, 50),
            anchor("topleft"),
            rect(64, 128, {fill: true, radius: 5}),
            color(k.Color.fromHex("#c3c9d4")),
            outline(2, k.BLACK),
            scale(0.7),
        ])

    }

}

export {chooseWanted, choosePeopleColours, spawnPeople, movePeople, arrestPerson, showWantedPosters}