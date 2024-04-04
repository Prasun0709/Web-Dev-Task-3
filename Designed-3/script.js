document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span class="task-text">${task}</span>
                <div class="task-actions">
                    <button class="edit-task-btn">Edit</button>
                    <button class="delete-task-btn" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
        saveTasks();
    }

    // Function to add a new task
    function addTask(taskText) {
        tasks.push(taskText);
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for adding a new task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Event delegation for deleting a task
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-task-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        }
    });

    // Render initial tasks
    renderTasks();
});
