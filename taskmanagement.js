//Buttons
const addButton = document.getElementById('add-task-btn');
const sortButton = document.getElementById('sort-priority-btn');

let currentDate = new Date().toISOString().split('T')[0];
let currentTime = new Date().toISOString().split("T")[1].split(".")[0]; 
document.getElementById('task-date').min = `${currentDate}T${currentTime}`;

//Add button event
addButton.addEventListener('click', () => addTask());

//Sort button event
sortButton.addEventListener('click', () => sortByPriority());

//Logic to add new task
const addTask = () => {
    //Fetching value from input fields 
    const taskInput = document.getElementById('task-input').value;
    const priority = document.getElementById('set-priority').value;
    const taskDate = document.getElementById('task-date').value;

    //Checking whether task is not empty
    if (taskInput.trim() !== '') {
        //Adding the task in the list
        const taskList = document.getElementById('task-list-container');
        let priorityRank = '';
        if (priority == 'none') {
            alert('please set the priority');
            return;
        }
        else if (priority == 1) {
            priorityRank = 'High';
        }
        else if (priority == 2) {
            priorityRank = 'Medium';
        }
        else if (priority == 3) {
            priorityRank = 'Low';
        }
        //Alert for task date
        if(!taskDate){
            alert('Please select the date');
            return;
        }
        //Creating list item for tasks
        const li = document.createElement('li');
        li.innerHTML = `
                <div class="checkbox">
                    <input type="checkbox" onchange="changeCheckbox(this)" />
                </div>
                <div class="task-text">${taskInput}</div>
                <div class="priority" id=${priority}>${priorityRank}</div>
                <div class="task-date">${taskDate}</div>
                <div class="actions">
                    <div class="edit">
                        <span class="material-symbols-outlined" onclick="editTask(this)">
                            edit
                        </span>
                    </div>
                    <div class="delete">
                        <span class="material-symbols-outlined" onclick="deleteTask(this)">
                            delete
                        </span>
                    </div>
                </div>
        `;

        taskList.appendChild(li);

        //Setting value to null
        document.getElementById('task-input').value = '';
        document.getElementById('set-priority').value = 'none';
        document.getElementById('task-date').value = '';

        //Setting reminder
        if (taskDate !== '') {
            const now = new Date();
            const taskDateObject = new Date(taskDate);
            if (taskDateObject > now) {
                const timeDifference = taskDateObject - now;
                setTimeout(() => {
                    alert(`Reminder: ${taskInput} is due now!`);
                }, timeDifference);
            }
        }

        saveTask();
    }
}

//Chaninging class name value for checkbox
const changeCheckbox = (checkbox) => {
    const taskText = checkbox.parentElement.nextElementSibling; // Get the task text element

    if (checkbox.checked) {
        taskText.classList.add('completed');
    } else {
        taskText.classList.remove('completed');
    }
    saveTask();
}

//Sorting the task based on priority
const sortByPriority = () => {
    const allTasks = [...document.querySelectorAll('#task-list-container li')];
    if (allTasks.length == 0) {
        return;
    }

    allTasks.sort((a, b) => {
        return a.childNodes[5].id - b.childNodes[5].id;
    });

    const taskList = document.getElementById('task-list-container');
    taskList.innerHTML = '';

    //List with sorted tasks
    allTasks.forEach((task) => {
        return taskList.appendChild(task);
    })
}

//Applying filter to the task
const filterTask = (taskStatus) => {
    const allTasks = [...document.querySelectorAll('#task-list-container li')];

    allTasks.forEach((task) => {
        const checkbox = task.querySelector('.checkbox input');
        const completedTask = checkbox.checked;
        if ((taskStatus == 'all') || (taskStatus == 'completed' && completedTask) || (taskStatus == 'pending' && !completedTask)) {
            task.style.display = 'flex'
        }
        else {
            task.style.display = 'none'
        }
    })
}


//Deleting the task
const deleteTask = (task) => {
    const li = task.parentElement.parentElement.parentElement;
    li.remove();
    saveTask();
}


//Editing the task
const editTask = (task) => {
    const closeModalButton = document.getElementById("close-modal");
    const modal = document.getElementById("modal");
    const saveEditedTaskButton = document.getElementById('save-edited-task');

    modal.style.display = "block";
    const li = task.parentElement.parentElement.parentElement;

    document.getElementById('edit-task-input').value = li.children[1].innerText;


    saveEditedTaskButton.addEventListener('click', () => {
        li.children[1].innerText = document.getElementById('edit-task-input').value;
        saveTask();
    })
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    //Close modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

}


//Function to save the task 
const saveTask = () => {
    const allTasks = [...document.querySelectorAll('#task-list-container li')];
}

//Displaying tasks on screen
function displayTask() {
    const taskList = [];

    taskList.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
                <div class="checkbox">
                    <input type="checkbox" onchange="changeCheckbox(this)" ${task.isCompleted ? "checked" : ''} />
                </div>
                <div class="task-text ${task.isCompleted ? "completed" : ''}">${task.taskText}</div>
                <div class="priority" id=${task.priority}>${task.taskPriority}</div>
                <div class="task-date">${task.taskDate}</div>
                <div class="actions">
                    <div class="edit">
                        <span class="material-symbols-outlined" onclick="editTask(this)">
                            edit
                        </span>
                    </div>
                    <div class="delete">
                        <span class="material-symbols-outlined" onclick="deleteTask(this)">
                            delete
                        </span>
                    </div>
                </div>
        `;
        taskList.appendChild(li);
    })
}

displayTask();