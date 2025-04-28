import k from "./kRun.js"
import "./sceneLoader.js"

let numRound;

function generateNames(roundNum){

    let numPeople;

    numPeople = (50 - (roundNum * 10));
    if(roundNum != 1){
        numPeople = (50 - (roundNum * 15));
    }

    const first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle", "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen", "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma", "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Frank", "Debra", "Alexander", "Rachel", "Raymond", "Catherine", "Patrick", "Carolyn", "Jack", "Janet", "Dennis", "Ruth", "Jerry", "Maria", "Tyler", "Heather", "Aaron", "Diane", "Jose", "Virginia", "Adam", "Julie", "Nathan", "Joyce", "Henry", "Victoria", "Douglas", "Olivia", "Zachary", "Kelly", "Peter", "Christina", "Kyle", "Lauren", "Walter", "Joan", "Ethan", "Evelyn", "Jeremy", "Judith", "Harold", "Megan", "Keith", "Cheryl", "Christian", "Andrea", "Roger", "Hannah", "Noah", "Martha", "Gerald", "Jacqueline", "Carl", "Frances", "Terry", "Gloria", "Sean", "Ann", "Austin", "Teresa", "Arthur", "Sara", "Lawrence", "Janice", "Jesse", "Jean", "Dylan", "Alice", "Bryan", "Madison", "Joe", "Doris", "Jordan", "Abigail", "Billy", "Julia", "Bruce", "Judy", "Albert", "Grace", "Willie", "Denise", "Gabriel", "Amber", "Logan", "Marilyn", "Alan", "Beverly", "Juan", "Danielle", "Wayne", "Theresa", "Roy", "Sophia", "Ralph", "Marie", "Randy", "Diana", "Eugene", "Brittany", "Vincent", "Natalie", "Russell", "Isabella", "Elijah", "Charlotte", "Louis", "Rose", "Bobby", "Alexis", "Philip", "Kayla", "Johnny", "Lillian"];

    const last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham", "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson", "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens", "Harrison", "Fernandez", "McDonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen", "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter", "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Mason", "Dixon", "Muñoz", "Hunt", "Hicks", "Holmes", "Palmer", "Wagner", "Black", "Robertson", "Boyd", "Rose", "Stone", "Salazar", "Fox", "Warren", "Mills", "Meyer", "Rice", "Schmidt", "Garza", "Daniels", "Ferguson", "Nichols", "Stephens", "Soto", "Weaver", "Ryan", "Gardner"];

    const names = Array.from({ length: numPeople }, () => {
        const firstName = first_names[Math.floor(Math.random() * first_names.length)];
        const lastName = last_names[Math.floor(Math.random() * last_names.length)];
        return `${firstName} ${lastName}`;
    });

    return names;
}

function generateInteractions(names){

    const interactions = [];
    const usedNames = new Set();

    let namesCopy = [...names];

    if (namesCopy.length % 2 !== 0) {
        const randomIndex = Math.floor(Math.random() * namesCopy.length);
        namesCopy.splice(randomIndex, 1);
    }

    while (usedNames.size < namesCopy.length) {
        const name1 = namesCopy[Math.floor(Math.random() * namesCopy.length)];
        const name2 = namesCopy[Math.floor(Math.random() * namesCopy.length)];

        if (name1 !== name2 && !usedNames.has(name1) && !usedNames.has(name2)) {
            interactions.push(`${name1} + ${name2}`);
            usedNames.add(name1);
            usedNames.add(name2);
        }
    }

    return interactions;
}

function arrestMetrics(corrArrests, incorrArrests){

    document.getElementById("suspects").innerText = `Suspects arrested: ${corrArrests}/2`;
    document.getElementById("false").innerText = `Innocents arrested: ${incorrArrests}`;

    document.getElementById("arrestText").style.display = "flex";
}

function people_and_interactions(roundNum){

    const names = generateNames(roundNum);
    const interactions = generateInteractions(names);

    const identityListUl = document.getElementById("identityListUl")
    const interactionListUl = document.getElementById("interactionListUl")

    names.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        identityListUl.appendChild(li);
    });

    interactions.forEach(interaction => {
        const li = document.createElement("li");
        li.textContent = interaction;
        interactionListUl.appendChild(li);
    });

    document.getElementById("records").style.display = "flex";
}

function continueOption(roundNum){
    
    document.getElementById("decision").style.display = "flex";

    document.getElementById("yes").addEventListener("click", newRound);
    document.getElementById("no").addEventListener("click", endGame);

}

function endGame(){
    document.getElementById("no").removeEventListener("click", endGame);

    let cur_url = window.location.href
    let cur_url_sub = cur_url.substring(0, cur_url.search('game.html'));

    window.location.href = cur_url_sub + 'end.html';
}

function newRound(){
    document.getElementById("yes").removeEventListener("click", newRound);
    hideEverythingAndGo();
}

function hideEverythingAndGo(){

    document.getElementById("records").style.display = "none";
    document.getElementById("arrestText").style.display = "none";
    document.getElementById("identityListUl").innerHTML = "";
    document.getElementById("interactionListUl").innerHTML = "";
    document.getElementById("decision").style.display = "none";

    const lineBreaks = document.querySelectorAll(".lineBreak");
    lineBreaks.forEach(lineBreak => {
        lineBreak.style.display = "none";
    });

    k.go("game", numRound + 1);
}

function showLineBreaks(){
    const lineBreaks = document.querySelectorAll(".lineBreak");
    lineBreaks.forEach(lineBreak => {
        lineBreak.style.display = "inline-block";
    });
}

function showMidRoundText(corrArrests, incorrArrests, roundNum){

    numRound = roundNum;
    arrestMetrics(corrArrests, incorrArrests);
    people_and_interactions(roundNum);
    continueOption(roundNum);
    showLineBreaks();

}

export default showMidRoundText;