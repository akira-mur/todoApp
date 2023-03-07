export class SigninView {
  onSignin;

  #loginForm;

  constructor() {
    this.#loginForm = document.querySelector("#login-form");

    this.#loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const loginEmail = this.#loginForm["email"].value;
      const loginPassword = this.#loginForm["password"].value;
      this.onSignin(loginEmail, loginPassword);
    });
  }

  resetForm() {
    this.#loginForm.reset();
  }
}
