const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category-select');
    const deadlineInput = document.getElementById('deadline-input');
    const prioritySelect = document.getElementById('priority-select');
    const labelInput = document.getElementById('label-input');

    const task = {
        id: Date.now(),
        title: taskInput.value,
        category: categorySelect.value,
        deadline: deadlineInput.value,
        priority: prioritySelect.value,
        label: labelInput.value,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        if (!task.completed) {
            const taskHTML = `
                <li class="task" data-id="${task.id}">
                    <span>${task.title}</span>
                    <span class="task-label">${task.label}</span>
                    <span class="task-priority">${task.priority}</span>
                    <span class="task-deadline">${task.deadline}</span>
                    <button class="complete-btn" data-id="${task.id}">Complete</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </li>
            `;
            taskList.innerHTML += taskHTML;
        }
    });
}

taskList.addEventListener('click', (e) => {
    const taskId = e.target.dataset.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (e.target.classList.contains('complete-btn')) {
        tasks[taskIndex].completed = true;
        renderTasks();
        alert(`Task "${tasks[taskIndex].title}" has been completed and hidden!`);
    } else if (e.target.classList.contains('delete-btn')) {
        tasks.splice(taskIndex, 1);
        renderTasks();
        alert(`Task deleted!`);
    }
});

renderTasks();
