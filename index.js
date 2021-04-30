const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const retrievedData = JSON.parse(localStorage.getItem("todosEl"));
if(retrievedData)
    retrievedData.forEach((todo) => addTodo(todo));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

    if (todo) todoText = todo.text;
    
  if (todoText) {
      const todoEl = document.createElement("li");
      
  if (todo && todo.completed) todoEl.classList.add("completed");


    todoEl.innerHTML = `${todoText} <i class="fas fa-trash-alt"></i>`;

    // listen for completed
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      storeData();
    });

    // delete:
    const trashEl = todoEl.querySelector(".fas");
    trashEl.addEventListener("click", () => {
      todoEl.remove();
      storeData();
    });

    todosUl.appendChild(todoEl);

    input.value = "";

    storeData();
  }
}

function storeData() {
  const todosEl = todosUl.querySelectorAll("li");
  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todosEl", JSON.stringify(todos));
}
