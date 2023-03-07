import { SignupView } from "../View/SignupView.js";
import { SigninView } from "../View/SigninView.js";
import { MainView } from "../View/MainView.js";
import { TodoModel } from "../Model/TodoModel.js";
import { auth, C_PATH_TO_MODE } from "../init.js";
import { AuthModel } from "../Model/AuthModel.js";

const C_MODES = Object.values(C_PATH_TO_MODE);

const C_MODE_TO_PATH = Object.fromEntries(
  Object.entries(C_PATH_TO_MODE).map(([key, value]) => [value, key])
);

export class TodoController {
  #mode;
  #model;

  constructor(mode) {
    this.#mode = mode;

    if (this.#mode === "main") {
      auth.onAuthStateChanged((user) => {
        if (!user) this.gotoMode("signin");
      });
    }
  }

  start() {
    this[this.#mode]();
  }

  singup() {
    const view = new SignupView();

    view.onSignup = async (email, password) => {
      try {
        await AuthModel.singup(email, password);
        view.resetForm();
        this.gotoMode("signin");
      } catch (err) {
        console.log(err.message);
      }
    };
  }

  signin() {
    const view = new SigninView();

    view.onSignin = async (email, password) => {
      try {
        await AuthModel.signin(email, password);
        view.resetForm();
        this.gotoMode("main");
      } catch (err) {
        console.log(err.message);
      }
    };
  }

  main() {
    const view = new MainView();

    this.#model = new TodoModel((type, object) => {
      if (type === "add") {
        view.renderData(object.data());
      } else if (type === "remove") {
        view.removeItem(object.id);
      }
    });

    view.onAdd = (id, text) => {
      this.#model.add(id, text);
    };

    view.onRemove = (id) => {
      this.#model.remove(id);
    };

    view.onEdit = (id) => {
      this.#model.toggle(id);
    };

    view.onLogout = () => {
      AuthModel.logout();
    };
  }

  gotoMode(mode) {
    window.location = C_MODE_TO_PATH[mode];
  }
}
