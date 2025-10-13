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
// Weather application
function weatherApp() {
  //  all selector----
  let city = document.querySelector(".name");
  let form = document.querySelector(".citySearch");
  let tempAndDesc = document.querySelector(".tempAnddesc");
  let valueSearch = document.querySelector(".cityname");
  let ImgIcon = document.querySelector(".icon");
  let weather = document.querySelector(".weather");
  let weatherBox = document.querySelector(".weather-box");
  let weatherEmptyImgebox = document.querySelector(".w-image");
  let errorSound = new Audio("error.mp3");

  weatherEmptyImgebox.style.display = "flex";
  weatherBox.style.display = "none";
  city.style.display = "none";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValueName = valueSearch.value;
    if (cityValueName !== "") {
      weatherApiCall(cityValueName);
    }
  });

  const apiKey = "fffad2b006a3bbc946750dc15058d48d";
  async function weatherApiCall(cityValueName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValueName}&appid=${apiKey}&units=metric`
      );
      let data = await response.json();
      if (data.cod == 200) {
        const temprature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        city.querySelector(".w-n").textContent = data.name;
        city.querySelector("img").src =
          "https://flagsapi.com/" + data.sys.country + "/shiny/32.png";
        ImgIcon.querySelector(
          "img"
        ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        tempAndDesc.querySelector(".temp").textContent = `${temprature}°C`;
        tempAndDesc.querySelector(".desc").textContent = `${description}`;
        const info = {
          "cloud-pr": `${data.clouds.all}%`,
          "humidity-pr": `${data.main.humidity}%`,
          pressure: `${data.main.pressure} hPa`,
        };
        let convertToArr = Object.entries(info);
        convertToArr.forEach(([id, value]) => {
          // console.log(id ,value);
          document.getElementById(id).textContent = value;
        });

        weatherBox.style.display = "flex";
        city.style.display = "flex";
        weatherEmptyImgebox.style.display = "none";
      } else {
          errorSound.play();
        weather.classList.add("error");
        setTimeout(() => {
          weather.classList.remove("error");
        }, 1000);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      weatherBox.style.display = "none";
      city.style.display = "none";
    }
    valueSearch.value = "";
  }
}
weatherApp();

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
// ...........  Create a toster.........//
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// ........... Todo List Apps.........//
function todosApp() {
  const taskInput = document.getElementById("task-input");
  const textareaInput = document.getElementById("textareaInput");
  const impCheck = document.getElementById("impCheck");
  const alltasksContainer = document.querySelector(".alltasks");
  const emptyImage = document.getElementById("empty-image");
  const form = document.querySelector(".addtask form");

  // Tasks array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    updateEmptyState();
  });

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });

  // Add task function
  function addTask() {
    const taskText = taskInput.value.trim();
    const taskDetails = textareaInput.value.trim();

    if (!taskText) {
      showToast("Please enter a task ✍🏻", "alert");
      return;
    }

    const task = {
      id: Date.now(),
      text: taskText,
      details: taskDetails,
      important: impCheck.checked,
      completed: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    updateEmptyState();

    // Reset form
    taskInput.value = "";
    textareaInput.value = "";
    impCheck.checked = false;
    showToast("Task added ✅", "success");
  }

  // Render all tasks
  function renderTasks() {
    const existingTasks = alltasksContainer.querySelectorAll(".task");
    existingTasks.forEach((task) => task.remove());

    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      alltasksContainer.insertBefore(taskElement, emptyImage);
    });
  }

  // Create task element
  function createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.completed ? "completed" : ""}`;
    taskDiv.dataset.id = task.id;

    taskDiv.innerHTML = `
      <div class="checkAndHead">
        <input class="check" type="checkbox" ${task.completed ? "checked" : ""} />
        <h5 class="task-title">
          ${task.text}
          ${task.important ? "<span>imp</span>" : ""}
        </h5>
      </div>
      <div class="delAndEditBtn">
        <button class="editBtn">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="deleteBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    const checkbox = taskDiv.querySelector(".check");
    const editBtn = taskDiv.querySelector(".editBtn");
    const deleteBtn = taskDiv.querySelector(".deleteBtn");
    const taskTitle = taskDiv.querySelector(".task-title");

    checkbox.addEventListener("change", () => toggleComplete(task.id));
    editBtn.addEventListener("click", () => editTask(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id, false));

    // Show details popup on title click
    taskTitle.addEventListener("click", () => showDetailsPopup(task));

    return taskDiv;
  }

  // Toggle task completion
  function toggleComplete(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  }

  // Edit task
  function editTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      taskInput.value = task.text;
      textareaInput.value = task.details;
      impCheck.checked = task.important;

      deleteTask(id, true);
      taskInput.focus();
      showToast("Editing task...", "alert");
    }
  }

  // Delete task
  function deleteTask(id, fromEdit = false) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderTasks();
    updateEmptyState();

    if (!fromEdit) {
      showToast("Task deleted ⚔️", "error");
    }
  }

  // Show task details popup
  const showDetailsPopup = (task) => {
    const oldPopup = document.querySelector(".details-popup");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
    popup.classList.add("details-popup");
    popup.innerHTML = `
      <div class="popup-content">
        <h3>${task.text}</h3>
        <p>${task.details || "No details added"}</p>
        <button class="close-details">Close</button>
      </div>
    `;

    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add("show"), 10);

    popup.querySelector(".close-details").addEventListener("click", () => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    });
  };

  // Update empty state visibility
  function updateEmptyState() {
    if (tasks.length === 0) {
      emptyImage.style.display = "flex";
    } else {
      emptyImage.style.display = "none";
    }
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
todosApp();
// ........... Motivational Page feature..........//
function MotivationalApp(){
  
const motivationText = document.getElementById("motivationText");
const authorTag = document.getElementById("authorTag");
const prevBtn = document.getElementById("prevQuote");
const nextBtn = document.getElementById("nextQuote");

let quotes = [];
let currentIndex = -1;

async function getQuote() {
 try {
   const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();
  quotes.push({ text: data.content, author: data.author });
  currentIndex = quotes.length - 1;
  showQuote();
 } catch (err) {
   console.log("Error fetching quote:", err);
      motivationText.textContent = "Failed to load quote. Try again!";
      authorTag.textContent = "";
 }
}

function showQuote() {
  motivationText.textContent = quotes[currentIndex].text;
  authorTag.textContent = `- ${quotes[currentIndex].author}`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex === quotes.length - 1) {
    getQuote(); 
  } else {
    currentIndex++;
    showQuote();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuote();
  }
});

// load first quote on start
getQuote();


}
MotivationalApp();

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
