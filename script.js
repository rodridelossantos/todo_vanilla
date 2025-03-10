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

let emtpyCircle = `
<svg class="empty_circle" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1" class="w-6 h-6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg> 
`
let checkedCircle = `<svg class="checked_circle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>`
let trashIcon = `<svg class="trash_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="size-6">
<path style= "pointer-events: none;" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>`


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
        listHtml += `<div class="list" id="${i}" value="${listArr[i].fullName}">
        <p class="list_name">${listArr[i].fullName}</p>
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
            listTitleHtml = `<p id=${listName}>${listName}</p>
            <p class="item_amount">${lists.children.length} ${lists.children.length === 1 ? "item" : "items"}</p>
            `
            tasksHeader.innerHTML = listTitleHtml
            displayTasks(listArr.find((e) => e.fullName === listName))
        })
    }
    
    // console.log(lists.children)
    backBtnAddClickListener();
}

const listNameGen = (element, arr, property) => {
    let name = element
    let existingNames = arr.map(item => item[property]);
    let newName = name;

    console.log(existingNames)

    if (existingNames.includes(name)) {
        let i = 1;
        while (existingNames.includes(`${name} (${i})`)){
        i++;
        }
        newName = `${name} (${i})`
    }

    return newName;

}

addListBtn.addEventListener('click', () => {
    // let listName = listIsDuplicate(prompt('Type a name for your new list.'));
    let listName = listNameGen(prompt('Type a name for your new list'), listArr, "fullName")
    listArr.push({
        fullName: listName,
        tasks: [],
    })
    displayList();
})

addTaskBtn.addEventListener('click', () => {
    let taskName = taskInput.value;
    let currentList = listArr.find((e) => e.fullName === tasksHeader.children[0].innerText)
    // console.log(currentList)
    currentList.tasks.push(
        {task: taskName,
         completed: false,
         key: uniqueKeyGenerator(),
        }
    );
    displayTasks(currentList);
})

const taskHtmlTemplate = (isCompleted, id, task, key) => {
    return `<div style="${isCompleted ? "text-decoration: line-through" : ""}" class='task' key='${key}' id='${id}'>
    <div class="task_name_container">
    <div id="icon-${id}" class="task_icon">
    ${isCompleted ? checkedCircle : emtpyCircle}
    </div>
    ${task}
    </div>
    ${trashIcon}
</div>`
}

const displayTasks = (list) => {
    let pendingTasksHtml = ``;
    let completedTasksHtml = ``;
    for (let i = 0; i < list.tasks.length; i++) {
        if (list.tasks[i].completed) {
            completedTasksHtml += taskHtmlTemplate(list.tasks[i].completed, i, list.tasks[i].task, list.tasks[i].key)
        }
        else {
            pendingTasksHtml += taskHtmlTemplate(list.tasks[i].completed, i, list.tasks[i].task, list.tasks[i].key)
        } 
    }

    // if (
    //     !completedTasksHtml
    // ) {
    //     completedTasks.setAttribute("hidden", "true")
    // } else {
    //     completedTasks.setAttribute("hidden", "false")
    // }

    // console.log(pendingTasksHtml)
    tasksContainer.children[0].innerHTML = pendingTasksHtml;
    tasksContainer.children[2].innerHTML = completedTasksHtml;
    appendCompleteTaskListener(tasksContainer.children[0].children)
    appendCompleteTaskListener(tasksContainer.children[2].children)
    appendRemoveTaskListener(tasksContainer.children[0].children)
    appendRemoveTaskListener(tasksContainer.children[2].children)
}

const uniqueKeyGenerator = () =>{
    return `task- ${Date.now()} - ${Math.floor(Math.random() * 1000)}`
}

const appendCompleteTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.fullName === tasksHeader.innerText)
    for (let i = 0; i < tasks.length; i++) {
        console.log("this is: ", tasks[i].children[0].children[0])
        tasks[i].children[0].children[0].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("hello", e.target)
            console.log("element to complete is", e.target.parentElement.parentElement)
            let taskToComplete = currentList.tasks.find((element) => element.key === e.target.parentElement.parentElement.attributes.key.value)
            console.log(taskToComplete)
            taskToComplete.completed = !taskToComplete.completed;
            taskToComplete.completed ? e.target.parentElement.parentElement.style = "text-decoration: line-through" : e.target.parentElement.parentElement.style = "";
            displayTasks(currentList)
        }
    )
    }
}

const appendRemoveTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.fullName === tasksHeader.innerText)
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].children[1].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(e.target.parentElement.parentElement)
            let taskToRemove = currentList.tasks.findIndex((element) => {
                element.key === e.target.parentElement.attributes.key.value;
            })
            currentList.tasks.splice(
                taskToRemove, 1
            )
            e.target.parentElement.remove()
            displayTasks(currentList);
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