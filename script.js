const addBtn = $('#btn-add');
const listEl = $('.list-group');

let allTasks = localStorage.getItem('tasks');

// inital load

if(allTasks) {
    JSON.parse(allTasks).forEach((task,i) => {
        listEl.append(createMarkup(task, i));
    })
}


// add button

addBtn.click(function () {
    const task = $('#taskInput').val();

    console.log(task);

    listEl.append(createMarkup(task, JSON.parse(allTasks)?.length ?? 0));

    $('#taskInput').val('');
    
    if(!allTasks) {
        localStorage.setItem('tasks',JSON.stringify([task]));
    }else {
        localStorage.setItem('tasks',JSON.stringify([...JSON.parse(allTasks), task]));
    }

    allTasks = localStorage.getItem('tasks');
});


listEl.click(function(ev) {
    const target = ev.target
    const taskId = target.parentElement.parentElement.dataset.id;
    // delete button
    if(target.classList.contains('btn-danger')) {

        // remove form localStorage
        const taskArray = JSON.parse(allTasks);
        taskArray.splice(taskId, 1);
        localStorage.setItem('tasks', JSON.stringify(taskArray));

        // delete Element
        target.parentElement.parentElement.remove()
    };
    

})


function createMarkup(task, id) {
    return `<li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center">
    ${id+1}. ${task}
    <div>
      <button type="button" class="btn btn-warning mr-2">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>
  </li>`
}