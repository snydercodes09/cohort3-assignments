const featureCards = document.querySelectorAll(".feature-card");
const backButtons = document.querySelectorAll(".fullElem .back");
const themeToggle = document.querySelector("#themeToggle");
const widgetTime = document.querySelector("#widgetTime");
const widgetDate = document.querySelector("#widgetDate");
const navbarBg = document.querySelector("#navbarBg");
const todoList = document.querySelector("#todoList");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoDetails = document.querySelector("#todoDetails");
const sectionTodo = document.querySelector("#section-todo");
const filterBtns = document.querySelectorAll(".filter-btn");
const plannerList = document.querySelector("#plannerList");
const clearPlannerBtn = document.querySelector("#clearPlanner");
const goalsList = document.querySelector("#goalsList");
const goalProgressRing = document.querySelector("#goalProgressRing");
const goalPercentText = document.querySelector("#goalPercentText");
const goalCountText = document.querySelector("#goalCountText");
const goalForm = document.querySelector("#goalForm");
const goalInput = document.querySelector("#goalInput");
const pomoTime = document.querySelector("#pomodoroTime");
const pomodoroRing = document.querySelector("#pomodoroRing");
const pomoToggleIcon = document.querySelector("#pomoToggleIcon");
const pomodoroLabel = document.querySelector("#pomodoroLabel");
const pomoToggleBtn = document.querySelector("#pomoToggleBtn");
const pomoResetBtn = document.querySelector("#pomoResetBtn");
const modeFocusBtn = document.querySelector("#modeFocus");
const modeShortBtn = document.querySelector("#modeShort");
const modeLongBtn = document.querySelector("#modeLong");
const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const newQuoteBtn = document.querySelector("#newQuoteBtn");
const miniWeatherTemp = document.querySelector("#miniWeatherTemp");
const weatherConditionText = document.querySelector("#weatherConditionText");
const weatherPrecip = document.querySelector("#weatherPrecip");
const weatherHumidity = document.querySelector("#weatherHumidity");
const weatherWind = document.querySelector("#weatherWind");
const weatherIconContainer = document.querySelector("#weatherIconContainer");
const miniWeatherCity = document.querySelector("#miniWeatherCity");

let totalFocusSeconds =
  Number(localStorage.getItem("dashboard-focus-seconds")) || 0;
let todos = JSON.parse(localStorage.getItem("dashboard-todos")) || [];
let currentFilter = "all";

function initModals() {
  featureCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const target = card.getAttribute("data-target");
      const modal = document.querySelector(`#modal-${target}`);
      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });
  });

  backButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const modal = e.target.closest(".fullElem");
      if (modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  });
}
initModals();

let isDarkMode = localStorage.getItem("dashboard-dark-mode") !== "false";

function applyTheme() {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
applyTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    localStorage.setItem("dashboard-dark-mode", isDarkMode);
    applyTheme();
  });
}

let currentWeatherCondition = "sunny";

const bgImages = {
  sunny: {
    morning: "asset/bg_sunny.png",
    noon: "asset/bg_sunny.png",
    afternoon: "asset/bg_sunny.png",
    goldenHour: "asset/bg_sunny.png",
    evening: "asset/bg_sunny_night.png",
    night: "asset/bg_sunny_night.png",
  },
  cloudy: {
    morning: "asset/bg_cloudy.png",
    noon: "asset/bg_cloudy.png",
    afternoon: "asset/bg_cloudy.png",
    goldenHour: "asset/bg_cloudy.png",
    evening: "asset/bg_cloudy_night.png",
    night: "asset/bg_cloudy_night.png",
  },
  rainy: {
    morning: "asset/bg_rainy.png",
    noon: "asset/bg_rainy.png",
    afternoon: "asset/bg_rainy.png",
    goldenHour: "asset/bg_rainy.png",
    evening: "asset/bg_rainy_night.png",
    night: "asset/bg_rainy_night.png",
  },
  foggy: {
    morning: "asset/bg_foggy.png",
    noon: "asset/bg_foggy.png",
    afternoon: "asset/bg_foggy.png",
    goldenHour: "asset/bg_foggy.png",
    evening: "asset/bg_foggy_night.png",
    night: "asset/bg_foggy_night.png",
  },
  snowy: {
    morning: "asset/bg_snowy.png",
    noon: "asset/bg_snowy.png",
    afternoon: "asset/bg_snowy.png",
    goldenHour: "asset/bg_snowy.png",
    evening: "asset/bg_snowy_night.png",
    night: "asset/bg_snowy_night.png",
  },
  partlyCloudy: {
    morning: "asset/bg_partlyCloudy.png",
    noon: "asset/bg_partlyCloudy.png",
    afternoon: "asset/bg_partlyCloudy.png",
    goldenHour: "asset/bg_partlyCloudy.png",
    evening: "asset/bg_partlyCloudy_night.png",
    night: "asset/bg_partlyCloudy_night.png",
  },
  thunderstorm: {
    morning: "asset/bg_thunderstorm.png",
    noon: "asset/bg_thunderstorm.png",
    afternoon: "asset/bg_thunderstorm.png",
    goldenHour: "asset/bg_thunderstorm.png",
    evening: "asset/bg_thunderstorm_night.png",
    night: "asset/bg_thunderstorm_night.png",
  },
  windy: {
    morning: "asset/bg_windy.png",
    noon: "asset/bg_windy.png",
    afternoon: "asset/bg_windy.png",
    goldenHour: "asset/bg_windy.png",
    evening: "asset/bg_windy_night.png",
    night: "asset/bg_windy_night.png",
  },
};

