const addListBtn = document.getElementById("add_list_btn")
const lists = document.getElementById("lists")


let listArr = [];

const displayList = () => {
    let listHtml = ``
    for (let i = 0; i < listArr.length; i++) {
        listHtml += `<div class="list" value="${listArr[i]}">${listArr[i]}</div>`
        lists.innerHTML = listHtml;
    }

}


addListBtn.addEventListener('click', () => {
    let listName = prompt('Type a name for your new list.')
    listArr.push(listName)
    displayList();
})