import { getElements } from "../getElements/getElements.js";
import { updateCounters } from "../updateCounters/updateCounters.js";
import { saveToLocalStorage } from "../localStorage/saveToLocalStorage.js";
import { lookPrev } from "../previev/lookPrev.js";

export function allEvents(addNewTask, eventTask, filterTasks, arrTasks) {
  getElements.form.addEventListener("submit", addNewTask);

  getElements.tasksList.addEventListener("click", eventTask);

  getElements.btnAll.addEventListener("click", () =>
    filterTasks("all", arrTasks)
  );
  getElements.btnComplete.addEventListener("click", () =>
    filterTasks("complete", arrTasks)
  );
  getElements.btnIncomplete.addEventListener("click", () =>
    filterTasks("incomplete", arrTasks)
  );
}

export function addNewTask(event, arrTasks) {
  event.preventDefault();

  const taskText = getElements.input.value.trim();

  if (taskText === "" || !taskText || taskText.length < 5) {
    return;
  }

  getElements.taskCounter.textContent = 0;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  arrTasks.push(newTask);
  renderTasks(newTask);
  lookPrev(arrTasks);
  saveToLocalStorage(arrTasks);
  updateCounters(arrTasks);
  getElements.input.focus();
  getElements.input.value = "";
}

export function eventTask(event, arrTasks) {
  if (event.target.dataset.action === "delete") {
    const parentElement = event.target.closest(".tasks-list__task");
    const id = Number(parentElement.id);

    const indexTaskFromArrTasks = arrTasks.findIndex((task) => task.id === id);

    arrTasks.splice(indexTaskFromArrTasks, 1);

    parentElement.remove();
    lookPrev(arrTasks);
    saveToLocalStorage(arrTasks);
    updateCounters(arrTasks);
  }
  if (event.target.dataset.action === "complete") {
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
      lookPrev(arrTasks);
      saveToLocalStorage(arrTasks);
      updateCounters(arrTasks);
    }
  }
}

export function filterTasks(filter, arrTasks) {
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
  getElements.tasksList.innerHTML = "";
  filteredTasks.forEach((task) => renderTasks(task));
}

export function renderTasks(task) {
  const liClass = task.done ? "active" : "";
  const spanClass = task.done ? "active" : "";
  const taskElement = `
    <li class="tasks-list__task ${liClass}" id="${task.id}">
      <span class="tasks-list__check-task ${spanClass}" data-action="complete"></span>
      <p class="tasks-list__text">${task.text}</p>
      <img src="./img/Vector.png" alt="" class="tasks-list__delete" data-action="delete" />
    </li>
  `;
  getElements.tasksList.insertAdjacentHTML("beforeend", taskElement);
}
