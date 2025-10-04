// Call every second
setInterval(timeDate, 1000);
// Dates and Time
function timeDate() {
  // Select DOM elements
  let Time = document.querySelector(".date .time");
  let week = document.querySelector(".date .week");
  let year = document.querySelector(".date .year");
  let tarikDiv = document.querySelector(".date .Date");

  const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get current date and time
  let date = new Date();
  let dayOfWeek = totalDaysOfWeek[date.getDay()];
  let saal = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let tarik = date.getDate();
  let month = monthNames[date.getMonth()];

  // Update text
  week.textContent = dayOfWeek;
  year.textContent = saal;
  tarikDiv.textContent = `${tarik} ${month}`;

  // Format hours for 12-hour clock
  let meridian = hours >= 12 ? "PM" : "AM";
  let formattedHours = hours % 12 || 12; // 0 ko 12 me convert karega

  // Update time display
  Time.textContent = 
    `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${meridian}`;
}
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
      }, 1000);
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
      }, 1000);
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
