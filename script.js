const addListBtn = document.getElementById("add_list_btn")
const lists = document.getElementById("lists");
const tasks = document.getElementById('tasks')
const app = document.getElementById('app')
const tasksHeader = document.getElementById('tasks_header').children[1]
const addTaskBtn = document.getElementById("add_task_btn")
const taskInput = document.getElementById("task_input")
const tasksContainer = document.getElementById("tasks_container");
const backBtn = document.getElementById('back_button')
const completedTasks = document.getElementById('hide_completed_div')

// Usar clases utilitarias en vez de in-line styles.


tasks.style = "display: none"

let listArr = [];

const attachRemoveToList = () => {
    for (let i = 0; i < lists.children.length; i++){
        console.log(lists.children[i])
        lists.children[i].children[1].addEventListener('click', (e) => {
            e.stopPropagation();
            e.target.parentElement.remove();
            listArr.splice(e.target.value, 1);
        })
    }
}

attachRemoveToList();

const displayList = () => {
    let listHtml = ``
    // const removeParent = (e) => e.target.parentElement.remove();
    for (let i = 0; i < listArr.length; i++) {
        listHtml += `<div class="list" id="${i}" value="${listArr[i].name}">
        <p class="list_name">${listArr[i].name}</p>
        <button type="button" id="remove_list_button">Remove</button>
        </div>`
        lists.innerHTML = listHtml;
    }
    attachShowListTasks();
    attachRemoveToList();
}


const attachShowListTasks = () => {
    let listTitleHtml = ``;
    for (let i = 0; i < lists.children.length; i++) {
        lists.children[i].addEventListener('click', (e) => {
            console.log(e.target.attributes)
            listName = e.target.attributes.value.value
            app.style = "display: none"
            tasks.style = "display: flex";
            listTitleHtml = `<p id=${listName}>${listName}</p>`
            tasksHeader.innerHTML = listTitleHtml
            displayTasks(listArr.find((e) => e.name === listName))
        })
    }
    
    console.log(lists.children)
    backBtnAddClickListener();
}


addListBtn.addEventListener('click', () => {
    let listName = prompt('Type a name for your new list.')
    listArr.push({
        name: listName,
        tasks: []
    })
    displayList();
})

addTaskBtn.addEventListener('click', () => {
    let taskName = taskInput.value;
    let currentList = listArr.find((e) => e.name === tasksHeader.innerText)
    console.log(currentList)
    currentList.tasks.push(
        {task: taskName,
         completed: false
        }
    );
    displayTasks(currentList);
})

const displayTasks = (list) => {
    taskHtmlTemplate = (isCompleted, id, task) => {return `<div style="${isCompleted ? "text-decoration: line-through" : ""}" class='task' id='${id}'>${task}
        <svg class="trash_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path style= "pointer-events: none;" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</div>`}
    let pendingTasksHtml = ``;
    let completedTasksHtml = ``
    for (let i = 0; i < list.tasks.length; i++) {
        if (list.tasks[i].completed) {
            completedTasksHtml += taskHtmlTemplate(list.tasks[i].completed, i, list.tasks[i].task)
        }
        else {
            pendingTasksHtml += taskHtmlTemplate(list.tasks[i].completed, i, list.tasks[i].task)
        } 
    }
    
    if (
        !completedTasksHtml
    ) {
        completedTasks.setAttribute("hidden", "true")
    } else {
        completedTasks.setAttribute("hidden", "false")
    }

    console.log(pendingTasksHtml)

    tasksContainer.children[0].innerHTML = pendingTasksHtml;
    tasksContainer.children[2].innerHTML = completedTasksHtml;
    appendCompleteTaskListener(tasksContainer.children[0].children)
    appendCompleteTaskListener(tasksContainer.children[2].children)
    appendRemoveTaskListener(tasksContainer.children[0].children)
    appendRemoveTaskListener(tasksContainer.children[2].children)
}

const appendCompleteTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.name === tasksHeader.innerText)
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].addEventListener('click', (e) => {
            console.log(e.target)
            let taskToComplete = currentList.tasks.find((element) => element.task === e.target.innerText)
            console.log(taskToComplete)
            taskToComplete.completed = !taskToComplete.completed;
            taskToComplete.completed ? e.target.style = "text-decoration: line-through" : e.target.style = "";
            displayTasks(currentList)
        }

    )
    }
}

const appendRemoveTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.name === tasksHeader.innerText)
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i].children[0])
        tasks[i].children[0].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(e.target.parentElement.parentElement)
            let taskToRemove = currentList.tasks.findIndex((element) => {
                element.name === e.target.parentElement.innerText;
            })
            currentList.tasks.splice(
                taskToRemove, 1
            )
            e.target.parentElement.remove()
        }

    )
    }
}


const backBtnAddClickListener = () => {
    backBtn.addEventListener('click', () => {
        app.style = "display: flex"
        tasks.style = "display: none";
    })
}