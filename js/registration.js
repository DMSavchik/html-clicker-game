document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    if (localStorage.getItem("username")) {
      alert("You are already registered.");
      window.location.href = "game.html";
    } else {
      localStorage.setItem("username", username);
      alert(`Registration successful! Welcome, ${username}.`);
      // Redirect to the game page after successful registration
      window.location.href = "game.html";
    }
  });
});
