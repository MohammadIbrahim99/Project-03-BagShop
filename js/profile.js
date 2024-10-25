/////notif

const notif = document.querySelector("#notif");

document.querySelector("#submit-register").onclick = (e) => {
  notif.classList.toggle("active");
};

document.querySelector("#close-notif").onclick = (e) => {
  notif.classList.remove("active");
};
