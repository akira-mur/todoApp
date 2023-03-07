const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const loginEmail = loginForm["email"].value;
  const loginPass = loginForm["password"].value;

  auth
    .signInWithEmailAndPassword(loginEmail, loginPass)
    .then(() => {
      location = "users.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});
