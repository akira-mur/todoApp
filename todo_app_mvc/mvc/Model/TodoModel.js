import { auth, db } from "../init.js";

export class TodoModel {
  onChange = () => {};

  constructor(onChange) {
    this.onChange = onChange;

    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.uid).onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          changes.forEach((change) => {
            if (change.type === "added") {
              this.onChange("add", change.doc);
            } else if (change.type === "removed") {
              this.onChange("remove", change.doc);
            }
          });
        });
      } else reject("Пользователь не авторизован");
    });
  }

  async add(id, text) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.uid)
          .doc("_" + id)
          .set({
            id: "_" + id,
            text,
            completed: false,
          })
          .catch((err) => console.log(err.message));
      }
    });
  }

  remove(id) {
    auth.onAuthStateChanged((user) => {
      if (user) db.collection(user.uid).doc(id).delete();
    });
  }

  toggle(id) {
    auth.onAuthStateChanged((user) => {
      let item = db.collection(user.uid).doc(id);
      item.get().then((doc) => {
        item.update({ completed: !doc.data().completed });
      });
    });
  }
}
