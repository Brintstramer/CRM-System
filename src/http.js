const API = "https://easydev.club/api/v1/todos";

export async function fetchTasks(filter) {
  const response = await fetch(`${API}?filter=${filter}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Не получилось загрузить список задач.");
  }

  return resData;
}

export async function addNewTask(titleNewTask) {
  const response = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ title: titleNewTask }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не получилось создать задачу.");
  }

  return response;
}

export async function deleteTask(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не получилсь удалить задачу.");
  }

  return response;
}

export async function changeTaskStatus(id) {
  const task = await fetch(`${API}/${id}`);
  const taskData = await task.json();
  const status = taskData.isDone;

  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ isDone: !status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не получилось изменить статус задачи.");
  }

  return response;
}

export async function changeTaskTitle(id, title) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не получилось изменить задачу.");
  }

  return response;
}
