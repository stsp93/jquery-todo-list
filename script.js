const addBtn = $('#btn-add');
const btnSave = $('#btn-save');
const listEl = $('#taskList');

let currentTaskId;

let draggedIdx;

listEl.sortable({
    start: function (e, ui) {
        draggedIdx = ui.item.index()
        $(this).data('idx', ui.item.index());
    },
    change: function (e, ui) {
        let startIdx = draggedIdx;
        let taskOverIdx = ui.placeholder.index();

        const idx = ui.placeholder.prevAll().filter(':not(.ui-sortable-helper)').length;
        // detect movement change with index negative is up, positive is down
        const movement = idx - $(this).data('idx'); 
        $(this).data('idx', idx);
 

        $('strong').each((i, el) => {
                // dragging up
                if (movement === -1) {
                    if (i === startIdx) el.textContent = --el.textContent;
                    if(i=== taskOverIdx ) el.textContent = +el.textContent +1
                    
                    // dragging down
                } else {
                    if (i === startIdx)  el.textContent = ++el.textContent;
                    if(i=== taskOverIdx - 1) el.textContent = +el.textContent -1
                    
                }
        })
    },
    update: function (e, ui) {
        const toBeSwitchedIdx = ui.item.index();
        const draggedTask = taskArray[draggedIdx]

        taskArray.splice(draggedIdx, 1);
        taskArray.splice(toBeSwitchedIdx, 0, draggedTask);
     
            listRender()
      
    }
});

// inital render
const taskArray = JSON.parse(localStorage.getItem('tasks')) ?? [];
listRender();

// add button
addBtn.on('click', function () {
    const task = $('#taskInput').val();

    if (task.trim() === '') return;

    // alter taskArray
    taskArray.push(task);

    listRender();
    $('li').last().hide()
    $('li').last().slideDown(500)
    // clear input
    $('#taskInput').val('');
});

// List buttons functionality
listEl.on('click', function (ev) {
    const target = ev.target
    const taskId = target.parentElement.parentElement.dataset.id;


    // delete button
    if (target.classList.contains('btn-danger')) {
        listEl.find(`[data-id="${taskId}"]`).slideUp(500, () => {

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

    listEl.find(`[data-id="${currentTaskId}"]`).fadeOut(500, () => { listRender() })


    $("#editModal").modal('hide');
    // clear input
    $('#editTaskInput').val('');
})

// Clear btn
$('#btn-clear').on('click', function () {
    $('li').slideUp(400, () => {
        taskArray.length = 0;
        listRender();
    })
})


// Utility funcs
function createTaskMarkup(task, id) {
    return `<li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center" style="background:${generateBackgroundColor(id)}">
    <p class="my-auto"><strong>${id + 1}</strong>. ${escapeHTML(task)}</p>
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
    if (id % 2) {
        return `#fff`;
    } else {
        return `#bcf`
    }

}