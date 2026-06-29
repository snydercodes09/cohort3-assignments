let transactions = [];
let currentUser = null;
let currentChart = null;

let currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
};

const settingDarkmode = document.querySelector("#setting-darkmode");
const settingName = document.querySelector("#setting-name");
const settingCurrency = document.querySelector("#setting-currency");
const displayUserName = document.querySelector("#display-user-name");
const navDashboard = document.querySelector("#nav-dashboard");
const navSettings = document.querySelector("#nav-settings");
const goToRegister = document.querySelector("#go-to-register");
const goToLogin = document.querySelector("#go-to-login");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const transactionForm = document.querySelector("#transaction-form");
const btnLogout = document.querySelector("#btn-logout");
const btnSaveSettings = document.querySelector("#btn-save-settings");
const btnResetData = document.querySelector("#btn-reset-data");
const btnAddTransaction = document.querySelector("#btn-add-transaction");
const btnAddTransactionMobile = document.querySelector("#btn-add-transaction-mobile");
const btnCloseModal = document.querySelector("#btn-close-modal");
const transactionModal = document.querySelector("#transaction-modal");
const transactionFilter = document.querySelector("#transaction-filter");
const loginView = document.querySelector("#login-view");
const registerView = document.querySelector("#register-view");
const appView = document.querySelector("#app-view");
const dashboardSection = document.querySelector("#dashboard-section");
const settingsSection = document.querySelector("#settings-section");
const registerUsername = document.querySelector("#register-username");
const registerPassword = document.querySelector("#register-password");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const txId = document.querySelector("#tx-id");
const txType = document.querySelector("#tx-type");
const txDescription = document.querySelector("#tx-description");
const txAmount = document.querySelector("#tx-amount");
const txDate = document.querySelector("#tx-date");
const txCategory = document.querySelector("#tx-category");
const modalTitle = document.querySelector("#modal-title");
const currentBalance = document.querySelector("#current-balance");
const totalIncome = document.querySelector("#total-income");
const totalExpense = document.querySelector("#total-expense");
const totalTransactions = document.querySelector("#total-transactions");
const transactionList = document.querySelector("#transaction-list");
const noTransactionsMsg = document.querySelector("#no-transactions-msg");
const cashFlowChart = document.querySelector("#cashFlowChart");
const allNavLinks = document.querySelectorAll(".nav-link");

const activeNavClasses = [
  "active",
  "bg-blue-50",
  "text-blue-500",
  "dark:bg-blue-500/10",
  "dark:text-blue-400",
];
const inactiveNavClasses = [
  "text-gray-500",
  "dark:text-gray-400",
];

document.addEventListener("DOMContentLoaded", function () {
  initApp();
  setupEventListeners();
});

function initApp() {
  let savedUser = localStorage.getItem("fintrack_user");

  if (savedUser) {
    currentUser = JSON.parse(savedUser);

    if (currentUser.darkMode) {
      document.documentElement.classList.add("dark");
      settingDarkmode.checked = true;
    } else {
      document.documentElement.classList.remove("dark");
      settingDarkmode.checked = false;
    }

    settingName.value = currentUser.name || currentUser.username;
    settingCurrency.value = currentUser.currency || "USD";
    displayUserName.textContent = currentUser.name || currentUser.username;

    loadTransactions();
    showView("app-view");
    masterRefresh();
  } else {
    showView("login-view");
  }
}

function setupEventListeners() {
  navDashboard.addEventListener("click", function (e) {
    e.preventDefault();
    switchSection("dashboard-section");
  });

  navSettings.addEventListener("click", function (e) {
    e.preventDefault();
    switchSection("settings-section");
  });

  goToRegister.addEventListener("click", function (e) {
    e.preventDefault();
    showView("register-view");
  });

  goToLogin.addEventListener("click", function (e) {
    e.preventDefault();
    showView("login-view");
  });

  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  transactionForm.addEventListener("submit", handleSaveTransaction);

  btnLogout.addEventListener("click", handleLogout);
  btnSaveSettings.addEventListener("click", saveSettings);
  settingDarkmode.addEventListener("change", toggleDarkMode);
  btnResetData.addEventListener("click", resetAllData);

  btnAddTransaction.addEventListener("click", openAddModal);
  if (btnAddTransactionMobile) btnAddTransactionMobile.addEventListener("click", openAddModal);
  btnCloseModal.addEventListener("click", closeModal);

  window.addEventListener("click", function (e) {
    if (e.target === transactionModal) {
      closeModal();
    }
  });

  transactionFilter.addEventListener("change", masterRefresh);
}

