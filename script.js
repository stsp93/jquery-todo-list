const addBtn = $('#btn-add');
const btnSave = $('#btn-save');
const listEl = $('.list-group');

const taskArray = (JSON.parse(localStorage.getItem('tasks')) ?? []);
let currentTaskId;

// inital render
    listRender();

// add button
addBtn.on('click', function () {
    const task = $('#taskInput').val();

    if (task.trim() === '') return;
    

    // alter taskArray
    taskArray.push(task);

    listRender();
    $('li').last().hide()
    $('li').last().slideDown(1000)
    // clear input
    $('#taskInput').val('');
});

// List buttons functionality
listEl.on('click', function (ev) {
    const target = ev.target
    const taskId = target.parentElement.parentElement.dataset.id;


    // delete button
    if (target.classList.contains('btn-danger')) {
        $('ul').find(`[data-id="${taskId}"]`).slideUp(1000, () => {

            taskArray.splice(taskId, 1);
    
            listRender();
        })

        // alter taskArray

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

    $('ul').find(`[data-id="${currentTaskId}"]`).fadeOut(1000, () => {listRender()})


    $("#editModal").modal('hide');
    // clear input
    $('#editTaskInput').val('');
})

// Clear btn
$('#btn-clear').on('click', function() {
    $('li').slideUp(400, () => {
        taskArray.length = 0;
        listRender();
    })
})


// Utility funcs
function createTaskMarkup(task, id) {
    return `<li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center" style="background:${generateBackgroundColor(id)}">
    ${id + 1}. ${escapeHTML(task)}
    <div>
      <button type="button" class="btn btn-warning mr-2">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>
  </li>`
}

// save to localStorage and render list
function listRender() {
    localStorage.setItem('tasks', JSON.stringify(taskArray));

    listEl.empty();
    taskArray.forEach((task, i) => {
        console.log('loop');
        listEl.append(createTaskMarkup(task, i));
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

function generateBackgroundColor(id) {
    if(id % 2) {
        return `#fff`;
    } else {
        return `#bcf`
    }
    
  }