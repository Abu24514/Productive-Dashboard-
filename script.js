//...............Add dark ORlight theme..........//
function darkOrLightTheme() {
  const applyTheme = (theme) => {
    document.body.className = theme;
  };

  // Initial theme
  applyTheme(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Toggle button
  document.querySelector(".toggleBtn").addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
  });

  // System theme change
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      applyTheme(e.matches ? "dark" : "light");
    });
}
darkOrLightTheme();

function cardOpenCloseFeatures() {
  // Scroll lock karne ka function
  function lockScroll() {
    const scrollY = window.scrollY; // current scroll position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.dataset.scrollY = scrollY; // store for later
  }

  // Scroll unlock karne ka function
  function unlockScroll() {
    const scrollY = document.body.dataset.scrollY || 0;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, parseInt(scrollY)); // restore position
    document.body.removeAttribute("data-scroll-y");
  }

  // element selector

  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElems");
  let fullElemPageBtn = document.querySelectorAll(".fullElems .back");

  // open card
  allElems.forEach(function (card) {
    card.addEventListener("click", function () {
      fullElemPage[card.id].style.display = "block";
      lockScroll();
    });
  });

  // close card
  fullElemPageBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
      unlockScroll();
    });
  });
}
cardOpenCloseFeatures();
//............ Dates and Time.............//
function valueTime() {
  function timeDate() {
    // select
    let Time = document.querySelector(".date .time");
    let week = document.querySelector(".date .week");
    let year = document.querySelector(".date .year");
    let tarikDiv = document.querySelector(".date .Date");

    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let date = new Date();
    let dayOfWeek = totalDaysOfWeek[date.getDay()];
    let saal = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let tarik = date.getDate();
    let month = monthNames[date.getMonth()];

    week.textContent = dayOfWeek;
    year.textContent = saal;
    tarikDiv.innerHTML = `${tarik} ${month}`;

    if (hours >= 12) {
      let displayHours = hours > 12 ? hours - 12 : 12;
      Time.innerHTML = `${String(displayHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} PM`;
    } else {
      let displayHours = hours === 0 ? 12 : hours;
      Time.innerHTML = `${String(displayHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}
valueTime();
// ........... weather application..........//
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
        <input class="check" type="checkbox" ${
          task.completed ? "checked" : ""
        } />
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
function MotivationalApp() {
  const motivationText = document.getElementById("motivationText");
  const authorTag = document.getElementById("authorTag");
  const prevBtn = document.getElementById("prevQuote");
  const nextBtn = document.getElementById("nextQuote");

  const quotes = [
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      text: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair",
    },
    {
      text: "I learned that courage was not the absence of fear, but the triumph over it.",
      author: "Nelson Mandela",
    },
    {
      text: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
      author: "Henry David Thoreau",
    },
    {
      text: "Testing leads to failure, and failure leads to understanding.",
      author: "Burt Rutan",
    },
    {
      text: "Programs must be written for people to read, and only incidentally for machines to execute.",
      author: "Harold Abelson",
    },
    {
      text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
      author: "Edsger Dijkstra",
    },
    {
      text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
      author: "Dan Salomon",
    },
    {
      text: "You might not think that programmers are artists, but programming is an extremely creative profession. It's logic-based creativity.",
      author: "John Romero",
    },
    {
      text: "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
      author: "Anonymous",
    },
    {
      text: "Java is to JavaScript what car is to Carpet.",
      author: "Chris Heilmann",
    },
    {
      text: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.",
      author: "Bjarne Stroustrup",
    },
    {
      text: "It's not that I'm so smart, it's just that I stay with problems longer.",
      author: "Albert Einstein",
    },
    {
      text: "Experience is the name everyone gives to their mistakes.",
      author: "Oscar Wilde",
    },
    {
      text: "In order to be irreplaceable, one must always be different.",
      author: "Coco Chanel",
    },
    {
      text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
      author: "Maya Angelou",
    },
    {
      text: "Happiness is not something readymade. It comes from your own actions.",
      author: "Dalai Lama",
    },
    {
      text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
      author: "Sheryl Sandberg",
    },
    {
      text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
      author: "Unknown",
    },
    {
      text: "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
      author: "Marie Curie",
    },
    {
      text: "Too many of us are not living our dreams because we are living our fears.",
      author: "Les Brown",
    },
    {
      text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
      author: "Joshua J. Marine",
    },
    {
      text: "If you want to lift yourself up, lift up someone else.",
      author: "Booker T. Washington",
    },
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      text: "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford",
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt",
    },
    {
      text: "Act as if what you do makes a difference. It does.",
      author: "William James",
    },
    {
      text: "Success usually comes to those who are too busy to be looking for it.",
      author: "Henry David Thoreau",
    },
    {
      text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      author: "Roy T. Bennett",
    },
    {
      text: "The only way to achieve the impossible is to believe it is possible.",
      author: "Charles Kingsleigh",
    },

    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
    },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler",
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs",
    },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine",
    },
    {
      text: "The most disastrous thing that you can ever learn is your first programming language.",
      author: "Alan Kay",
    },
    {
      text: "Walking on water and developing software from a specification are easy if both are frozen.",
      author: "Edward V. Berard",
    },
    {
      text: "Don't worry if it doesn't work right. If everything did, you'd be out of a job.",
      author: "Mosher's Law",
    },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    {
      text: "Before software can be reusable it first has to be usable.",
      author: "Ralph Johnson",
    },
    {
      text: "It's not a bug – it's an undocumented feature.",
      author: "Anonymous",
    },
    {
      text: "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie",
    },
    {
      text: "Debugging is twice as hard as writing the code in the first place.",
      author: "Brian Kernighan",
    },
    { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
    {
      text: "Good code is its own best documentation.",
      author: "Steve McConnell",
    },
    {
      text: "Clean code always looks like it was written by someone who cares.",
      author: "Robert C. Martin",
    },
    {
      text: "The function of good software is to make the complex appear to be simple.",
      author: "Grady Booch",
    },
  ];

  let currentIndex = 0;

  function showQuote() {
    motivationText.textContent = quotes[currentIndex].text;
    authorTag.textContent = `- ${quotes[currentIndex].author}`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < quotes.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to first quote
    }
    showQuote();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = quotes.length - 1; // Loop to last quote
    }
    showQuote();
  });

  // Load first quote on start
  showQuote();
}

MotivationalApp();
// ..................pomodore Timer.................//
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
// ........... Daily Planner..........//
function dailyPlanner() {
  const planForm = document.querySelector(".planner-form");
  const planTask = document.querySelector(".plan-task");

  planForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addPlan();
  });

  function addPlan() {
    const planTime = document.querySelector("#planTime").value;
    const planText = document.querySelector("#planTask").value.trim();

    if (!planText) return;

    const formattedTime = convertTo12Hour(planTime);

    const li = document.createElement("li");
    li.innerHTML = `
    <span class="plan-span">${formattedTime}</span>
    <div class="plan-con">
      <p class="plan-p">${planText}</p>
      <button class="deleteBtn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

    // Add delete functionality
    li.querySelector(".deleteBtn").addEventListener("click", () => li.remove());

    // Append to list
    planTask.append(li);

    // Clear form
    planForm.reset();
  }

  // Convert 24-hour time to 12-hour with AM/PM
  function convertTo12Hour(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12, and 13-23 to 1-11
    return `${hours.toString().padStart("2", "0")}:${minutes} ${period}`;
  }
}
dailyPlanner();
