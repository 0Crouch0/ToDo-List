import { getElements } from "../getElements/getElements.js";

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
