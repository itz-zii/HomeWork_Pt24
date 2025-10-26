const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const task = todoInput.value.trim();
  if (task === "") return;

  if (todos.includes(task)) {
    alert("Task này đã tồn tại!");
    return;
  }

  todos.push(task);
  todoInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center p-4 mb-3 rounded-lg bg-[#8758ff]";

    const span = document.createElement("span");
    span.textContent = task;

    const btnGroup = document.createElement("div");

    const fixBtn = document.createElement("button");
    fixBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    fixBtn.className = "text-white mx-2";
    fixBtn.addEventListener("click", () => convertToForm(index, task));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "text-white";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    btnGroup.appendChild(fixBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    todoList.appendChild(li);
  });
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

function convertToForm(index, currentTask) {
  const li = todoList.children[index];
  const form = document.createElement("form");

  form.className =
    "rounded-lg w-89 flex mb-3 border-[#8758ff] border-2 overflow-hidden";

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentTask;
  input.placeholder = "What is the task today?";
  input.className =
    "todo-input w-61 border-0 focus:outline-none focus:ring-0 p-4 text-white bg-gray-900";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Add Task";
  saveBtn.className = "add-btn p-4 cursor-pointer w-27 bg-[#8758ff]";

  form.appendChild(input);
  form.appendChild(saveBtn);

  todoList.replaceChild(form, li);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newValue = input.value.trim();
    if (newValue === "") return;

    if (todos.includes(newValue) && newValue !== currentTask) {
      alert("Task này đã tồn tại!");
      return;
    }

    todos[index] = newValue;
    renderTodos();
  });
}
