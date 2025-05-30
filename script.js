const addListBtn = document.getElementById("add_list_btn")
const lists = document.getElementById("lists");
const tasks = document.getElementById('tasks')
const app = document.getElementById('app')
const tasksHeader = document.getElementById('tasks_header').children[1]
const addTaskBtn = document.getElementById("add_task_btn")
const taskInput = document.getElementById("task_input")
const tasksContainer = document.getElementById("tasks_container");
const backBtn = document.getElementById('back_button')
const hideCompletedDiv = document.getElementById('hide_completed_div');
const chevron = document.getElementById('chevron')
const completedTasksDiv = document.getElementById('completed_tasks_div')
const darkModeDiv = document.getElementById('dark_mode_div')

const emtpyCircle = `
<svg class="empty_circle" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1" class="w-6 h-6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg> 
`
const checkedCircle = `<svg xmlns="http://www.w3.org/2000/svg" class="checked_circle" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>`
const trashIcon = `<svg class="trash_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="size-6">
<path style= "pointer-events: none;" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>`

const ellipsesSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ellipses">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>
`
const moonSvg = `<svg class="moon_svg" id="moon_svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
`
const sunSvg = `<svg class="sun_svg" id="sun_svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
`


if (!localStorage.getItem("dark-theme")){ 
localStorage.setItem("dark-theme", "true")
}

const setTheme = () => {
    let isDark = JSON.parse(localStorage.getItem("dark-theme"));
    if (isDark) {
        document.body.classList.add("dark_mode")
        darkModeDiv.innerHTML = moonSvg;
    }
    else {
        document.body.classList.remove('dark_mode')
        darkModeDiv.innerHTML = sunSvg;
    }
}
setTheme();

darkModeDiv.addEventListener('click', () => {
    let isDark = JSON.parse(localStorage.getItem("dark-theme"))
    localStorage.setItem("dark-theme", isDark ? "false" : "true");
    setTheme()
})

tasks.classList.add("hidden")

let listArr;

if (!listArr) {
    listArr = []
}


if (!localStorage.listArr) {
    localStorage.setItem("listArr", "[]")
} else{
     listArr = JSON.parse(localStorage.listArr)
}

const attachRemoveToList = () => {
    for (let i = 0; i < lists.children.length; i++){
        console.log(lists.children[i])
        lists.children[i].children[1].addEventListener('click', (e) => {
            e.stopPropagation();
            let listToRemove = listArr.findIndex((element) => {
                return element.fullName === e.target.parentElement.attributes.value.value;
            })
            console.log("the element to remove is:", e.target.parentElement)
            console.log("the element's value is:", e.target.parentElement.attributes.value.value)
            console.log("the element in the list is:", listToRemove)
            listArr.splice(listToRemove, 1);
            e.target.parentElement.remove();
            console.log(e.target.parentElement, "removed")
            localStorage.listArr = JSON.stringify(listArr);
        })
    }
}
const backBtnAddClickListener = () => {
    backBtn.addEventListener('click', () => {
        app.classList.remove("hidden");
        tasks.classList.add("hidden");
    })
}

const attachShowListTasks = () => {
    let listTitleHtml = ``;
    for (let i = 0; i < lists.children.length; i++) {
        lists.children[i].addEventListener('click', (e) => {
            console.log(e.target.attributes)
            listName = e.target.attributes.value.value
            app.classList.add("hidden")
            tasks.classList.remove("hidden");
            listTitleHtml = `
            <p id=${listName}>${listName}</p>
            <p id="${listName}_items" class="item_amount"></p>
            `
            tasksHeader.innerHTML = listTitleHtml;
            let currentList = listArr.find((e) => e.fullName === listName)
            displayTasks(currentList)
            itemAmountUpdate(document.getElementById(`${currentList.fullName}_items`), currentList.tasks.length)        
            itemAmountUpdate(document.getElementById(`${currentList.fullName}_tasks`), currentList.tasks.length)
            checkIfTasksHidden(currentList.tasksHidden)
            if (currentList.tasksHidden) {
            chevron.classList.add("hide_completed")
            } else {
            chevron.classList.remove("hide_completed")
            }
            localStorage.listArr = JSON.stringify(listArr)
        })
    }
    
    backBtnAddClickListener();
}

displayList = () => {
    let listHtml = ``
    for (let i = 0; i < listArr.length; i++) {
        listHtml += `<div class="list" id="${i}" value="${listArr[i].fullName}">
        <div class="list_name_div">
        <p class="list_name">${listArr[i].fullName}</p>
        <p id="${listArr[i].fullName}_tasks" class="task_number_list_section">
        ${listArr[i].tasks.length} items
        </p>
        </div>
        <button type="button" class="remove_list_button" id="remove_list_button">
        ${ellipsesSvg}
        </button>
        </div>`
        lists.innerHTML = listHtml;
    }
    attachShowListTasks();
    attachRemoveToList();
   
    
}
displayList()

const attachToggleHide = () => {
    hideCompletedDiv.addEventListener('click', () => {
        listToToggle = listArr.find((e) => e.fullName === tasksHeader.children[0].innerText)
        completedTasksDiv.classList.toggle('hidden')
        if (completedTasksDiv.classList.contains("hidden")) {
            listToToggle.tasksHidden = true
        }
        else {
            listToToggle.tasksHidden = false
        }
    })
}


attachToggleHide();

attachRemoveToList();


const checkIfTasksHidden = (bool) => {
    if (bool) {
        completedTasksDiv.classList.add("hidden")
    }
    else {
        completedTasksDiv.classList.remove("hidden")
    }
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

const itemAmountUpdate = (itemAmountElement, itemAmount) => {
    itemAmountElement.innerHTML = `${itemAmount} items`
}

addListBtn.addEventListener('click', () => {
    let listName = listNameGen(prompt('Type a name for your new list'), listArr, "fullName")
   if (listName) { listArr.push({
        fullName: listName,
        tasksHidden: false,
        tasks: [],
    })
}
    localStorage.listArr = JSON.stringify(listArr)
    displayList();
    
})


const addTask = () => {
    let taskName = taskInput.value;
    let currentList = listArr.find((e) => e.fullName === tasksHeader.children[0].innerText)
    currentList.tasks.push(
        {task: taskName,
         completed: false,
         key: uniqueKeyGenerator(),
        }
    );
    taskInput.value = ""
    localStorage.listArr = JSON.stringify(listArr)
    displayTasks(currentList);
    itemAmountUpdate(document.getElementById(`${currentList.fullName}_items`), currentList.tasks.length)
    itemAmountUpdate(document.getElementById(`${currentList.fullName}_tasks`), currentList.tasks.length)
    return 0;
}
taskInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && taskInput.value) addTask();
})

addTaskBtn.addEventListener('click', () => {
    if (taskInput.value) addTask()
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

    tasksContainer.children[0].innerHTML = pendingTasksHtml;
    tasksContainer.children[2].innerHTML = completedTasksHtml;
    appendCompleteTaskListener(tasksContainer.children[0].children)
    appendCompleteTaskListener(tasksContainer.children[2].children)
    appendRemoveTaskListener(tasksContainer.children[0].children)
    appendRemoveTaskListener(tasksContainer.children[2].children)
    if (!completedTasksDiv.children.length) {
        chevron.parentElement.classList.add("hidden")
    } else {
        chevron.parentElement.classList.remove("hidden")
    }
}

const uniqueKeyGenerator = () =>{
    return `task- ${Date.now()} - ${Math.floor(Math.random() * 1000)}`
}

const appendCompleteTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.fullName === tasksHeader.children[0].innerText)
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
            localStorage.listArr = JSON.stringify(listArr)
            displayTasks(currentList)
            
        }
    )
    }
}

const appendRemoveTaskListener = (tasks) => {
    let currentList = listArr.find((e) => e.fullName === tasksHeader.children[0].innerText)
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].children[1].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(e.target.parentElement.parentElement)
            let taskToRemove = currentList.tasks.findIndex((element) => {
                return element.key === e.target.parentElement.attributes.key.value;
            })
            currentList.tasks.splice(
                taskToRemove, 1
            )
            e.target.parentElement.remove()
            displayTasks(currentList);
            itemAmountUpdate(document.getElementById(`${currentList.fullName}_items`), currentList.tasks.length)
            itemAmountUpdate(document.getElementById(`${currentList.fullName}_tasks`), currentList.tasks.length)
            localStorage.listArr = JSON.stringify(listArr)
        }
    )
    }
}




const chevronAnimate = () => {
    hideCompletedDiv.addEventListener('click', () => {
        chevron.classList.toggle("hide_completed");
    })
}

chevronAnimate();