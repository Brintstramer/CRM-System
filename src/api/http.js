const API = "https://easydev.club/api/v1/todos";

export async function fetchTasks(filter) {
  try {
    const response = await fetch(`${API}?filter=${filter}`);
    const resData = await response.json();
    return resData;
  } catch (error) {
    throw new Error("Не получилось загрузить список задач.");
  }
}

export async function addNewTask(title) {
  try {
    await fetch(API, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Не получилось создать задачу.");
  }
}

export async function deleteTask(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Не получилсь удалить задачу.");
  }
}

export async function changeTaskStatus(id, status) {
  try {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: !status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Не получилось изменить статус задачи.");
  }
}

export async function changeTaskTitle(id, title) {
  try {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Не получилось изменить задачу.");
  }
}
