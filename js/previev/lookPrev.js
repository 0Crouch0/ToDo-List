import { getElements } from "../getElements/getElements.js";
import { arrTasks } from "../localStorage/saveToLocalStorage.js";

export function lookPrev(arrTasks) {
  const hasNoTasks = arrTasks.length === 0;

  if (hasNoTasks) {
    getElements.prev.classList.remove("none");
  } else {
    getElements.prev.classList.add("none");
  }
}
