export let arrTasks = [];

export function loadFromLocalStorage() {
  try {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      arrTasks = JSON.parse(storedTasks);
      return arrTasks;
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных из localStorage:", error);
  }
  return [];
}

export function saveToLocalStorage() {
  try {
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
  } catch (error) {
    console.error("Ошибка при сохранении данных в localStorage:", error);
  }
}
