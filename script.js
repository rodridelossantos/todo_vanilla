const addListBtn = document.getElementById("add_list_btn")
const lists = document.getElementById("lists");
const tasks = document.getElementById('tasks')
const app = document.getElementById('app')
const tasksHeader = document.getElementById('tasks_header')
const addTaskBtn = document.getElementById("add_task_btn")
const taskInput = document.getElementById("task_input")
const tasksContainer = document.getElementById("tasks_container")

tasks.style = "display: none"

let listArr = [];

const displayList = () => {
    let listHtml = ``
    for (let i = 0; i < listArr.length; i++) {
        listHtml += `<div class="list" id="${i}" value="${listArr[i].name}">${listArr[i].name}</div>`
        lists.innerHTML = listHtml;
    }
    attachShowListTasks();
}

const attachRemoveToList = () => {
    for (let i = 0; i < lists.children.length; i++){
        lists.children[i].addEventListener('click', (e) => {
            e.target.remove();
            listArr.splice(e.target.value, 1);
        })
    }
}

const attachShowListTasks = () => {
    for (let i = 0; i < lists.children.length; i++) {
        lists.children[i].addEventListener('click', (e) => {
            app.style = "display: none"
            tasks.style = "display: flex";
            let listTitle = document.createElement('p');
            console.log(e.target)
            listTitle.innerText = e.target.attributes.value.value
            tasksHeader.id = e.target.attributes.value.value
            tasksHeader.appendChild(listTitle)
        })
    }
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
    let currentList = listArr.find((e) => e.name === tasksHeader.id)
    console.log(currentList)
    currentList.tasks.push(
        {task: taskName,
         completed: false
        }
    );
    displayTasks(currentList);
})

const displayTasks = (list) => {
    let tasksHtml = ``;
    for (let i = 0; i < list.tasks.length; i++) {
        tasksHtml += `<div class='task' id='${i}'>${list.tasks[i].task}</div>`
    }
    console.log(tasksHtml)
    tasksContainer.innerHTML = tasksHtml;
}