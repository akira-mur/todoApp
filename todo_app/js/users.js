const form = document.querySelector("#form");
const todoContainer = document.querySelector("#todo-container");

let data = new Date();
let time = data.getTime();
let counter = time;
let todos = [];

auth.onAuthStateChanged((user) => {
  if (!user) location = "login.html";
});

function logout() {
  auth.signOut();
  localStorage.removeItem("todos");
}

function saveData(data) {
  let todo = {
    id: data.id,
    text: data.data().text,
    completed: data.data().completed,
  };
  todos.push(todo);
}

function renderData(id) {
  let todoObject = todos.find((todo) => todo.id === id);

  let parentDiv = document.createElement("li");
  parentDiv.setAttribute("id", todoObject.id);

  let todoDiv = document.createElement("p");
  todoDiv.textContent =
    todoObject.text.length <= 20
      ? todoObject.text
      : todoObject.text.slice(0, 20);
  todoObject.completed ? todoDiv.classList.add("completed") : todoDiv;

  let trashButton = document.createElement("button");
  trashButton.className = "far fa-trash-alt";
  trashButton.classList.add("delete");
  trashButton.classList.add("button");
  trashButton.classList.add("hover_button");

  let completeButton = document.createElement("button");
  completeButton.className = "fa solid fa-check";
  completeButton.classList.add("finish");
  completeButton.classList.add("button");
  completeButton.classList.add("hover_button");

  let modifyButton = document.createElement("button");
  modifyButton.className = "fa-solid fa-pen";
  modifyButton.classList.add("modify");
  modifyButton.classList.add("button");
  modifyButton.classList.add("hover_button");

  let buttonDiv = document.createElement("div");
  buttonDiv.className = "button_div";
  buttonDiv.appendChild(trashButton);
  buttonDiv.appendChild(completeButton);
  buttonDiv.appendChild(modifyButton);

  parentDiv.appendChild(todoDiv);
  parentDiv.appendChild(buttonDiv);
  todoContainer.appendChild(parentDiv);

  trashButton.addEventListener("click", (e) => {
    let id = e.target.parentElement.parentElement.getAttribute("id");
    auth.onAuthStateChanged((user) => {
      if (user) db.collection(user.uid).doc(id).delete();
    });
  });

  modifyButton.addEventListener("click", (e) => {
    let id = e.target.parentElement.parentElement.getAttribute("id");
    form["todos"].value = todoContainer.querySelector(`#${id}`).textContent;
    form["todos"].focus();
    auth.onAuthStateChanged((user) => {
      if (user) db.collection(user.uid).doc(id).delete();
    });
  });

  completeButton.addEventListener("click", (e) => {
    let id = e.target.parentElement.parentElement.getAttribute("id");
    auth.onAuthStateChanged((user) => {
      let item = db.collection(user.uid).doc(id);
      item.get().then((doc) => {
        item.update({ completed: !doc.data().completed });
        todoDiv.classList.toggle("completed");
        todos.map((todo) =>
          todo.id === doc.id ? (todo.completed = !todo.completed) : todo
        );
      });
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = form["todos"].value;
  let id = (counter += 1);
  form.reset();

  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection(user.uid)
        .doc("_" + id)
        .set({
          id: "_" + id,
          text,
          completed: false,
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
});

function filterHandler(status) {
  if (status === "completed") {
    todos = JSON.parse(localStorage.getItem("todos")).filter(
      (todo) => todo.completed
    );
  } else if (status == "open") {
    todos = JSON.parse(localStorage.getItem("todos")).filter(
      (todo) => !todo.completed
    );
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoContainer.innerHTML = "";
  todos.forEach((todo) => renderData(todo.id));
}

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection(user.uid).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          saveData(change.doc);
          renderData(change.doc.id);
        } else if (change.type == "removed") {
          let li = todoContainer.querySelector(`#${change.doc.id}`);
          todoContainer.removeChild(li);
          todos = todos.filter((todo) => todo.id !== change.doc.id);
        }
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  }
});
