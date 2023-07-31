const addBtn = $('#btn-add');
const btnSave = $('#btn-save');
const listEl = $('.list-group');

let allTasks = localStorage.getItem('tasks');

// inital load

if (allTasks) {
    listRender();
}


// add button

addBtn.on('click', function () {
    const task = $('#taskInput').val();

    if (task === '') return;

    listEl.append(createMarkup(task, JSON.parse(allTasks)?.length ?? 0));

    $('#taskInput').val('');

    if (!allTasks) {
        localStorage.setItem('tasks', JSON.stringify([task]));
    } else {
        localStorage.setItem('tasks', JSON.stringify([...JSON.parse(allTasks), task]));
    }

    allTasks = localStorage.getItem('tasks');
});

// List button functionality

let currentTaskId;

listEl.on('click', function (ev) {
    const target = ev.target
    const taskId = target.parentElement.parentElement.dataset.id;


    // delete button
    if (target.classList.contains('btn-danger')) {

        // remove form localStorage and delete
        const taskArray = JSON.parse(allTasks);
        taskArray.splice(taskId, 1);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
        allTasks = JSON.stringify(taskArray);

        listRender();
    };

    // edit button
    if (target.classList.contains('btn-warning')) {
        $('#editTaskInput').val(JSON.parse(localStorage.getItem('tasks'))[taskId])
        $("#editModal").modal('show');
        currentTaskId = taskId;
    }
})

// Save btn

btnSave.on('click', function (ev) {
    const editedInput = $('#editTaskInput').val();
    const currentEl = listEl.find(`[data-id="${currentTaskId}"]`)

  const taskArray = JSON.parse(localStorage.getItem('tasks'))
  taskArray[currentTaskId] = editedInput;
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  allTasks = JSON.stringify(taskArray);

  listRender();

  $("#editModal").modal('hide');
  $('#editTaskInput').val('');
})


function createMarkup(task, id) {
    return `<li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center">
    ${id + 1}. ${escapeHTML(task)}
    <div>
      <button type="button" class="btn btn-warning mr-2">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>
  </li>`
}

function listRender() {
    listEl.empty();
    JSON.parse(allTasks).forEach((task, i) => {
        listEl.append(createMarkup(task, i));
    })
}

function escapeHTML(text) {
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    };
  
    return text.replace(/[&<>"'\/]/g, (match) => htmlEntities[match]);
  }