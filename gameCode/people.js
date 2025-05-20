import k from "./kRun.js"     
import {resourceLoader, getColourCombos} from "./resourceLoad.js";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function chooseWanted(people){
    // randomly choose  2 wanted colour orders
    // return list of wanted colours
    // NOT IN USE

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

    let numPeople
    let firstTwo = [];
    
    numPeople = (50 - (roundNum * 10));
    if(roundNum != 1){
        numPeople = (50 - (roundNum * 15));
    }

    let peopleColours = [];

    for (let i = 0; i < numPeople; i++) {
        let colour;
        let isDuplicate;

        do {
            const randomIndex = Math.floor(Math.random() * possibleColours.length);
            colour = possibleColours[randomIndex].join("_");
            isDuplicate = i >= 2 && firstTwo.includes(colour);
        } while (isDuplicate);

        if (i < 2) {
            firstTwo.push(colour);
        }

        peopleColours.push(colour);
    }

    return peopleColours;
}

function spawnPeople(people, spriteLayer){

    // spawn people in random locations on the screen

    const spawnedPeople = [];
    const wantedPeople = [];
    const numWanted = 2;
    let wantedFulfilled = 0;

    for(let i = 0; i < people.length; i++){

        const colour = people[i]
        let person;

        if(wantedFulfilled < numWanted){
            wantedPeople.push(colour);
            wantedFulfilled++;

            person = spriteLayer.add([
                sprite(colour, {anim: "walk"}),
                pos(Math.random() * 720, Math.random() * (468 - 345) + 345),
                anchor("bot"),
                area(),
                "wanted",
                "person"
            ])

        }else{
            person = spriteLayer.add([
                sprite(colour, {anim: "walk"}),
                pos(Math.random() * 720, Math.random() * (468 - 345) + 345),
                anchor("bot"),
                area(),
                "person"
            ])
        }

        // person.frame = Math.floor(Math.random() * 3.99)

        spawnedPeople.push(person);
    }

    return [spawnedPeople, wantedPeople];
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


    const targetY = Math.random() * (480 - 345) + 345;

    // console.log(person.pos)
    k.tween(person.pos, k.vec2(targetX, targetY), moveDuration, (p) => {
        if(p.x > person.pos.x){
            person.flipX = true;
        }else{
            person.flipX = false;
        }
        person.pos = p;
        person.use(z(person.pos.y / 1000));

        person.scale = 0.7 + (p.y - 345) / 140;
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
            scale(0.8),
            anchor("topleft"),
            z(10)
        ])

        uiLayer.add([
            pos(90 + offset, 50),
            anchor("topleft"),
            rect(64, 128, {fill: true, radius: 5}),
            color(k.Color.fromHex("#c3c9d4")),
            outline(2, k.BLACK),
            scale(0.8),
        ])

    }

}

function checkPersonHover(people, mousePos){

    let hoverOnFrame = false;
    let newHover;


    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        
        if((person.pos.x - 32) < mousePos.x && (person.pos.x + 32) > mousePos.x && person.pos.y > mousePos.y && (person.pos.y - 128) < mousePos.y){

            hoverOnFrame = true;
            
            if(newHover != null){
                if(newHover.pos.z > person.pos.z){
                
                    newHover = person;
                }
            }
            else{
                newHover = person;
            }

            
        }
    }

    if(!hoverOnFrame){
        return null
    }

    return newHover;
}

function addOutlineToPerson(person, layer){
    // add outline to person when hovering over them

    const personOutline = layer.add([
        pos(person.pos.x, person.pos.y - 10),
        anchor("bot"),
        rect(64, 128, { fill: false, radius: 2}),
        color(k.RED),
        outline(3, k.RED),
        scale(person.scale - 0.2),
        z(person.z),
    ])

    return personOutline;
}

function clickPerson(person, outline, peopleArray, wantedPeopleList, clickBool) {
    return new Promise(function (resolve, reject) {
  
        let correctArrest = false;
      
        if(wantedPeopleList.includes(person.sprite)){
        
            correctArrest = true;
        }

        arrestPerson(person, outline)
        .then(() => {

            // remove from people array
            const index = peopleArray.indexOf(person);
            if (index > -1) {
                peopleArray.splice(index, 1);
            }

            resolve([peopleArray, correctArrest])
        })

    });
};

function arrestPerson(person, outline){
    // highlight person with flashing red box and remove them from game
    return new Promise(function (resolve, reject) {

        outline.use(rect(64, 128, {fill: true, radius: 2}));
        outline.use(color(k.Color.fromHex("#c3c9d4")));
  
        k.tween(0, 4, 1.2, (p) => {

            let opacityToUse;

            if(p >= 1 && p < 2){

                opacityToUse = 1 - (p - 1);

            }else if(p >= 2 && p < 3){

                opacityToUse = p - 2;

            }else if(p >= 3 && p < 4){

                opacityToUse = 1 - (p - 3);
            }

            outline.opacity = opacityToUse;

            outline.use(pos(person.pos.x, person.pos.y - 10));
            outline.use(scale(person.scale - 0.2));
            outline.use(z(person.z - 0.001));

        }).then(() => {
            outline.destroy();
            person.destroy();
            resolve();
        })

    });
    
}

export {chooseWanted, choosePeopleColours, spawnPeople, movePeople, arrestPerson, showWantedPosters, checkPersonHover, clickPerson, addOutlineToPerson}