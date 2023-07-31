const addBtn = $('#btn-add');
const listEl = $('.list-group');

let allTasks = localStorage.getItem('tasks');

// inital load

if(allTasks) {
    JSON.parse(allTasks).forEach(t => {
        listEl.append(createMarkup(t));
    })
}


// add button

addBtn.click(function () {
    const task = $('#taskInput').val();

    console.log(task);

    listEl.append(createMarkup(task));

    $('#taskInput').val('');
    
    if(!allTasks) {
        localStorage.setItem('tasks',JSON.stringify([task]));
    }else {
        localStorage.setItem('tasks',JSON.stringify([...JSON.parse(allTasks), task]));
    }

    allTasks = localStorage.getItem('tasks');
});

function createMarkup(task) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
    ${task}
    <div>
      <button type="button" class="btn btn-warning mr-2">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>
  </li>`
}