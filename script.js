const addListBtn = document.getElementById("add_list_btn")
const lists = document.getElementById("lists")


let listArr = [];

const displayList = () => {
    let listHtml = ``
    for (let i = 0; i < listArr.length; i++) {
        listHtml += `<div class="list" id="${i}" value="${i}">${listArr[i]}</div>`
        lists.innerHTML = listHtml;
    }

}

const attachRemoveToList = () => {
    for (let i = 0; i < lists.children.length; i++){
        lists.children[i].addEventListener('click', (e) => {
            e.target.remove();
            listArr.splice(e.target.value, 1);
        })
    }
}


addListBtn.addEventListener('click', () => {
    let listName = prompt('Type a name for your new list.')
    listArr.push(listName)
    displayList();
})

