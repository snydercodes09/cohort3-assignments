const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const category = document.querySelector("#category");

const taskContainer = document.querySelector("#task-container");

const total = document.querySelector("#total");
const completed = document.querySelector("#completed");
const pending = document.querySelector("#pending");

const search = document.querySelector("#search");
const clearAll = document.querySelector("#clear-all");

const themeBtn = document.querySelector("#theme-btn");
const completeIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
width="18"
height="18"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
viewBox="0 0 24 24">
  <path d="M20 6L9 17l-5-5"/>
</svg>
`;
const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
width="18"
height="18"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
viewBox="0 0 24 24">
  <path d="M12 20h9"/>
  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
</svg>
`;
const deleteIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
width="18"
height="18"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
viewBox="0 0 24 24">
  <polyline points="3 6 5 6 21 6"/>
  <path d="M19 6l-1 14H6L5 6"/>
  <path d="M10 11v6"/>
  <path d="M14 11v6"/>
  <path d="M9 6V4h6v2"/>
</svg>
`;

let taskId = 1;

console.log(taskInput.value);

console.log(taskInput.getAttribute("value"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskInput.value;

  if (title === "") {
    return;
  }

  const card = document.createElement("div");

  card.classList.add("task-card");

  card.setAttribute("data-id", taskId);
  card.setAttribute("data-status", "pending");
  card.setAttribute("data-category", category.value);

  const heading = document.createElement("h3");
  heading.textContent = title;

  const cat = document.createElement("p");
  cat.textContent = "Category: " + category.value;

  const status = document.createElement("p");
  status.textContent = "Status: Pending";

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML = completeIcon;

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = editIcon;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = deleteIcon;

  actions.append(editBtn);
  actions.append(completeBtn);
  actions.append(deleteBtn);

  card.append(heading);
  card.append(cat);
  card.append(status);
  card.append(actions);

  taskContainer.prepend(card);

  taskId++;

  form.reset();

  updateStats();
});

// EVENT DELEGATION

taskContainer.addEventListener("click", function (e) {
  const card = e.target.closest(".task-card");

  if (e.target.classList.contains("delete-btn")) {
    card.remove();

    updateStats();
  }

  if (e.target.classList.contains("complete-btn")) {
    card.classList.toggle("completed");

    if (card.dataset.status === "pending") {
      card.dataset.status = "completed";

      card.children[2].textContent = "Status: Completed";
    } else {
      card.dataset.status = "pending";

      card.children[2].textContent = "Status: Pending";
    }

    updateStats();
  }

  if (e.target.classList.contains("edit-btn")) {
    const newTask = prompt("Edit Task", card.children[0].textContent);

    if (newTask) {
      const newHeading = document.createElement("h3");

      newHeading.textContent = newTask;

      card.children[0].replaceWith(newHeading);
    }
  }
});

// SEARCH

search.addEventListener("input", function () {
  const cards = document.querySelectorAll(".task-card");

  cards.forEach(function (card) {
    const title = card.children[0].textContent.toLowerCase();

    if (title.includes(search.value.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// CLEAR ALL

clearAll.addEventListener("click", function () {
  taskContainer.innerHTML = "";

  updateStats();
});

// STATS

function updateStats() {
  const cards = document.querySelectorAll(".task-card");

  let completedCount = 0;

  cards.forEach(function (card) {
    if (card.dataset.status === "completed") {
      completedCount++;
    }
  });

  total.textContent = cards.length;
  completed.textContent = completedCount;
  pending.textContent = cards.length - completedCount;
}

// THEME

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.dataset.theme === "light") {
    document.body.dataset.theme = "dark";
  } else {
    document.body.dataset.theme = "light";
  }
});

// EVENT BUBBLING

const grandparent = document.querySelector("#grandparent");

const parent = document.querySelector("#parent");

const child = document.querySelector("#child");

grandparent.addEventListener("click", function () {
  console.log("Grandparent");
});

parent.addEventListener("click", function () {
  console.log("Parent");
});

child.addEventListener("click", function () {
  console.log("Child");
});

// EVENT CAPTURING

grandparent.addEventListener(
  "click",
  function () {
    console.log("Grandparent Capture");
  },
  true,
);

parent.addEventListener(
  "click",
  function () {
    console.log("Parent Capture");
  },
  true,
);

child.addEventListener(
  "click",
  function () {
    console.log("Child Capture");
  },
  true,
);