function updateClock() {
  const now = new Date();
  const hours = now.getHours();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (widgetTime)
    widgetTime.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  if (widgetDate)
    widgetDate.textContent = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  let timeGroup = "night";

  if (hours >= 5 && hours < 11) {
    timeGroup = "morning";
  } else if (hours >= 11 && hours < 14) {
    timeGroup = "noon";
  } else if (hours >= 14 && hours < 17) {
    timeGroup = "afternoon";
  } else if (hours >= 17 && hours < 19) {
    timeGroup = "goldenHour";
  } else if (hours >= 19 && hours < 21) {
    timeGroup = "evening";
  }

  const bgUrl = bgImages[currentWeatherCondition][timeGroup];
  document.body.style.backgroundImage = `url('${bgUrl}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";

  if (navbarBg) {
    navbarBg.style.backgroundImage = `url('${bgUrl}')`;
  }
}

setInterval(updateClock, 1000);
updateClock();

function saveTodos() {
  localStorage.setItem("dashboard-todos", JSON.stringify(todos));
}

function renderTodos() {
  if (!todoList) return;
  todoList.innerHTML = "";

  let filtered = todos;
  if (currentFilter === "active") {
    filtered = todos.filter(function (t) {
      return !t.completed;
    });
  } else if (currentFilter === "completed") {
    filtered = todos.filter(function (t) {
      return t.completed;
    });
  }

  if (filtered.length === 0) {
    todoList.innerHTML =
      '<p class="text-center text-gray-500 py-8">No tasks found.</p>';
    return;
  }

  filtered.forEach(function (todo) {
    const div = document.createElement("div");
    div.className = `todo-item group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border border-white/5 ${
      todo.completed ? "bg-white/5 opacity-60" : "bg-black/20 hover:bg-black/30"
    }`;
    div.setAttribute("data-id", todo.id);

    div.innerHTML = `
            <button class="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${todo.completed ? "bg-primary border-primary text-white" : "border-gray-500 text-transparent hover:border-primary-light"}" data-action="toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </button>
            <div class="flex-grow">
                <h4 class="font-medium text-white ${todo.completed ? "line-through text-gray-400" : ""}">${todo.text}</h4>
                ${todo.details ? `<p class="text-sm text-gray-400 mt-1">${todo.details}</p>` : ""}
            </div>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button class="text-gray-500 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-500/10" data-action="update">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button class="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10" data-action="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
            </div>
        `;
    todoList.appendChild(div);
  });
}

if (todoForm) {
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = todoInput;
    const details = todoDetails;
    if (input.value.trim() === "") return;

    todos.unshift({
      id: Date.now(),
      text: input.value.trim(),
      details: details.value.trim(),
      completed: false,
    });

    input.value = "";
    details.value = "";
    saveTodos();
    renderTodos();
  });
}

if (sectionTodo) {
  sectionTodo.addEventListener("click", function (e) {
    const actionBtn = e.target.closest("[data-action]");
    if (actionBtn) {
      const todoItem = e.target.closest(".todo-item");
      const id = Number(todoItem.getAttribute("data-id"));
      const action = actionBtn.getAttribute("data-action");

      if (action === "toggle") {
        const todo = todos.find(function (t) {
          return t.id === id;
        });
        if (todo) todo.completed = !todo.completed;
      } else if (action === "delete") {
        todos = todos.filter(function (t) {
          return t.id !== id;
        });
      } else if (action === "update") {
        const todo = todos.find(function (t) {
          return t.id === id;
        });
        if (todo) {
          const newText = prompt("Update task:", todo.text);
          if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            const newDetails = prompt(
              "Update details (optional):",
              todo.details || "",
            );
            if (newDetails !== null) {
              todo.details = newDetails.trim();
            }
          }
        }
      }
      saveTodos();
      renderTodos();
      return;
    }

    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      filterBtns.forEach(function (btn) {
        btn.classList.remove(
          "active",
          "bg-primary/20",
          "text-primary-light",
          "border-primary/30",
        );
        btn.classList.add("text-gray-400", "border-transparent");
      });
      filterBtn.classList.remove("text-gray-400", "border-transparent");
      filterBtn.classList.add(
        "active",
        "bg-primary/20",
        "text-primary-light",
        "border-primary/30",
      );
      currentFilter = filterBtn.getAttribute("data-filter");
      renderTodos();
      return;
    }

    if (e.target.id === "clearCompleted") {
      todos = todos.filter(function (t) {
        return !t.completed;
      });
      saveTodos();
      renderTodos();
    }
  });
}

renderTodos();

let plannerData = JSON.parse(localStorage.getItem("dashboard-planner")) || {};

function renderPlanner() {
  if (!plannerList) return;

  plannerList.innerHTML = "";
  let html = "";
  for (let i = 0; i < 24; i++) {
    const hour = (5 + i) % 24;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    const timeLabel = `${displayHour} ${ampm}`;

    html += `
        <div class="flex items-stretch border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors">
            <div class="w-24 p-3 text-right text-sm font-medium text-gray-400 border-r border-white/5 group-hover:text-purple-400 transition-colors">
                ${timeLabel}
            </div>
            <div class="flex-grow">
                <input type="text" class="planner-input w-full h-full bg-transparent border-none px-4 text-white placeholder-gray-600 focus:outline-none focus:bg-white/5" 
                    placeholder="Plan this hour..." data-hour="${hour}" value="${plannerData[hour] || ""}">
            </div>
        </div>
    `;
  }
  plannerList.innerHTML = html;

  plannerList.querySelectorAll(".planner-input").forEach(function (input) {
    input.addEventListener("input", function (e) {
      const h = e.target.getAttribute("data-hour");
      plannerData[h] = e.target.value;
      localStorage.setItem("dashboard-planner", JSON.stringify(plannerData));
    });
  });
}

if (clearPlannerBtn) {
  clearPlannerBtn.addEventListener("click", function () {
    plannerData = {};
    localStorage.setItem("dashboard-planner", JSON.stringify(plannerData));
    renderPlanner();
  });
}

renderPlanner();

let goals = JSON.parse(localStorage.getItem("dashboard-goals")) || [];

function saveGoals() {
  localStorage.setItem("dashboard-goals", JSON.stringify(goals));
}

function renderGoals() {
  if (!goalsList) return;
  goalsList.innerHTML = "";

  const completedGoals = goals.filter(function (g) {
    return g.completed;
  }).length;
  const totalGoals = goals.length;
  const percentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const ring = goalProgressRing;
  const percentText = goalPercentText;
  const countText = goalCountText;
  if (ring) {
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percentage / 100) * circumference;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
  }
  if (percentText) percentText.textContent = `${percentage}%`;
  if (countText)
    countText.textContent = `${completedGoals} of ${totalGoals} goals done`;

  if (goals.length === 0) {
    goalsList.innerHTML =
      '<p class="text-center text-gray-500 py-4">No goals set for today.</p>';
    return;
  }

  goals.forEach(function (goal) {
    const div = document.createElement("div");
    div.className = `goal-item flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 transition-all ${goal.completed ? "opacity-60" : "hover:bg-black/30"}`;
    div.setAttribute("data-id", goal.id);

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <button class="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${goal.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-500 text-transparent hover:border-emerald-400"}" data-action="toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </button>
                <span class="font-medium text-white ${goal.completed ? "line-through text-gray-400" : ""}">${goal.text}</span>
            </div>
            <button class="text-gray-500 hover:text-red-400 transition-colors p-1" data-action="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
        `;
    goalsList.appendChild(div);
  });
}

