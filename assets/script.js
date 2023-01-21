var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 0;
var correct = 0; 
var questionCounter = 0; 
var score = 0; 
var timerInterval = ""; 


var quizQuestions = [{
  "question" : "Which of the following is not used to declare a variable in Javascript?", 
  "options" : {
    "A" : "int",
    "B" : "var",
    "C" : "const", 
    "D" : "let",
  },
  "answer" : "A", 
}, 
{ 
  "question" : "Which of the following is not a Javascript data type?",
  "options" : {
    "A" : "string",
    "B" : "let", 
    "C" : "object",
    "D" : "boolean",
  }, 
  "answer" : "B",
},
{ 
  "question" : "If conditions are place within _______",
  "options" : {
    "A" : "curly brackets { }",
    "B" : "quotes \" \"", 
    "C" : "brackets [ ]",
    "D" : "parentheses ( )",
  }, 
  "answer" : "D",
},
{ 
  "question" : "Arrays in Javascript store which of the following? ",
  "options" : {
    "A" : "booleans",
    "B" : "other arrays", 
    "C" : "strings",
    "D" : "all of the above",
  }, 
  "answer" : "D",
},
{ 
  "question" : "Which of the following is used in Javascript for comments inline? ",
  "options" : {
    "A" : "//",
    "B" : "#", 
    "C" : "***",
    "D" : "$",
  }, 
  "answer" : "A",
},
{ 
  "question" : "Which of the following functions is not used to interact with a user? ",
  "options" : {
    "A" : "prompt",
    "B" : "alert", 
    "C" : "interact",
    "D" : "confirm",
  }, 
  "answer" : "C",
},
{ 
  "question" : "Which of the following is not used for comparisions ? ",
  "options" : {
    "A" : "=",
    "B" : "!=", 
    "C" : ">",
    "D" : "<",
  }, 
  "answer" : "A",
},
]


function setTime() {
  secondsLeft = 60; 
  // Sets interval in variable 
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft ;
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      clearMain(); 
      createSaveCard(); 
      }
  }, 1000);
}

function createStartScreen() {
  clearMain(); 
  correct = 0; 
  timeEl.textContent = " ";
  var headerEl = document.createElement("div");
  headerEl.className = "card-header"; 
  var titleEl = document.createElement("h1")
  titleEl.textContent = "JavaScript Time Quiz"; 
  headerEl.appendChild(titleEl); 
  mainEl.appendChild(headerEl); 

  var bodyEl = document.createElement("div");
  bodyEl.className = "card-body"; 

  var descriptionEl = document.createElement("p");
  descriptionEl.textContent = "This is a timed quiz to help with understanding the fundamentals on JavaScript."; 
  bodyEl.appendChild(descriptionEl); 

  var startButtonEl = document.createElement("button"); 
  startButtonEl.setAttribute("type", "button");
  startButtonEl.className = "btn btn-primary"; 
  startButtonEl.textContent = "Start"; 
  startButtonEl.id = "start"; 
  bodyEl.appendChild(startButtonEl);
  mainEl.appendChild(bodyEl); 
}

function createQuestionCard(questionInfo, result) {
  clearMain(); 
  var questionEL = document.createElement("h1");
  questionEL.className = "card-title"; 
  questionEL.textContent = questionInfo["question"]
  let options = questionInfo["options"]; 
  for (let option in options) {
    var optionsEl = document.createElement("p"); 
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "radio")
    inputEl.setAttribute("name", "options")
    inputEl.className="btn-check"; 
    inputEl.id = option ;
    var labelEl = document.createElement("label"); 
    labelEl.className="btn btn-primary btn-lg w-50 p-3 text-start"; 
    labelEl.setAttribute("for", option); 
    labelEl.textContent = options[option]; 
   
    labelEl.setAttribute("onclick", "validateAnswer('"+option+"')");
    optionsEl.appendChild(inputEl);
    optionsEl.appendChild(labelEl);
    questionEL.append(optionsEl); 
  }
  mainEl.appendChild(questionEL); 
  if (result){
    footerEl = document.createElement("div");
    footerEl.className = "card-footer"; 
    footerEl.textContent = result; 
    mainEl.append(footerEl); 
  }
}

