export class SignupView {
  onSignup;

  #signupForm;

  constructor() {
    this.#signupForm = document.querySelector("#signup-form");

    this.#signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = this.#signupForm["email"].value;
      const password = this.#signupForm["password"].value;
      this.onSignup(email, password);
    });
  }

  resetForm() {
    this.#signupForm.reset();
  }
}
