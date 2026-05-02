const form = document.querySelector("#static-form");
const status = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name") || "Klient";
  status.textContent = `${name}, to jest statyczny status demo. Dane nie zostały wysłane ani zapisane.`;
  form.reset();
});