if (goalForm) {
  goalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = goalInput;
    if (input.value.trim() === "") return;

    goals.push({
      id: Date.now(),
      text: input.value.trim(),
      completed: false,
    });

    input.value = "";
    saveGoals();
    renderGoals();
  });
}

if (goalsList) {
  goalsList.addEventListener("click", function (e) {
    const item = e.target.closest("[data-action]");
    if (!item) return;

    const goalItem = e.target.closest(".goal-item");
    const id = Number(goalItem.getAttribute("data-id"));
    const action = item.getAttribute("data-action");

    if (action === "toggle") {
      const goal = goals.find(function (g) {
        return g.id === id;
      });
      if (goal) goal.completed = !goal.completed;
    } else if (action === "delete") {
      goals = goals.filter(function (g) {
        return g.id !== id;
      });
    }

    saveGoals();
    renderGoals();
  });
}

renderGoals();

let pomodoroInterval = null;
let pomodoroTimeLeft = 25 * 60;
let pomodoroTotalTime = 25 * 60;
let pomodoroRunning = false;
let pomodoroMode = "focus";

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTimeLeft / 60);
  const seconds = pomodoroTimeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const pomoTime = pomodoroTime;
  if (pomoTime) pomoTime.textContent = timeStr;

  const ring = pomodoroRing;
  if (ring) {
    const circumference = 2 * Math.PI * 130;
    const progress =
      pomodoroTotalTime > 0 ? pomodoroTimeLeft / pomodoroTotalTime : 0;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference - progress * circumference;
  }
}

