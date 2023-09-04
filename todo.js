function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("pendingTaskList"); // Default to pending tasks
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <input type="checkbox" onchange="completeTask(this)">
        <span>${taskText}</span>
        <div>Added: ${getCurrentDateTime()}</div>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = "";
}

function completeTask(checkbox) {
    const listItem = checkbox.parentElement;
    const pendingTaskList = document.getElementById("pendingTaskList");
    const completedTaskList = document.getElementById("completedTaskList");

    if (checkbox.checked) {
        const completedDateTime = getCurrentDateTime();
        const completedTimeDiv = document.createElement("div");
        completedTimeDiv.textContent = `Completed: ${completedDateTime}`;
        listItem.appendChild(completedTimeDiv);

        pendingTaskList.removeChild(listItem);
        completedTaskList.appendChild(listItem);
    } else {
        listItem.removeChild(listItem.lastElementChild); // Remove completed time
        completedTaskList.removeChild(listItem);
        pendingTaskList.appendChild(listItem);
    }
}

function editTask(button) {
    const listItem = button.parentElement;
    const taskText = listItem.querySelector("span");
    const updatedTaskText = prompt("Edit task:", taskText.textContent);

    if (updatedTaskText !== null) {
        taskText.textContent = updatedTaskText;
    }
}

function deleteTask(button) {
    const listItem = button.parentElement;
    const taskList = listItem.parentElement;
    taskList.removeChild(listItem);
}