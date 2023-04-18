let exam;
//Questions
let Questions;

let timeInterval;

let time;
let finalAnswers = {
  examName: "",
  examID: "",
  answers: [],
};
const examName = document.querySelector(".exam-title");
async function fetchData() {
  try {
    const response = await fetch("https://bayoumymath.com/api/quiz2/22");

    if (!response.ok) {
      throw new Error(
        "Some thing wrong happened while retrieving the exam details, please refresh the page and try again!"
      );
    }

    exam = await response.json();

    Questions = JSON.parse(
      localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Questions"))
    ) || [...exam.choosequestions, ...exam.essayquestions];

    time =
      parseInt(
        JSON.parse(
          localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Time"))
        )
      ) || parseInt(exam.quiz.duration * 60);

    console.log(exam);
    InitQuiz();
    showPopupQuestions();
    timeInterval = setInterval("timer()", 1000);
    finalAnswers.examName = exam.quiz.name;
    finalAnswers.examID = exam.quiz.id;
    examName.innerHTML = exam.quiz.name;
  } catch (error) {
    console.error("Error:", error);
    /*
    alert(
      "Some thing wrong happened while retrieving the exam details, please refresh the page and try again!"
    );*/
  }
}
document.addEventListener("DOMContentLoaded", fetchData());
//Exam Details

//timer

function timer() {
  let minutes = parseInt(time / 60);
  let seconds = parseInt(time % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.querySelector(".timer").innerHTML = +minutes + ":" + seconds;
  if (time <= 0) {
    handleSubmit();
  } else {
    time--;
    localStorage.setItem(JSON.stringify(exam.quiz.name + " " + "Time"), time);
  }
  //console.log("seconds");
}

const hideTimerBtn = document.querySelector(".hide-timer");
const showTimerBtn = document.querySelector(".show-timer");

//hide timer logic
function hideTimer() {
  clearInterval(timeInterval);
  document.querySelector(".timer").innerHTML = "";
  console.log("clicked");
  hideTimerBtn.classList.toggle("disable-timer");
  showTimerBtn.classList.toggle("disable-timer");
}

hideTimerBtn.addEventListener("click", hideTimer);

//show timer logic
function showTimer() {
  timeInterval = setInterval("timer()", 1000);
  hideTimerBtn.classList.toggle("disable-timer");
  showTimerBtn.classList.toggle("disable-timer");
}

showTimerBtn.addEventListener("click", showTimer);

//submit button logic
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
  //perform an automatic submission then clear the local storage and the interval as a result of successful submission (.then())
  let confirm;
  let Questions = JSON.parse(
    localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Questions"))
  );
  if (Questions) {
    Questions.forEach((question) => {
      let selected;
      if (question.answers) {
        selected = question.answers.filter((answer) => answer.selected);
        let QuestionID = question.id;
        if (selected.length !== 0) {
          finalAnswers.answers.push({ [QuestionID]: selected[0].order });
        }
      } else if (question.answer && question.answer !== "") {
        let QuestionID = "essay " + question.id;
        finalAnswers.answers.push({ [QuestionID]: question.answer });
      }
    });
  } else {
    confirm = window.confirm(
      "You haven't answered any question yet, Do you really want to submit?"
    );

    console.log("You haven't answered any question");
  }
  if (finalAnswers.answers.length > 0 || confirm) {
    try {
      let response = fetch("https://example.com/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      })
        .then((res) => res.json())
        .then((data) => {
          // Do some stuff ...
        });
      if (!response.ok) {
        throw new Error("Submit process failed, please try again!");
      }
    } catch (error) {
      alert(error);
    }
  }
  console.log(finalAnswers);

  //console.log(Questions);

  //localStorage.clear(JSON.stringify(exam.quiz.name + " " + "Questions"));
  //localStorage.clear(JSON.stringify(exam.quiz.name + " " + "Time"));
  //clearInterval(timeInterval);
}

//Variables ---------------------------------------
let currentQuestionIndex = 0;

//selectors ---------------------------------------

//dot-menu
const dotBtn = document.querySelector(".menu-wrapper button");
const dotMenu = document.querySelector(".dot-menu");

//hover-text
const crossBtn = document.querySelector(".cross-button");
const hoverText = document.querySelector(".hover-text");

//show / hide fixed div questions
const FixedDiv = document.querySelector(".myfixed");
const HideDiv = document.querySelector(".myabsolute-hide");
const ShowQuestions = document.querySelector(".numbering");
const QuestionsWrapper = document.querySelector(".myquestions-wrapper");

//next and previous buttons
const previousBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

//current and total questions
let footerCurrentQuestionNumber = document.querySelector(
  ".current-question-number"
);
let footerQuestionsCount = document.querySelector(".questions-count");

//events ------------------------------------

//dot-menu
dotBtn.addEventListener("click", () =>
  dotMenu.classList.toggle("hide-dot-menu")
);
document.querySelectorAll(".hide-drop-down").forEach((btn)=>{
  btn.addEventListener("click", () =>
  dotMenu.classList.toggle("hide-dot-menu"))
});

//hover-text
crossBtn.addEventListener("mouseover", () =>
  hoverText.classList.toggle("show-hover-text")
);

crossBtn.addEventListener("mouseout", () =>
  hoverText.classList.toggle("show-hover-text")
);

//show / hide fixed div questions
HideDiv.addEventListener("click", () => {
  FixedDiv.classList.remove("mytoggle-fixed");
  QuestionsWrapper.classList.remove("mytoggle-QuestionsWrapper");
});
ShowQuestions.addEventListener("click", () => {
  FixedDiv.classList.add("mytoggle-fixed");
  QuestionsWrapper.classList.add("mytoggle-QuestionsWrapper");
});

//next and previous buttons

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  InitQuiz();
  showPopupQuestions();
});