function startPomodoro() {
  if (pomodoroRunning) return;
  pomodoroRunning = true;

  pomoToggleIcon.innerHTML =
    '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

  pomodoroInterval = setInterval(function () {
    if (pomodoroTimeLeft > 0) {
      pomodoroTimeLeft--;
      if (pomodoroMode === "focus") {
        totalFocusSeconds++;
        localStorage.setItem("dashboard-focus-seconds", totalFocusSeconds);
      }
      updatePomodoroDisplay();
    } else {
      stopPomodoro();
      alert("Timer ended!");
    }
  }, 1000);
}

function stopPomodoro() {
  if (!pomodoroRunning) return;
  pomodoroRunning = false;
  clearInterval(pomodoroInterval);
  pomoToggleIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
}

function setPomodoroMode(mode, minutes) {
  stopPomodoro();
  pomodoroMode = mode;
  pomodoroTimeLeft = minutes * 60;
  pomodoroTotalTime = minutes * 60;
  updatePomodoroDisplay();

  document.querySelectorAll('[id^="mode"]').forEach(function (btn) {
    btn.classList.remove(
      "bg-primary/20",
      "text-primary-light",
      "border-primary/30",
    );
    btn.classList.add(
      "bg-black/5",
      "dark:bg-white/5",
      "hover:bg-black/5",
      "dark:hover:bg-white/10",
      "text-gray-500",
      "dark:text-gray-400",
      "border-transparent",
    );
  });

  let btnId = "";
  let label = "";
  if (mode === "focus") {
    btnId = "modeFocus";
    label = "Work Session";
  }
  if (mode === "shortBreak") {
    btnId = "modeShort";
    label = "Short Break";
  }
  if (mode === "longBreak") {
    btnId = "modeLong";
    label = "Long Break";
  }

  const activeBtn = document.querySelector(`#${btnId}`);
  if (activeBtn) {
    activeBtn.classList.remove(
      "bg-black/5",
      "dark:bg-white/5",
      "hover:bg-black/5",
      "dark:hover:bg-white/10",
      "text-gray-500",
      "dark:text-gray-400",
      "border-transparent",
    );
    activeBtn.classList.add(
      "bg-primary/20",
      "text-primary-light",
      "border-primary/30",
    );
  }
  const labelEl = pomodoroLabel;
  if (labelEl) labelEl.textContent = label;
}

if (pomoToggleBtn) {
  pomoToggleBtn.addEventListener("click", function () {
    if (pomodoroRunning) stopPomodoro();
    else startPomodoro();
  });
}

if (pomoResetBtn) {
  pomoResetBtn.addEventListener("click", function () {
    if (pomodoroMode === "focus") setPomodoroMode("focus", 25);
    else if (pomodoroMode === "shortBreak") setPomodoroMode("shortBreak", 5);
    else setPomodoroMode("longBreak", 15);
  });
}

if (modeFocusBtn)
  modeFocusBtn.addEventListener("click", function () {
    setPomodoroMode("focus", 25);
  });
if (modeShortBtn)
  modeShortBtn.addEventListener("click", function () {
    setPomodoroMode("shortBreak", 5);
  });
if (modeLongBtn)
  modeLongBtn.addEventListener("click", function () {
    setPomodoroMode("longBreak", 15);
  });

updatePomodoroDisplay();