function showView(viewId) {
  loginView.style.display = "none";
  registerView.style.display = "none";
  appView.style.display = "none";
  document.querySelector(`#${viewId}`).style.display = "flex";
}

function switchSection(sectionId) {
  dashboardSection.style.display = "none";
  settingsSection.style.display = "none";
  document.querySelector(`#${sectionId}`).style.display = "block";

  allNavLinks.forEach(function (link) {
    link.classList.remove(...activeNavClasses);
    link.classList.add(...inactiveNavClasses);
  });

  if (sectionId === "dashboard-section") {
    navDashboard.classList.remove(...inactiveNavClasses);
    navDashboard.classList.add(...activeNavClasses);
    masterRefresh();
  } else {
    navSettings.classList.remove(...inactiveNavClasses);
    navSettings.classList.add(...activeNavClasses);
  }
}

function handleRegister(e) {
  e.preventDefault();
  let username = registerUsername.value.trim();
  let password = registerPassword.value.trim();

  if (username === "" || password === "") {
    alert("Please fill in all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("fintrack_accounts")) || {};

  if (users[username]) {
    alert("Username already exists!");
    return;
  }

  users[username] = {
    username: username,
    password: password,
    name: username,
    currency: "USD",
    darkMode: false,
    transactions: [],
  };

  localStorage.setItem("fintrack_accounts", JSON.stringify(users));
  alert("Registration successful! You can now log in.");
  showView("login-view");
}

function handleLogin(e) {
  e.preventDefault();
  let username = loginUsername.value.trim();
  let password = loginPassword.value.trim();

  let users = JSON.parse(localStorage.getItem("fintrack_accounts")) || {};

  if (users[username] && users[username].password === password) {
    currentUser = users[username];
    localStorage.setItem("fintrack_user", JSON.stringify(currentUser));
    initApp();
  } else {
    alert("Invalid username or password");
  }
}

function handleLogout() {
  localStorage.removeItem("fintrack_user");
  currentUser = null;
  transactions = [];
  loginForm.reset();
  showView("login-view");
}

function loadTransactions() {
  let users = JSON.parse(localStorage.getItem("fintrack_accounts")) || {};
  if (users[currentUser.username]) {
    transactions = users[currentUser.username].transactions || [];
  }
}

function saveTransactions() {
  let users = JSON.parse(localStorage.getItem("fintrack_accounts")) || {};
  users[currentUser.username].transactions = transactions;
  localStorage.setItem("fintrack_accounts", JSON.stringify(users));
}

function openAddModal() {
  transactionForm.reset();
  txId.value = "";
  modalTitle.textContent = "Add Transaction";
  transactionModal.classList.remove("hidden");
  transactionModal.classList.add("flex");
}

function openEditModal(id) {
  let tx = transactions.find(function (t) {
    return t.id === id;
  });

  if (!tx) return;

  txId.value = tx.id;
  txType.value = tx.type;
  txDescription.value = tx.description;
  txAmount.value = tx.amount;
  txDate.value = tx.date;
  txCategory.value = tx.category;
  modalTitle.textContent = "Edit Transaction";
  transactionModal.classList.remove("hidden");
  transactionModal.classList.add("flex");
}

function closeModal() {
  transactionModal.classList.remove("flex");
  transactionModal.classList.add("hidden");
}

function masterRefresh() {
  updateSummaryCards();
  renderTable();
  renderChart();
}

function handleSaveTransaction(e) {
  e.preventDefault();

  let id = txId.value;
  let type = txType.value;
  let description = txDescription.value.trim();
  let amount = parseFloat(txAmount.value);
  let date = txDate.value;
  let category = txCategory.value;

  if (id !== "") {
    let tx = transactions.find(function (t) {
      return t.id === id;
    });

    if (tx) {
      tx.type = type;
      tx.description = description;
      tx.amount = amount;
      tx.date = date;
      tx.category = category;
    }
  } else {
    let newTransaction = {
      id: Date.now().toString(),
      type: type,
      description: description,
      amount: amount,
      date: date,
      category: category,
    };
    transactions.push(newTransaction);
  }

  saveTransactions();
  closeModal();
  masterRefresh();
}

function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    transactions = transactions.filter(function (t) {
      return t.id !== id;
    });
    saveTransactions();
    masterRefresh();
  }
}

function formatCurrency(amount) {
  let symbol = currencySymbols[currentUser.currency] || "$";
  return symbol + parseFloat(amount).toFixed(2);
}