function createSaveCard(){ 
  clearMain(); 
  timeEl.textContent = " ";
  score = Math.round((correct/quizQuestions.length) * 100); 

  var headerEl = document.createElement("h1");
  headerEl.className = "card-title"; 
  headerEl.textContent = "Quiz is over!"; 
  mainEl.appendChild(headerEl); 

  var infoEl = document.createElement("p"); 
  infoEl.textContent = "Final Score " + score;
  mainEl.appendChild(infoEl); 

  var formEl = document.createElement("form");
  formEl.setAttribute("name", "submitScore"); 
  var labelEl = document.createElement("label");
  labelEl.setAttribute("for", "initials");
  labelEl.textContent="Enter initials: "
  formEl.appendChild(labelEl); 

  var inputEl = document.createElement("input"); 
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("maxlength", "2")
  inputEl.id = "initials"; 
  inputEl.setAttribute("name", "initials");
  formEl.appendChild(inputEl);
  
  var submitEl = document.createElement("input"); 
  submitEl.className ="btn btn-primary"; 
  submitEl.setAttribute("type", "button"); 
  submitEl.setAttribute("value", "submit"); 
  submitEl.setAttribute("onclick", "saveScore()" )
  formEl.appendChild(submitEl); 
  mainEl.appendChild(formEl);
}

function createHighscoresCard() {
  clearMain(); 
  timeEl.textContent = " ";
  var headerEl = document.createElement("h1");
  headerEl.className = "card-title"; 
  headerEl.textContent = "HighScores!"; 
  mainEl.appendChild(headerEl); 
  
  scoresArr = []; 
  for (var key in localStorage){
    let tempKeyArray = key.split('-');
    if (tempKeyArray[0] === 'score'){
      scoresArr.push([tempKeyArray[1], localStorage.getItem(key)]); 
    }
  }
  scoresArr.sort(
    (first, second) => { return second[1] - first[1] }
  );
  
  if (scoresArr.length !== 0){
    for (i = 0; i < scoresArr.length; i++){
      count = i + 1; 
      if ( i === 10 ){
        break
      }
      var scoreEl = document.createElement("p"); 
      scoreEl.textContent = count +'. '+scoresArr[i][0]+' '+scoresArr[i][1]; 
      mainEl.appendChild(scoreEl); 
    }
  } else {
    var noScoresEl = document.createElement("p");
    noScoresEl.textContent = "There is no scores recorded. Take the quiz to record your score."; 
    mainEl.appendChild(noScoresEl); 
  }
  var rowEl = document.createElement("div"); 
  rowEl.className = "row"; 

  var colEl = document.createElement("div");
  colEl.className = "col"; 
  var startScreenButtonEl = document.createElement("button"); 
  startScreenButtonEl.setAttribute("onclick", "main()"); 
  startScreenButtonEl.setAttribute("type", "button"); 
  startScreenButtonEl.className ="btn btn-primary"; 
  startScreenButtonEl.textContent="Start Screen"; 
  colEl.appendChild(startScreenButtonEl);
  rowEl.appendChild(colEl); 
  
  var spaceEl = document.createElement("div"); 
  spaceEl.className = "col"
  var clearScoresEl = document.createElement("button"); 
  clearScoresEl.setAttribute("onclick", "clearScores()"); 
  clearScoresEl.setAttribute("type", "button"); 
  clearScoresEl.className ="btn btn-primary"; 
  clearScoresEl.textContent="Reset Scores"; 
  spaceEl.appendChild(clearScoresEl); 
  rowEl.appendChild(spaceEl); 
  mainEl.appendChild(rowEl); 
}

function clearMain(){
  while (mainEl.lastElementChild) {
    mainEl.removeChild(mainEl.lastElementChild);
  }
}

function clearScores(){
  localStorage.clear(); 
  createHighscoresCard(); 
}
function saveScore (){
  formInput = document.forms["submitScore"]["initials"].value; 
  if (formInput){
  localStorage.setItem("score-"+formInput, score)
  createHighscoresCard()
  } else {
    alert("Need to submit Initials"); 
    createSaveCard(); 
  }
}

function validateAnswer(userAnswer){ 
  console.log(userAnswer); 
  var correctAnswer = quizQuestions[questionCounter]["answer"];
  if ( userAnswer === correctAnswer){
    correct++; 
    result = "Correct!"
  } else {
    result = "Wrong!"; 
  }
  questionCounter++; 
  if (questionCounter >= quizQuestions.length){
    clearInterval(timerInterval); 
    createSaveCard(); 
  } else {
  createQuestionCard(quizQuestions[questionCounter], result); 
  }
}

function main() {  
  createStartScreen(); 
  var startButton = document.getElementById("start");
  startButton.addEventListener("click", function() {
    setTime();
    correct = 0; 
    questionCounter = 0; 
    createQuestionCard(quizQuestions[questionCounter], null);   
  });
  var scoresButton = document.getElementById("scores");
  scoresButton.addEventListener("click", function(){
    clearInterval(timerInterval); 
    createHighscoresCard();
  }); 
  
}

main(); 





