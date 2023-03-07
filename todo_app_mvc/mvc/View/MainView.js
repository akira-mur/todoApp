export class MainView {
  onAdd;
  onEdit;
  onRemove;
  onLogout;

  constructor() {
    this.form = document.querySelector("#form");
    this.todoContainer = document.querySelector("#todo-container");

    const date = new Date();
    const time = date.getTime();
    this.counter = time;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const text = this.form["todos"].value;
      let id = (this.counter += 1);

      this.form.reset();

      this.onAdd(id, text);
    });

    document.querySelectorAll(".filterHandler[data-status]").forEach(
      (btn) =>
        (btn.onclick = () => {
          const statusString = btn.dataset.status;

          this.todoContainer.classList.toggle(
            "onlyopen",
            statusString === "open"
          );

          this.todoContainer.classList.toggle(
            "onlycompleted",
            statusString === "completed"
          );
        })
    );

    document.querySelector("#logout-btn").onclick = (e) => {
      this.onLogout();
    };
  }

  logout() {
    this.onLogout();
  }

  removeItem(id) {
    let li = this.todoContainer.querySelector(`#${id}`);
    this.todoContainer.removeChild(li);
  }

  renderData(todoObj) {
    let parentDiv = document.createElement("li");
    parentDiv.setAttribute("id", todoObj.id);
    parentDiv.classList.add(todoObj.completed ? "completed" : "inprogress");

    let todoDiv = document.createElement("p");
    todoDiv.textContent =
      todoObj.text.length <= 20 ? todoObj.text : todoObj.text.slice(0, 20);

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
    //
    let modifyButton = document.createElement("button");
    modifyButton.className = "fa-solid fa-pen";
    modifyButton.classList.add("modify");
    modifyButton.classList.add("button");
    modifyButton.classList.add("hover_button");
    //
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button_div";
    buttonDiv.appendChild(trashButton);
    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(modifyButton);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(buttonDiv);
    this.todoContainer.appendChild(parentDiv);

    trashButton.addEventListener("click", (e) => {
      this.onRemove(todoObj.id);
    });

    completeButton.addEventListener("click", (e) => {
      this.onEdit(todoObj.id);

      document.querySelector(`#${todoObj.id}`).classList.toggle("completed");
      document.querySelector(`#${todoObj.id}`).classList.toggle("inprogress");
    });

    modifyButton.addEventListener("click", (e) => {
      let input = document.querySelector("#form")["todos"];
      input.value = todoObj.text;
      input.focus();
      this.onRemove(todoObj.id);
    });
  }
}
