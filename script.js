// Card open and close
function cardOpenCloseFeatures() {
  // element selector

  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElems");
  let fullElemPageBtn = document.querySelectorAll(".fullElems .back");

  // open card
  allElems.forEach(function (card) {
    card.addEventListener("click", function () {
      fullElemPage[card.id].style.display = "block";
    });
  });

  // close card
  fullElemPageBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
cardOpenCloseFeatures();

// ripple effect 
function rippleEffect() {
  const taskBtn = document.querySelector("#task-btn");

  taskBtn.addEventListener("mouseover", function (e) {
    const x = e.pageX - taskBtn.offsetLeft; // pageX - button's left position = X inside button
    const y = e.pageY - taskBtn.offsetTop; // pageY - button's top position = Y inside button

    taskBtn.style.setProperty("--posX", x + "px");
    taskBtn.style.setProperty("--posY", y + "px");
  });
}
rippleEffect();

// pomodore Timer
function pomodoreTimer() {
  let time = document.querySelector(".pomo-timer p");
  let startBtn = document.querySelector("#start-timer");
  let pauseBtn = document.querySelector("#pause-timer");
  let resetBtn = document.querySelector("#reset-timer");
  let session = document.querySelector(".pomo-timer .session");

  let totalSeconds = 25 * 60;
  let timerInterval;
  let isWorkSession = true;

  function updateTime() {
    let minute = Math.floor(totalSeconds / 60);
    let second = totalSeconds % 60;
    time.innerHTML = `${String(minute).padStart("2", "0")}:${String(
      second
    ).padStart("2", "0")}`;
  }
  // srtarTimer
  const startTimer = () => {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          time.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--text-input2)";
          session.style.color = "var( --pomo-card)";
          totalSeconds = 5 * 60;
        }
      }, 10);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          time.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--toggle-btn--circle)";
          session.style.color = "var( --text-input2)";
          totalSeconds = 25 * 60;
        }
      }, 10);
    }
  };

  // pauseTimer
  const pauseTimer = () => {
    clearInterval(timerInterval);
  };
  // resetTimer
  const resetTimer = () => {
    clearInterval(timerInterval);
    totalSeconds = isWorkSession ? 25 * 60 : 5 * 60;
    updateTime();
  };

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoreTimer();
