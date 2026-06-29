const form = document.getElementById("signupForm");
const responseMsg = document.getElementById("responseMsg");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function sanitizeText(value) {
  return value.replace(/[<>]/g, "").trim();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = sanitizeText(nameInput.value || "");
  const email = sanitizeText(emailInput.value || "");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email) {
    responseMsg.textContent = "Please enter your name and email so we can help you.";
    responseMsg.style.color = "#f87171";
    return;
  }

  if (!emailPattern.test(email)) {
    responseMsg.textContent = "Please enter a valid email address.";
    responseMsg.style.color = "#f87171";
    return;
  }

  responseMsg.textContent = `Thank you, ${name.split(" ")[0]} — a SecureLife advisor will contact you shortly.`;
  responseMsg.style.color = "#57d18b";
  form.reset();
});