previousBtn.addEventListener("click", () => {
  currentQuestionIndex--;
  InitQuiz();
  showPopupQuestions();
});

//functions ------------------------------------

const InitQuiz = () => {
  //add current Question's text and number
  let currentQuestion = document.querySelector(".current-question");
  let currentQuestionNumber = currentQuestionIndex + 1;
  //handle if the question is not multiple choose and no answers show input
  const inputContainer = document.querySelector(".input-container");
  if (document.querySelector("input")) {
    inputContainer.removeChild(document.querySelector("input"));
  }
  let myInput = document.createElement("input");
  myInput.setAttribute("type", "number");
  myInput.setAttribute("placeholder", "Add your Answer Here");
  myInput.style.display = "none";

  currentQuestion.innerHTML = ` ${currentQuestionNumber}. ${Questions[currentQuestionIndex].question}`;

  //add current Question's Answers
  let currentQuestionAnswers = document.querySelector(
    ".current-question-answers"
  );
  //remove loading... message
  currentQuestionAnswers.innerHTML = "";

  function selectAnswer(e) {
    let selectedAnswerIndex = e.target.dataset.index;
    Questions[currentQuestionIndex].answers.forEach((answer, index) => {
      answer.selected = false;
    });
    Questions[currentQuestionIndex].answers[
      selectedAnswerIndex
    ].selected = true;
    //localStorage.setItem("examQuestions", JSON.stringify(questions));
    localStorage.setItem(
      JSON.stringify(exam.quiz.name + " " + "Questions"),
      JSON.stringify(Questions)
    );

    InitQuiz();
    showPopupQuestions();
  }

  function handleInputChange(e) {
    console.log(e.target.value);
    Questions[currentQuestionIndex].answer = e.target.value;
    localStorage.setItem(
      JSON.stringify(exam.quiz.name + " " + "Questions"),
      JSON.stringify(Questions)
    );

    InitQuiz();
    showPopupQuestions();
  }
  //add the order and text of each answer
  if (Questions[currentQuestionIndex].answers) {
    Questions[currentQuestionIndex].answers.forEach((answer, index) => {
      let singleAnswerDiv = document.createElement("div");
      let singleAnswerOrder = document.createElement("span");
      singleAnswerOrder.innerHTML = answer.order;
      let singleAnswerText = document.createElement("p");
      singleAnswerText.innerHTML = answer.answer;

      //add a different style for the selected answer
      if (answer.selected) {
        singleAnswerDiv.classList.add("selected");
      }

      singleAnswerDiv.appendChild(singleAnswerOrder);
      singleAnswerDiv.appendChild(singleAnswerText);
      currentQuestionAnswers.appendChild(singleAnswerDiv);

      //add index attribute to be fetched from selectAnswer function
      singleAnswerDiv.dataset.index = index;
      singleAnswerDiv.addEventListener("click", selectAnswer);
    });
  } else {
    myInput.style.display = "block";
    inputContainer.appendChild(myInput);
    document
      .querySelector("input")
      .addEventListener("change", handleInputChange);
    //console.log(document.querySelector("input"));
    if (Questions[currentQuestionIndex].answer) {
      document.querySelector("input").value = parseInt(
        Questions[currentQuestionIndex].answer
      );
    }
  }

  //disable previous button if index=0 & disable next button if index = question.length
  if (currentQuestionIndex == 0) {
    previousBtn.setAttribute("disabled", "disabled");
  } else {
    previousBtn.removeAttribute("disabled");
  }
  if (currentQuestionIndex == Questions.length - 1) {
    nextBtn.setAttribute("disabled", "disabled");
  } else {
    nextBtn.removeAttribute("disabled");
  }

  footerCurrentQuestionNumber.innerHTML = currentQuestionIndex + 1;
  footerQuestionsCount.innerHTML = Questions.length;
};

//document.addEventListener("DOMContentLoaded", InitQuiz);

//goToQuestion function logic
function goToQuestion(e) {
  FixedDiv.classList.remove("mytoggle-fixed");
  QuestionsWrapper.classList.remove("mytoggle-QuestionsWrapper");

  currentQuestionIndex = e.target.innerHTML - 1;
  InitQuiz();
  showPopupQuestions();
}

//add the questions numbers to the popup modal

const popupquestions = document.querySelector(".myactual-questions-container");

function showPopupQuestions() {
  popupquestions.innerHTML = "";
const windowExamTitle = document.querySelector(".window-exam-title");
    windowExamTitle.innerHTML = exam.quiz.name;

  Questions.forEach((ques, index) => {
    let popupquestion = document.createElement("span");
    popupquestion.innerHTML = index + 1;
    popupquestion.addEventListener("click", goToQuestion);
    let selected = false;

    if (Questions[index].answers) {
      Questions[index].answers.forEach((answer) => {
        if (answer.selected) {
          selected = true;
        }
      });
    } else if (Questions[index].answer && Questions[index].answer !== "") {
      selected = true;
    }
    if (selected) {
      popupquestion.classList.add("selected-popup-question");
    } else {
      popupquestion.classList.add("myquestion");
    }
    if (currentQuestionIndex === index) {
      const locationIcon = document.createElement("icon");
      locationIcon.classList.add("fa", "fa-location-dot", "location-icon");
      popupquestion.appendChild(locationIcon);
    }
    popupquestions.appendChild(popupquestion);
  });
}
