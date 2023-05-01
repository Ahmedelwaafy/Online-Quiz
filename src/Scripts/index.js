let exam;
//Questions
let Questions;
let XQuestions;

let timeInterval;

let time;
let finalAnswers = {
  examID: "",
};
const examName = document.querySelector(".exam-title");
let ExamVariableID = 22;
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
    clearInterval(timeInterval);
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
if (hideTimerBtn) {
  hideTimerBtn.addEventListener("click", hideTimer);
}

//show timer logic
function showTimer() {
  timeInterval = setInterval("timer()", 1000);
  hideTimerBtn.classList.toggle("disable-timer");
  showTimerBtn.classList.toggle("disable-timer");
}

if (showTimerBtn) {
  showTimerBtn.addEventListener("click", showTimer);
}

//submit button logic
const submitBtn = document.querySelector(".submit-btn");
if (submitBtn) {
  submitBtn.addEventListener("click", handleSubmit);
}

function handleSubmit() {
  //perform an automatic submission then clear the local storage and the interval as a result of successful submission (.then())
  let confirm;
  let SubmitQuestions = JSON.parse(
    localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Questions"))
  );
  let SubmitQuestionsArray = Object.entries(SubmitQuestions);
  if (SubmitQuestions) {
    SubmitQuestionsArray.forEach((question) => {
      //if the answer is of type choose it will be overwritten else it will put in the finalAnswers object without editing
      let answer = question[1];
      if (question[1] == "A") {
        answer = "a1";
      } else if (question[1] == "B") {
        answer = "a2";
      } else if (question[1] == "C") {
        answer = "a3";
      } else if (question[1] == "D") {
        answer = "a4";
      }
      finalAnswers = {
        ...finalAnswers,
        [question[0]]: answer,
      };
    });
  } else {
    confirm = window.confirm(
      "You haven't answered any question yet, Do you really want to submit?"
    );

    console.log("You haven't answered any question");
  }
  if (SubmitQuestions || confirm) {
    try {
      fetch(`https://bayoumymath.com/api/quiz2/submit/${ExamVariableID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalAnswers),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Submit process failed, please try again!");
          } else {
            localStorage.clear(
              JSON.stringify(exam.quiz.name + " " + "Questions")
            );
            localStorage.clear(JSON.stringify(exam.quiz.name + " " + "Time"));
            clearInterval(timeInterval);
            document.querySelector(".timer").innerHTML = "";
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          showPopupQuestions(data);
        })
        .catch((error) => {
          alert("Submit process failed, please try again!");
        });
    } catch (error) {
      alert("Submit process failed, please try again!");
    }
  }
  console.log(finalAnswers);
}

//Variables ---------------------------------------
let currentQuestionIndex = 0;

//selectors ---------------------------------------

//dot-menu
const dotBtn = document.querySelector(".menu-wrapper button");
const dotMenu = document.querySelector(".dot-menu");

//explanation-btn
const explanationBtn = document.querySelector(".explanation-btn");
const explanationText = document.querySelector(".explanation-text");
const heightZero = document.querySelector(".h-0");
const explanationWrapper = document.querySelector(".explanation-wrapper");
const textAboveQuestion = document.querySelector(".text-above-question");

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

//explanation-text
explanationBtn.addEventListener("click", () => {
  explanationText.classList.toggle("hide-explanation-text");
  heightZero.classList.toggle("h-0");
});

document.querySelectorAll(".hide-drop-down").forEach((btn) => {
  btn.addEventListener("click", () =>
    dotMenu.classList.toggle("hide-dot-menu")
  );
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
    Questions[currentQuestionIndex].answers.forEach((answer, index) => {});

    let QuestionID = Questions[currentQuestionIndex].id;
    //finalAnswers.answers.push({ [QuestionID]: question.answer });

    XQuestions = {
      ...XQuestions,
      [QuestionID]:
        Questions[currentQuestionIndex].answers[selectedAnswerIndex].order,
    };
    //localStorage.setItem("examQuestions", JSON.stringify(questions));
    localStorage.setItem(
      JSON.stringify(exam.quiz.name + " " + "Questions"),
      JSON.stringify(XQuestions)
    );

    InitQuiz();
    showPopupQuestions();
  }

  function handleInputChange(e) {
    console.log(e.target.value);

    let QuestionID = "essay_" + Questions[currentQuestionIndex].id;
    XQuestions = {
      ...XQuestions,
      [QuestionID]: e.target.value,
    };
    console.log(XQuestions);
    localStorage.setItem(
      JSON.stringify(exam.quiz.name + " " + "Questions"),
      JSON.stringify(XQuestions)
    );
    InitQuiz();
    showPopupQuestions();
  }
  //add the order and text of each answer
  //check if the the question is of type choose (has answers array)

  if (Questions[currentQuestionIndex].answers) {
    Questions[currentQuestionIndex].answers.forEach((answer, index) => {
      let singleAnswerDiv = document.createElement("div");
      let singleAnswerOrder = document.createElement("span");
      singleAnswerOrder.innerHTML = answer.order;
      let singleAnswerText = document.createElement("p");
      singleAnswerText.innerHTML = answer.answer;

      //add a different style for the selected answer

      let QuestionID = Questions[currentQuestionIndex].id;

      if (QuestionID in XQuestions && answer.order == XQuestions[QuestionID]) {
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

    let QuestionID = "essay_" + Questions[currentQuestionIndex].id;

    if (QuestionID in XQuestions) {
      document.querySelector("input").value = parseFloat(
        XQuestions[QuestionID]
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

//goToQuestion function logic
function goToQuestion(e) {
  FixedDiv.classList.remove("mytoggle-fixed");
  QuestionsWrapper.classList.remove("mytoggle-QuestionsWrapper");

  currentQuestionIndex = parseInt(e.target.innerHTML) - 1;
  showPopupQuestions();
  InitQuiz();
}

//add the questions numbers to the popup modal

const popupquestions = document.querySelector(".myactual-questions-container");

function showPopupQuestions(res) {
  popupquestions.innerHTML = "";
  const windowExamTitle = document.querySelector(".window-exam-title");
  if (res) {
    windowExamTitle.innerHTML = "Congratulations!!!";
    const resultContainer = document.querySelector(".result-container");
    FixedDiv.classList.add("mytoggle-fixed");
    QuestionsWrapper.classList.add("mytoggle-QuestionsWrapper");
    const result = document.createElement("h3");
    result.textContent = `Your degree is ${res.dgree} out of ${res.out_of}.`;
    resultContainer.appendChild(result);

    const Btn = document.createElement("a");
    Btn.setAttribute("href", "https://tailwindcss.com/docs/installation");
    Btn.setAttribute("target", "_blank");
    Btn.innerText = "Model Answer";
    resultContainer.appendChild(Btn);
    HideDiv.addEventListener("click", () => {
      FixedDiv.classList.add("mytoggle-fixed");
      QuestionsWrapper.classList.add("mytoggle-QuestionsWrapper");
    });
  } else {
    windowExamTitle.innerHTML = exam.quiz.name;
    Questions.forEach((ques, index) => {
      let popupquestion = document.createElement("span");
      popupquestion.innerHTML = index + 1;
      popupquestion.addEventListener("click", goToQuestion);
      let selected = false;

      if (Questions[index].answers) {
        let QuestionID = Questions[index].id;
        if (QuestionID in XQuestions) {
          selected = true;
        }
      } else {
        let QuestionID = "essay_" + Questions[index].id;
        if (QuestionID in XQuestions) {
          selected = true;
        }
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
}

async function fetchData() {
  try {
    const response = await fetch(
      `https://bayoumymath.com/api/quiz2/${ExamVariableID}`
    );

    if (!response.ok) {
      throw new Error(
        "Something wrong happened while retrieving the exam details, please refresh the page and try again!"
      );
    }

    exam = await response.json();

    Questions = [...exam.choosequestions, ...exam.essayquestions];

    time =
      parseInt(
        JSON.parse(
          localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Time"))
        )
      ) || parseInt(exam.quiz.duration * 60);
    XQuestions =
      JSON.parse(
        localStorage.getItem(JSON.stringify(exam.quiz.name + " " + "Questions"))
      ) || {};
    console.log(exam);
    hideTimerBtn.classList.remove("disable-timer");
    explanationWrapper.classList.remove("disable-timer");
    textAboveQuestion.classList.remove("disable-timer");
    InitQuiz();
    showPopupQuestions();
    timeInterval = setInterval("timer()", 1000);
    //finalAnswers.examName = exam.quiz.name;
    finalAnswers.examID = exam.quiz.id;
    examName.innerHTML = exam.quiz.name;
  } catch (error) {
    console.error("Error:", error);

    alert(
      "Some thing wrong happened while retrieving the exam details, please refresh the page and try again!"
    );
  }
}
document.addEventListener("DOMContentLoaded", fetchData());