function updateSummaryCards() {
  let income = 0;
  let expense = 0;

  transactions.forEach(function (tx) {
    if (tx.type === "income") {
      income += tx.amount;
    } else if (tx.type === "expense") {
      expense += tx.amount;
    }
  });

  let balance = income - expense;

  currentBalance.textContent = formatCurrency(balance);
  totalIncome.textContent = formatCurrency(income);
  totalExpense.textContent = formatCurrency(expense);
  totalTransactions.textContent = transactions.length;
}

function renderTable() {
  let tbody = transactionList;
  let filter = transactionFilter.value;
  let noMsg = noTransactionsMsg;

  tbody.innerHTML = "";

  let filtered = transactions.filter(function (tx) {
    return filter === "all" || tx.type === filter;
  });

  filtered.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return 0;
    }
  });

  if (filtered.length === 0) {
    noMsg.style.display = "block";
  } else {
    noMsg.style.display = "none";

    let fragment = document.createDocumentFragment();

    filtered.forEach(function (tx) {
      let tr = document.createElement("tr");

      let amountClass = "";
      let sign = "";
      if (tx.type === "income") {
        amountClass = "text-emerald-500";
        sign = "+";
      } else {
        amountClass = "text-red-500";
        sign = "-";
      }

      tr.innerHTML = `
        <td class="border-b border-gray-200 px-4 py-3 text-sm dark:border-gray-700">${tx.date}</td>
        <td class="border-b border-gray-200 px-4 py-3 text-sm dark:border-gray-700"><strong>${tx.description}</strong></td>
        <td class="border-b border-gray-200 px-4 py-3 text-sm dark:border-gray-700">${tx.category}</td>
        <td class="border-b border-gray-200 px-4 py-3 text-sm font-bold dark:border-gray-700 ${amountClass}">${sign}${formatCurrency(tx.amount)}</td>
        <td class="border-b border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
          <button class="action-btn action-edit mr-2 cursor-pointer border-0 bg-transparent p-1 text-base text-blue-500" onclick="openEditModal('${tx.id}')" title="Edit"><i class="ri-pencil-line text-lg"></i></button>
          <button class="action-btn action-delete mr-2 cursor-pointer border-0 bg-transparent p-1 text-base text-red-500" onclick="deleteTransaction('${tx.id}')" title="Delete"><i class="ri-delete-bin-line text-lg"></i></button>
        </td>
      `;

      fragment.append(tr);
    });

    tbody.append(fragment);
  }
}

function renderChart() {
  let ctx = cashFlowChart.getContext("2d");

  if (currentChart) {
    currentChart.destroy();
  }

  let dates = [];
  let incomeByDate = {};
  let expenseByDate = {};

  let sorted = [...transactions];

  sorted.sort(function (a, b) {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  });

  sorted.forEach(function (tx) {
    let d = tx.date;

    if (!incomeByDate[d]) {
      incomeByDate[d] = 0;
      expenseByDate[d] = 0;
      dates.push(d);
    }

    if (tx.type === "income") {
      incomeByDate[d] += tx.amount;
    } else {
      expenseByDate[d] += tx.amount;
    }
  });

  let incomeData = dates.map(function (date) {
    return incomeByDate[date];
  });

  let expenseData = dates.map(function (date) {
    return expenseByDate[date];
  });

  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "#10b981",
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "#ef4444",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function toggleDarkMode(e) {
  let isDark = e.target.checked;

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (currentUser) {
    currentUser.darkMode = isDark;
    saveUserSession();
  }
}

function saveSettings() {
  let name = settingName.value.trim();
  let currency = settingCurrency.value;

  if (name !== "") {
    currentUser.name = name;
  }
  currentUser.currency = currency;

  saveUserSession();
  displayUserName.textContent = currentUser.name;
  masterRefresh();
  alert("Settings saved successfully!");
}

function saveUserSession() {
  localStorage.setItem("fintrack_user", JSON.stringify(currentUser));

  let users = JSON.parse(localStorage.getItem("fintrack_accounts")) || {};
  users[currentUser.username].name = currentUser.name;
  users[currentUser.username].currency = currentUser.currency;
  users[currentUser.username].darkMode = currentUser.darkMode;
  localStorage.setItem("fintrack_accounts", JSON.stringify(users));
}

function resetAllData() {
  if (
    confirm(
      "WARNING: This will delete all your transaction data permanently! Are you sure?",
    )
  ) {
    transactions = [];
    saveTransactions();
    masterRefresh();
    alert("All transactions have been deleted.");
  }
}
