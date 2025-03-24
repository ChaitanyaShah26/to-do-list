document.querySelector('#add-task-button').addEventListener('click', addTask);
document.querySelector('#add-task').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskText = document.querySelector('#add-task').value.trim();

    if (taskText) {
        let taskList = document.querySelector('#task-list');
        let taskElement = document.createElement('li');
        taskElement.className = 'task-element';

        taskElement.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="complete-button" title="Complete Task"><i class="fa-solid fa-check"></i></button>
            <button class="delete-button" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
        `;

        // Mark task as completed
        taskElement.querySelector('.complete-button').addEventListener('click', () => {
            taskElement.querySelector('.task-text').classList.toggle('completed');
            let icon = taskElement.querySelector('.complete-button i');
            icon.classList.toggle('fa-check');
            icon.classList.toggle('fa-undo');
            saveTasks(); // Save tasks to local storage after completion
        });

        // Delete task
        taskElement.querySelector('.delete-button').addEventListener('click', () => {
            taskList.removeChild(taskElement);
            saveTasks(); // Save tasks to local storage after deletion
        });

        taskList.appendChild(taskElement);
        document.querySelector('#add-task').value = '';
        saveTasks(); // Save tasks to local storage after adding
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.task-element').forEach((taskElement) => {
        let taskText = taskElement.querySelector('.task-text').innerText;
        let isCompleted = taskElement.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        let taskList = document.querySelector('#task-list');
        let taskElement = document.createElement('li');
        taskElement.className = 'task-element';

        taskElement.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="complete-button" title="Complete Task"><i class="fa-solid fa-check"></i></button>
            <button class="delete-button" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
        `;

        // Mark task as completed
        taskElement.querySelector('.complete-button').addEventListener('click', () => {
            taskElement.querySelector('.task-text').classList.toggle('completed');
            let icon = taskElement.querySelector('.complete-button i');
            icon.classList.toggle('fa-check');
            icon.classList.toggle('fa-undo');
            saveTasks(); // Save tasks to local storage after completion
        });

        // Delete task
        taskElement.querySelector('.delete-button').addEventListener('click', () => {
            taskList.removeChild(taskElement);
            saveTasks(); // Save tasks to local storage after deletion
        });

        taskList.appendChild(taskElement);
    });
}