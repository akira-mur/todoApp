import "./init.js";
import { TodoController } from "./Controller/TodoController.js";
import { C_PATH_TO_MODE } from "./init.js";

const controller = new TodoController(
  C_PATH_TO_MODE[
    new URL(location.href).pathname.split("/").findLast(() => true)
  ]
);

controller.start();
