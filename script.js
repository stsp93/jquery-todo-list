const addBtn = $('#btn-add');
const listEl = $('.list-group');

addBtn.click(function () {
    const task = $('#taskInput').val();

    const markup = `<li class="list-group-item d-flex justify-content-between align-items-center">
    ${task}
    <div>
      <button type="button" class="btn btn-warning mr-2">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </div>
  </li>`
    listEl.append(markup)

    $('#taskInput').val('');
    localStorage.setItem('tasks', task);
})

/* <li class="list-group-item d-flex justify-content-between align-items-center">
Sample Task 1
<div>
  <button type="button" class="btn btn-warning mr-2">Edit</button>
  <button type="button" class="btn btn-danger">Delete</button>
</div>
</li>*/