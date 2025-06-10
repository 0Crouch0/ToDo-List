import { getElements } from "../getElements/getElements.js";

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
