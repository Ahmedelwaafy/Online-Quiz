let exam;
//Questions
let Questions;

let timeInterval;

let time;

async function fetchData() {
  try {
    const response = await fetch("https://bayoumymath.com/api/quiz2/22");

    if (!response.ok) {
      throw new Error("Network response was not OK");
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
  } catch (error) {
    console.error("Error:", error);
  }
}
document.addEventListener("DOMContentLoaded", fetchData());
//Exam Details

const exa = {
  title: "Section 2, Module 1: Math",
  time: "120",
  questions: [
    {
      question: "What is Your Name?",
      answers: [],
    },

    {
      id: 10,
      question: "What is Laravel?",
      answers: [
        {
          answer: "Laravel is an open-source widely used Ruby framework.",
          order: "A",
        },

        {
          answer: "Laravel is an open-source widely used Ruby framework.",
          order: "B",
        },

        {
          answer: "Laravel is an open-source widely used Ruby framework.",
          order: "C",
        },

        {
          answer: "Laravel is an open-source widely used Ruby framework.",
          order: "D",
        },
      ],
    },

    {
      question: "What is HTTP middleware in Laravel?",
      answers: [
        {
          text: "HTTP middleware is a web server used by Laravel similar to Apache and Nginx.",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "HTTP middleware is a technique for filtering HTTP requests.",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "HTTP middleware is a technique for updating Laravel via HTTP.",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "HTTP middleware is a technique for installing Laravel via HTTP.",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question: "Which of the following are true for routes in Laravel?",
      answers: [
        {
          text: "Routes can only handle GET requests",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "You can not pass any arguments to your routes.",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "Laravel is an open-source widely used JavaScript framework.",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "A route is an endpoint specified by a URI (Uniform Resource Identifier).",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question: "Which of the following are true for Controllers in Laravel?",
      answers: [
        {
          text: "You should avoid using controllers as it is considered bad practice.",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "Controllers are stored in the app/Http/Controllers directory.",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "Controllers can group related request handling logic into a single class.",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "A controller is the C in the (Model-View-Controller) architecture.",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question:
        "Which artisan command would you use to create a new Laravel Controller?",
      answers: [
        {
          text: "php artisan controller:make controller_name",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "php artisan make:controller controller_name",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "php artisan create:controller controller_name",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "php artisan controller create controller_name",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question: "What is service container in Laravel?",
      answers: [
        {
          text: "Dockerized Laravel applications are called service containers.",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "Service container is a tool used for performing dependency injection in Laravel.",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "Laravel is an open-source widely used JavaScript framework.",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "Laravel is an open-source widely used Python framework.",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question:
        "Which artisan command would you use to create a new Laravel Model?",
      answers: [
        {
          text: "php artisan make:model ModelName",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "php artisan create:model ModelName",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "php artisan model:make ModelName",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "php artisan model create ModelName",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question: "What is the name of the Template Engine utilized by Laravel?",
      answers: [
        {
          text: "Squirrelly",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "Blade",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "Twig",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "Pug",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question:
        "Which artisan command would you use to create a new Laravel Migration?",
      answers: [
        {
          text: "php artisan make:migrations create_users_table",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "php artisan make:migrations create_users_table",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "php artisan make:migration create_users_table",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "php artisan create:migrations create_users_table",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
    {
      question:
        "Which artisan command will you used to enable maintenance mode in Laravel?",
      answers: [
        {
          text: "php artisan pause",
          correct: false,
          selected: false,
          order: "A",
        },
        {
          text: "php artisan maintenance",
          correct: true,
          selected: false,
          order: "B",
        },
        {
          text: "php artisan down",
          correct: false,
          selected: false,
          order: "C",
        },
        {
          text: "php artisan stop",
          correct: false,
          selected: false,
          order: "D",
        },
      ],
    },
  ],
};

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
  localStorage.clear(JSON.stringify(exam.quiz.name + " " + "Questions"));
  localStorage.clear(JSON.stringify(exam.quiz.name + " " + "Time"));
  clearInterval(timeInterval);
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
    console.log(document.querySelector("input"));
    if(Questions[currentQuestionIndex].answer){
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
    }else if (Questions[index].answer && Questions[index].answer !== "") {
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
