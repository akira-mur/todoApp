import { auth, db } from "../init.js";

export class AuthModel {
  static async signup(email, password) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    return await db.collection("users").doc(cred.user.uid).set({
      email,
      password,
    });
  }

  static async signin(email, password) {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err));
  }

  static logout() {
    auth.signOut();
  }
}
