
var questions = 
[
    {
        question: " The function and var are known as : ",
        answer: "Declaration statements",
        options: 
        [
            "Data types",
            "Keywords",
            "Declaration statements",
            "Prototypes"
        ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        answer: "Ignores the statements",
        options:
         [
            "Ignores the statements",
            "Throws an error",
            "Prompts to complete the statement",
            "Shows a warning"
        ]
    },
    {
        question: "correct way for calling the JavaScript code?",
        answer: "Function/Method",
        options:
         [
            "Preprocessor",
            "Triggering Event",
            "RMI",
            "Function/Method"
        ]
    },
    {
        question: " In the JavaScript, which one of the following is not considered as an error:",
        answer: "Division by zero",
        options: 
        [
            "Syntax error",
            "Missing of semicolons",
            "Division by zero",
            "Missing of Bracket"
        ]
    },
    {
        question: " In JavaScript, what will be used for calling the function definition expression:",
        answer: "Function literal",
        options: 
        [
            "Function prototype",
            "Function calling",
            "Function literal",
            "Function declaration"
        ]
    },
    {
        question: " Which one of the following is an ternary operator:",
        answer: "?",
        options: 
        [
            "?",
            ":",
            "-",
            "+"
        ]
    },
]
questions_temp =
    {
        question: "",
        answer: "",
        options: []
    }

var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var qNum = 0
var answers = []
var minutes = 0
var seconds = 0
var formattedMinutes = 0
var formattedSeconds = 0
var interval = 0
var addingRec = false
var editingRec = false
var rVal = ''

function startQuiz()
{
    document.getElementById("mainBody").style.display = "flex"
    document.getElementById("startBtn").style.display = "none"    
    document.getElementById("adminBtn").style.display = "none"   

    appendQuestion()
    interval = setInterval(function()
    {
        if(seconds<59) seconds++
        else{
            seconds=0
            if(minutes<59) minutes++
            else{
                minutes=0
                clearInterval(interval)
            }
        }
        formattedSeconds = seconds<10 ? `0${seconds}` : seconds
        formattedMinutes = minutes<10 ? `0${minutes}` : minutes
        document.getElementById("timer").innerHTML = `${formattedMinutes}:${formattedSeconds}`
    }, 1000)
}
function appendQuestion()
{
    quizHeader.innerHTML = `<h3 class='quizHeader'>Q${qNum+1}/${questions.length}</h3><span id='timer'${minutes}:${seconds}</span>`
    var divBody = `<h3 class='quizHeader'>Q: ${questions[qNum].question}</h3>`
    divBody += "<ul class='option_group' id='option_group'>"
    for(var i=0; i<questions[qNum].options.length; i++)
        divBody += `<li class='option' onclick='activeOpt(this)'>${questions[qNum].options[i]}</li>`
    divBody += "</ul>"
    divBody += "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>"
    quizBody.innerHTML = divBody
}
function activeOpt(id)
{
    var ul = document.getElementById("option_group")
    for(var i=0; i<questions[qNum].options.length; i++)
    {
        if(ul.childNodes[i].className === 'active')
            ul.childNodes[i].classList.remove('active')
        ul.childNodes[i].className = 'option'
    }   
    id.className = 'active'
    if(id.innerHTML === questions[qNum].answer) answers[qNum] = true
    else answers[qNum] = false
}
function nxtQuestion(){
    if(!(typeof answers[qNum] === 'undefined'))
    {
        if(qNum < questions.length-1){
            qNum++
            appendQuestion()
        }
        else{
            qNum=0
            appendResult()
        }
    }
    else alert("please select an option")
}
function appendResult()
{
    var correctQuestions = 0 
    document.getElementById("exitBtn").style.display = "none"
    clearInterval(interval)
    quizHeader.innerHTML = "<h3>Result</h3>"
    quizHeader.style.justifyContent = "center"
    var divBody = "<Table class='table table-bordered'><thead class='thead-dark'>"
    for(var i=0; i<questions.length; i++) divBody += `<th>Q${i+1}</th>`
    divBody += "</thead><tbody>"
    for(var i=0; i<questions.length; i++)
    {
        if(answers[i])
        {
            divBody += "<td><img style='width:20px' src='Images/check.png'></td>"
            correctQuestions++
        }
        else divBody += "<td><img style='width:20px' src='Images/cancel.png'></td>"
    }
    divBody += "</tbody></table>"

    divBody += "<Table class='table table-bordered'><thead class='thead-dark'>"
    divBody += "<th>Points</th>"
    divBody += "<th>Percentage</th>"    
    divBody += "<th>Time Taken (mm:ss)</th>"
    divBody += "</thead></tbody>"
    divBody += `<td>${correctQuestions}/${questions.length}</td>`
    divBody += `<td>${(correctQuestions/questions.length)*100}%</td>`
    divBody += `<td>${formattedMinutes}:${formattedSeconds}</td>`
    divBody += "</tbody></table>"

    divBody += "<button class='btn btn-primary rstBtn' onclick='homePageReAttempt()'>Re-Attempt Quiz</button>"
    quizBody.innerHTML = divBody
}


function adminPanel()
{
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminBtn").style.display = "none"
    document.getElementById("mainPanel").style.display = "flex"
    appendAllQuestions()
}
function homePageReAttempt()
{
    
    var first = document.getElementById("quizHeader").firstChild
    first.remove()
    first = document.getElementById("quizBody").firstChild
    while(first)
    {
        first.remove()
        first = document.getElementById("quizBody").firstChild
    }
    clearInterval(interval)
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "block"
    document.getElementById("adminBtn").style.display = "block"
    document.getElementById("exitBtn").style.display = "block"
    document.getElementById("quizHeader").style.justifyContent = "space-between"
    answers = []
    qNum = 0
    seconds = 0
    minutes = 0
}
function homePage()
{
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "block"
    document.getElementById("adminBtn").style.display = "block"
    document.getElementById("mainPanel").style.display = "none"
    var questionsUl = document.getElementById("questionsUl")
    var first = questionsUl.firstElementChild
   
    while(first){
        first.remove()
        first = questionsUl.firstElementChild 
    }
}
function appendAllQuestions(){
    for(var j=0; j<questions.length; j++){
        var numOfOptions = questions[j].options.length
        var optionVals = []
        var questionVal = questions[j].question
        for(var i=0; i<numOfOptions; i++)
            optionVals[i] = questions[j].options[i]
        var answerVal = questions[j].answer

       

        
        var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px; margin-bottom: 10px'>"
        divBody += `<h3 class='quizHeader'>Q${j+1}:&nbsp${questionVal}</h3>`
        divBody += "<ul class='options_group' id='options_group'>"
        for(var i=0; i<numOfOptions; i++)
        {
            if(optionVals[i] === answerVal)
                divBody += `<li class='optionPanel active'>${optionVals[i]}</li>`
            else 
                divBody += `<li class='optionPanel'>${optionVals[i]}</li>`
        }

      
        divBody += "<li style='display:flex; justify-content: center;'>"
        divBody += '<button class="btn btn-success fa fa-pencil liBtn" onclick="editRec(this)"></button>'
        divBody += '<button class="btn btn-danger fa fa-trash liBtn" onclick="deleteRec(this)"></button></li>'
        divBody += "</ul></li>"

        document.getElementById("questionsUl").innerHTML += divBody
    }
}
function addQuestion()
{
    if(!addingRec){
        addingRec = true
      
        var htmlDesign = '<li class="panelLi" style="background-color: grey; border-radius: 30px; padding: 10px 30px">'
        htmlDesign += '<h3>Q:&nbsp</h3>'
        htmlDesign += '<input type="text" class="form-control w-75">'
        htmlDesign += '<ul style="width: 1000px">'
     
        for(var i=0; i<4; i++)
            htmlDesign += `<li style="display: flex;" class="panelLi"><h3>Option ${i+1}:&nbsp</h3><input class="form-control w-50"></li>`
        htmlDesign += '<li style="display: flex;"><h3>Answer:&nbsp</h3><input class="form-control w-50"></li>'
        htmlDesign += '<li style="display: flex; justify-content: center;">'
        htmlDesign += '<button class="btn btn-success liBtnAdd fa fa-check" onclick="addRec(this)"></button>'
        htmlDesign += '<button class="btn btn-danger liBtnCancel fa fa-times" onclick="discardRec(this)"></button>'
        htmlDesign += '</li>'
        htmlDesign += '</ul>'
        htmlDesign += '</li>'
        document.getElementById("questionsUl").innerHTML += htmlDesign
    }
}
function addRec(id)
{
    var questionVal = id.parentNode.parentNode.parentNode.childNodes[1].value
    var numOfOptions = 4
    var optionVals = []
    for(var i=0; i<numOfOptions; i++)
        optionVals[i] = id.parentNode.parentNode.childNodes[i].childNodes[1].value
    var answerVal = id.parentNode.previousSibling.childNodes[1].value
    
    
    if(!(questionVal === '') && !(answerVal === ''))
    {
        var enteredOptions = 0
    
        for(var i=0; i<optionVals.length; i++){
            if(!(optionVals[i] === '')) enteredOptions++
            if(enteredOptions == 2) break
        }
        if(enteredOptions !== 2) alert("Please enter atleast two options")
        else{
           
            enteredOptions = 0
            for(var i=0; i<optionVals.length; i++)
            {
                if(optionVals[i] === answerVal)
                {
                    enteredOptions = 1
                    break
                }
            }
            if(!enteredOptions) alert("Please enter one of the options in answer filed")
            else{
                addingRec = false 
                if(editingRec)
                {
                    editingRec = false
                    var qNumEditHtml = id.parentNode.parentNode.parentNode.firstChild.innerHTML

                    var qNumEdit = qNumEditHtml.substring(1, qNumEditHtml.indexOf(':')) 
                    var currentEditQuestion = questions[qNumEdit-1]

                    currentEditQuestion.question = questionVal
                    currentEditQuestion.answer = answerVal
                    for(var i=0; i<numOfOptions; i++)
                        currentEditQuestion.options[i] = optionVals[i]

                    var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px; margin-bottom: 10px'>"
                    divBody += `<h3 class='quizHeader'>Q${qNumEdit}:&nbsp${currentEditQuestion.question}</h3>`
                    divBody += "<ul class='options_group' id='options_group'>"
                    for(var i=0; i<currentEditQuestion.options.length; i++)
                    {
                        if(currentEditQuestion.options[i] === currentEditQuestion.answer)
                            divBody += `<li class='optionPanel active'>${currentEditQuestion.options[i]}</li>`
                        else 
                            divBody += `<li class='optionPanel'>${currentEditQuestion.options[i]}</li>`
                    }
                
                }
                else
                {
                    questions[questions.length] = questions_temp
                    let currentQuestion = questions[questions.length-1]
                    currentQuestion.question = questionVal
                    currentQuestion.answer = answerVal
                    for(var i=0; i<numOfOptions; i++)
                        currentQuestion.options[i] = optionVals[i]
                    var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px; margin-bottom: 10px'>"
                    divBody += `<h3 class='quizHeader'>Q${questions.length}:&nbsp${currentQuestion.question}</h3>`
                    divBody += "<ul class='options_group' id='options_group'>"
                    for(var i=0; i<currentQuestion.options.length; i++)
                    {
                        if(currentQuestion.options[i] === currentQuestion.answer)
                            divBody += `<li class='optionPanel active'>${currentQuestion.options[i]}</li>`
                        else 
                            divBody += `<li class='optionPanel'>${currentQuestion.options[i]}</li>`
                    }
                }
               
                divBody += "<li style='display:flex; justify-content: center;'>"
                divBody += '<button class="btn btn-success fa fa-pencil liBtn" onclick="editRec(this)"></button>'
                divBody += '<button class="btn btn-danger fa fa-trash liBtn" onclick="deleteRec(this)"></button></li>'
                divBody += "</ul></li>"
                var p = document.createElement('p')
                p.innerHTML += divBody
                document.getElementById("questionsUl").insertBefore(p.firstChild, id.parentNode.parentNode.parentNode.nextSibling)
                id.parentNode.parentNode.parentNode.remove()
            }
        }
    }
}
function editRec(id)
{
    if(!addingRec)
    {
        addingRec = true
        editingRec = true
        let numOfOtions = id.parentNode.parentNode.childNodes.length - 1
        let optionVals = []
        let answerVal = ''
        let questionValHtml = id.parentNode.parentNode.parentNode.childNodes[0].innerHTML
      
        let questionVal = questionValHtml.substring(questionValHtml.indexOf(';') + 1, questionValHtml.length)
        let editQNum = questionValHtml.substring(1,2)
        for(var i=0; i< numOfOtions; i++)
        {
            optionVals[i] = id.parentNode.parentNode.childNodes[i].innerHTML
        if(id.parentNode.parentNode.childNodes[i].className.indexOf('active') !== -1)
            answerVal = optionVals[i]
        }
        
        rVal = id.parentNode.parentNode.parentNode.parentNode.childNodes[editQNum]

       
        
        var htmlDesign = '<li class="panelLi" style="background-color: grey; border-radius: 30px; padding: 10px 30px">'
        htmlDesign += `<h3>Q${editQNum}:&nbsp</h3>`
        htmlDesign += `<input type="text" value="${questionVal}" class="form-control w-75">`
        htmlDesign += '<ul style="width: 1000px">'
    
        for(var i=0; i<4; i++)
            htmlDesign += `<li style="display: flex;" class="panelLi"><h3>Option ${i+1}:&nbsp</h3><input class="form-control w-50" value="${optionVals[i]}"></li>`
        htmlDesign += `<li style="display: flex;"><h3>Answer:&nbsp</h3><input class="form-control w-50" value="${answerVal}"></li>`
        htmlDesign += '<li style="display: flex; justify-content: center;">'
        htmlDesign += '<button class="btn btn-success liBtnAdd fa fa-check" onclick="addRec(this)"></button>'
        htmlDesign += '<button class="btn btn-danger liBtnCancel fa fa-times" onclick="cancelUpdateRec(this)"></button>'
        htmlDesign += '</li>'
        htmlDesign += '</ul>'
        htmlDesign += '</li>'
    
        var p = document.createElement('p')
        p.innerHTML += htmlDesign
        document.getElementById("questionsUl").insertBefore(p.firstChild, id.parentNode.parentNode.parentNode.nextSibling)
    }
    else "A record adding is already in progress"
}
function deleteRec(id)
{
    var deleteQNumHtml = id.parentNode.parentNode.parentNode.firstChild.innerHTML
    var deleteQNum = deleteQNumHtml.substring(1, deleteQNumHtml.indexOf(':'))
    var questionsUl = document.getElementById("questionsUl")
    questions.splice(deleteQNum-1, 1)
    var first = questionsUl.firstElementChild

    while(first)
    {
        first.remove()
        first = questionsUl.firstElementChild 
    }
    appendAllQuestions()
}
function dellAll()
{
    addingRec = false
    var questionsUl = document.getElementById("questionsUl")
    var first = questionsUl.firstElementChild
    while(first)
    {
        first.remove();
        first = questionsUl.firstElementChild
    }
    questions.splice(0, questions.length)
}
function cancelUpdateRec(id)
{
    addingRec = false
    editingRec = false
    document.getElementById("questionsUl").insertBefore(rVal, id.parentNode.parentNode.parentNode.nextSibling)
    id.parentNode.parentNode.parentNode.remove()
}
function discardRec(id)
{
    addingRec = false
    id.parentNode.parentNode.parentNode.remove()
}