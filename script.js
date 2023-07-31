const addBtn = $('#btn-add');
const btnSave = $('#btn-save');
const listEl = $('.list-group');

let taskArray = (JSON.parse(localStorage.getItem('tasks')) ?? [])

// inital render

    listRender();

// add button

addBtn.on('click', function () {
    const task = $('#taskInput').val();

    if (task === '') return;

    taskArray.push(task);
    listRender();
    saveToLocalStorage(taskArray)

    $('#taskInput').val('');
});

// List button functionality

let currentTaskId;

listEl.on('click', function (ev) {
    const target = ev.target
    const taskId = target.parentElement.parentElement.dataset.id;


    // delete button
    if (target.classList.contains('btn-danger')) {

        // remove from localStorage and delete
        taskArray.splice(taskId, 1);
        saveToLocalStorage(taskArray)

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

btnSave.on('click', function () {
    const editedInput = $('#editTaskInput').val();

    taskArray[currentTaskId] = editedInput;
    saveToLocalStorage(taskArray);

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
    taskArray.forEach((task, i) => {
        listEl.append(createMarkup(task, i));
    })
}

function saveToLocalStorage(taskArray) {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
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