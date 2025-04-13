const API = "https://easydev.club/api/v1/todos";

export async function fetchTasksApi(filter) {
  try {
    const response = await fetch(`${API}?filter=${filter}`);
    const resData = await response.json();
    return resData;
  } catch (error) {
    throw new Error("Не получилось загрузить список задач.");
  }
}

export async function addNewTaskApi(title) {
  try {
    const response = await fetch(API, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw new Error("Не получилось создать задачу.");
  }
}

export async function deleteTaskApi(id) {
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

export async function changeTaskStatusApi(id, status) {
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

export async function changeTaskTitleApi(id, title) {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error("Не получилось изменить задачу.");
  }
}
