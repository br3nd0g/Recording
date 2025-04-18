import k from "./kRun.js"     
import {resourceLoader, getColourCombos} from "./resourceLoad.js";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function chooseWanted(people){
    // randomly choose  2 wanted colour orders
    // return list of wanted colours

    const numWanted = 2
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

function spawnPeople(people, spriteLayer){

    // spawn people in random locations on the screen

    const spawnedPeople = [];

    for(let i = 0; i < people.length; i++){

        const colour = people[i]

        const person = spriteLayer.add([
            sprite(colour, {anim: "walk"}),
            pos(Math.random() * 720, Math.random() * (468 - 345) + 345),
            anchor("bot"),
            area()
        ])

        // person.frame = Math.floor(Math.random() * 3.99)

        spawnedPeople.push(person);
    }

    return spawnedPeople;
}

function movePerson(person, moveDuration){

    const moveRange = 180;

    let targetX = clamp(
        Math.random() * (person.pos.x + moveRange - (person.pos.x - moveRange)) + (person.pos.x - moveRange),
        0,
        720
    );

    if(targetX === 0){
        targetX += Math.random() * 50;
    }else if(targetX === 720){
        targetX -= Math.random() * 50;
    }


    const targetY = Math.random() * (468 - 345) + 345;

    // console.log(person.pos)
    k.tween(person.pos, k.vec2(targetX, targetY), moveDuration, (p) => {
        if(p.x > person.pos.x){
            person.flipX = true;
        }else{
            person.flipX = false;
        }
        person.pos = p;
        person.use(z(person.pos.y / 1000));

        person.scale = 0.8 + (p.y - 345) / 200;
    })

    // if (person.pos.y > 345) {
    //     person.scale = 1 + (person.pos.y - 345) / 200;
    // }
}

function movePeople(people, moveDuration){
    // choose a movable point and move them there, scaling size if y goes lower

    for (let i = 0; i < people.length; i++) {

        const person = people[i];
        movePerson(person, moveDuration);
    }
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