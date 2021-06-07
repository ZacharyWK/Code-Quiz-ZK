const sb = document.querySelector("#startBtn");
const lab = document.querySelector("#inputLable");
const tex = document.querySelector("#inputText");
const ans = document.querySelector("#answers");
const tim = document.querySelector("#time");
const form = document.querySelector("#form");
const que = document.querySelector("#question");
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const sco = document.querySelector("#score");
const pla = document.querySelector("#place");

let scoreLIST = JSON.parse(localStorage.getItem("LIST")) || [];
let savedNAME = null;
let savedPOINTS = null;
let points = 0;



let timer = tim.value;
let i = 0;

// QUESTIONS
const questions = [
    {
    question:"Question 1? answer is Yes.",
    right: "a",
    answers:{a:"yes",b:"no",c:"maybe"}
    },
    {
    question:"Question 2? answer is 2.",
    right: "b",
    answers:{a:"1",b:"2",c:"3" }
    },
    {
    question:"Question 3? answer is Best.",
    right: "c",
    answers:{a:"worst",b:"okayst",c:"best",}
    },
    {question:"END",
    answers:{a:"",b:"",c:"",}
    }
];
// Start
function startBtn() {

    event.stopPropagation

    console.log('start');

    sb.classList.add("hid");
    sb.classList.remove("vis");

    lab.classList.add("vis");
    lab.classList.remove("hid");
    
    tex.classList.add("vis");
    tex.classList.remove("hid");


};
// NAME
function enterName() 
{
    console.log(`Quiz Start`);

    lab.classList.add("hid");
    lab.classList.remove("vis");
    
    tex.classList.add("hid");
    tex.classList.remove("vis");
    
    que.classList.add("vis");
    que.classList.remove("hid");
    
    ans.classList.add("vis");   
    ans.classList.remove("hid");
    
    tim.classList.remove("hid");
    tim.classList.add("vis");
    
    loadIn();
    startTimer();
};

// NEXT
function next() {
    i++;
    loadIn();
    if (i === 3) {end()};
}

function loadIn() {
    que.innerHTML = questions[i].question;
    a.innerHTML = questions[i].answers.a;
    b.innerHTML = questions[i].answers.b;
    c.innerHTML = questions[i].answers.c;   
};

// END
function end() {
    clearInterval(tim.value);
    EndPoints(); 
    score();

    que.classList.add("hid");
    que.classList.remove("vis");
    
    ans.classList.add("hid");   
    ans.classList.remove("vis");
    
    tim.classList.add("hid");
    tim.classList.remove("vis");

    sco.classList.remove("hid");
    sco.classList.add("vis");

    pla.classList.add("vis");
    
    // tim.textContent = 0;
}


// TIMER
function startTimer() {
    tim.value = setInterval(function() {
        if (tim.textContent == 0){
            // clearInterval(tim.value), 
            end()}
        else {tim.textContent--;}
        }, 1000)
    
}

// ANSWERS
function wrong() {
    console.log("wrong answer");
    console.log(tim.textContent);

    tim.textContent = parseInt(tim.textContent, 10)-20;
    console.log(tim.textContent);

    next();
}

//BUTTONS
a.onclick = function(e) {
    if (questions[i].right == "a"){points+=25, next()}
    else {wrong()};
};
b.onclick = function(e) {
    if (questions[i].right == "b"){points+=25, next()}
    else {wrong()};
};
c.onclick = function(e) {
    if (questions[i].right == "c"){points+=25, next()}
    else {wrong()};
};

// SCORE
function score() {
   console.log("SCORE")
    let endScore = localStorage.getItem("NAME") +" scored "+ localStorage.getItem("POINTS") +" "+ "Points";
    scoreLIST.push(endScore)
    localStorage.setItem("LIST", JSON.stringify(scoreLIST));
    // scoreLIST = JSON.parse(localStorage.getItem("LIST")) ;   
    pla.textContent = JSON.stringify(scoreLIST);
};

function EndPoints() {
    let timeScore = 0;
    if (tim.textContent > 0){timeScore+=25}
    let Epoints = (points+=timeScore);
    console.log(Epoints);
    savedPOINTS = localStorage.setItem("POINTS", JSON.stringify(Epoints));
    console.log(savedPOINTS);  
};



// SUBMIT NAME
form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(tex.value);
    name = tex.value;
    savedNAME = localStorage.setItem("NAME", name);
    enterName();
})