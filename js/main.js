// ------------Переменные------------
const form = document.getElementById("form");
const input = document.getElementById("input");
const tasksList = document.getElementById("tasks_list-block");
const taskCounter = document.getElementById("task_counter");
const completeCounter = document.getElementById("complete_counter");
const prev = document.querySelector(".tasks-list__prev");
const btnAll = document.getElementById("btn_all");
const btnComplete = document.getElementById("btn_complete");
const btnIncomplete = document.getElementById("btn_incomplete");

let arrTasks = [];

if (localStorage.getItem("tasks")) {
  arrTasks = JSON.parse(localStorage.getItem("tasks"));
  arrTasks.forEach((task) => renderTasks(task));
}
lookPrev();
function updateCounters() {
  taskCounter.textContent = `${arrTasks.length}`;
  if (
    Number(
      (completeCounter.textContent = `${
        arrTasks.filter((task) => task.done).length
      }`)
    ) === 0
  ) {
    completeCounter.textContent = `${0}`;
  } else {
    completeCounter.textContent = `${
      arrTasks.filter((task) => task.done).length
    } - ${arrTasks.length}`;
  }
}
updateCounters();
// ------------События------------

form.addEventListener("submit", addNewTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", completeTask);

btnAll.addEventListener("click", () => filterTasks("all"));
btnComplete.addEventListener("click", () => filterTasks("complete"));
btnIncomplete.addEventListener("click", () => filterTasks("incomplete"));

// ------------Функции------------

function addNewTask(event) {
  event.preventDefault();

  const taskText = input.value;

  if (taskText === "" || !taskText || taskText.length < 5) {
    return;
  }

  taskCounter.textContent = 0;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  arrTasks.push(newTask);
  renderTasks(newTask);
  lookPrev();
  saveToLocalStorage();
  updateCounters();
  input.focus();
  input.value = "";
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentElement = event.target.closest(".tasks-list__task");
    const id = Number(parentElement.id);

    const indexTaskFromArrTasks = arrTasks.findIndex((task) => task.id === id);

    arrTasks.splice(indexTaskFromArrTasks, 1);

    parentElement.remove();
    lookPrev();
    saveToLocalStorage();
    updateCounters();
  }
}

function completeTask(event) {
  if (event.target.dataset.action !== "complete") {
    return;
  }
  const parentElement = event.target.closest(".tasks-list__task");
  const span = event.target;
  const id = Number(parentElement.id);

  const task = arrTasks.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
    if (task.done) {
      parentElement.classList.add("active");
      span.classList.add("active");
    } else {
      parentElement.classList.remove("active");
      span.classList.remove("active");
    }
    lookPrev();
    saveToLocalStorage();
    updateCounters();
  }
}

function renderTasks(task) {
  const liClass = task.done ? "active" : "";
  const spanClass = task.done ? "active" : "";
  const taskElement = `
    <li class="tasks-list__task ${liClass}" id="${task.id}">
      <span class="tasks-list__check-task ${spanClass}" data-action="complete"></span>
      <p class="tasks-list__text">${task.text}</p>
      <img src="./img/Vector.png" alt="" class="tasks-list__delete" data-action="delete" />
    </li>
  `;
  tasksList.insertAdjacentHTML("beforeend", taskElement);
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function lookPrev() {
  if (arrTasks.length === 0) {
    prev.classList.remove("none");
  } else {
    prev.classList.add("none");
  }
}

function filterTasks(filter) {
  let filteredTasks;
  if (filter === "all") {
    filteredTasks = arrTasks;
  }
  if (filter === "complete") {
    filteredTasks = arrTasks.filter((task) => task.done);
  }
  if (filter === "incomplete") {
    filteredTasks = arrTasks.filter((task) => !task.done);
  }
  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(tasks) {
  tasksList.innerHTML = "";
  tasks.forEach((task) => renderTasks(task));
}