function fetchQuote() {
  const qText = quoteText;
  const qAuthor = quoteAuthor;
  if (!qText || !qAuthor) return;

  qText.textContent = '"Loading inspiration..."';
  qAuthor.textContent = "- -";

  fetch("https://dummyjson.com/quotes/random")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      qText.textContent = `"${data.quote}"`;
      qAuthor.textContent = `- ${data.author}`;
    })
    .catch(function () {
      qText.textContent = '"The secret of getting ahead is getting started."';
      qAuthor.textContent = "- Mark Twain";
    });
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", fetchQuote);
}
fetchQuote();

let weatherLoaded = false;

function fetchWeather() {
  if (!navigator.geolocation) {
    getWeatherByCoords(26.1445, 91.7362);
    return;
  }

  if (window.location.protocol === "file:") {
    getWeatherByCoords(26.1445, 91.7362);
    return;
  }
  const geoTimeout = setTimeout(function () {
    if (!weatherLoaded) {
      getWeatherByCoords(26.1445, 91.7362);
    }
  }, 10000);

  navigator.geolocation.getCurrentPosition(
    function (position) {
      clearTimeout(geoTimeout);
      getWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    function () {
      clearTimeout(geoTimeout);
      if (!weatherLoaded) getWeatherByCoords(26.1445, 91.7362);
    },
    { timeout: 10000, maximumAge: 10000 },
  );
}

function getWeatherByCoords(lat, lon) {
  if (weatherLoaded) return;
  weatherLoaded = true;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day`;

  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data.current) return;
      const temp = Math.round(data.current.temperature_2m);
      const weatherCode = data.current.weather_code;
      const humidity = data.current.relative_humidity_2m;
      const precip = data.current.precipitation;
      const wind = data.current.wind_speed_10m;

      let condition = "sunny";
      if (weatherCode === 0) condition = "sunny";
      else if ([1, 2].includes(weatherCode)) condition = "partlyCloudy";
      else if ([3].includes(weatherCode)) condition = "cloudy";
      else if ([45, 48].includes(weatherCode)) condition = "foggy";
      else if (
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(
          weatherCode,
        )
      )
        condition = "rainy";
      else if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
        condition = "snowy";
      else if ([95, 96, 99].includes(weatherCode)) condition = "thunderstorm";

      if (wind > 25 && [0, 1, 2, 3].includes(weatherCode)) condition = "windy";

      currentWeatherCondition = condition;

      const miniTemp = miniWeatherTemp;
      if (miniTemp) miniTemp.innerHTML = temp;

      const condText = weatherConditionText;
      if (condText) {
        const map = {
          sunny: "Sunny",
          partlyCloudy: "Partly Cloudy",
          cloudy: "Cloudy",
          rainy: "Rainy",
          thunderstorm: "Thunderstorm",
          windy: "Windy",
          foggy: "Foggy",
          snowy: "Snowy",
        };
        let label = map[currentWeatherCondition] || "Unknown";
        if (currentWeatherCondition === "sunny" && data.current.is_day === 0) {
          label = "Clear";
        }
        condText.textContent = label;
      }

      const precipEl = weatherPrecip;
      if (precipEl) precipEl.textContent = `${precip} mm`;

      const humEl = weatherHumidity;
      if (humEl) humEl.textContent = `${humidity}%`;

      const windEl = weatherWind;
      if (windEl) windEl.textContent = `${wind} km/h`;

      const iconContainer = weatherIconContainer;
      if (iconContainer) {
        let svg = "";
        if (currentWeatherCondition === "sunny") {
          if (data.current.is_day === 0) {
            svg = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
          } else {
            svg =
              '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
          }
        } else if (currentWeatherCondition === "cloudy")
          svg =
            '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53"/>';
        else if (currentWeatherCondition === "foggy")
          svg =
            '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53"/><path d="M4 22h16"/><path d="M4 18h16"/>';
        else if (currentWeatherCondition === "snowy")
          svg =
            '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53"/><circle cx="8" cy="21" r="1"/><circle cx="12" cy="21" r="1"/><circle cx="16" cy="21" r="1"/>';
        else
          svg =
            '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53"/><path d="M8 22v-3"/><path d="M12 22v-3"/><path d="M16 22v-3"/>';

        iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">${svg}</svg>`;
        iconContainer.classList.remove("hidden");
      }

      updateClock();
    })
    .catch(function (err) {
      console.error("Weather error:", err);
    });

  const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  fetch(geoUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const miniCity = miniWeatherCity;
      const city =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        "Unknown Location";
      if (miniCity) miniCity.textContent = city;
    })
    .catch(function () {
      const miniCity = miniWeatherCity;
      if (miniCity) miniCity.textContent = "Unavailable";
    });
}

fetchWeather();
