import { renderMails, showModal } from "./ui.js";
import { getDate } from "./helpers.js";

const menuBars = document.querySelector(".menu-bars");
const navigation = document.querySelector("nav");
const createMailButton = document.querySelector(".create");
const modal = document.querySelector(".modal-wrapper");
const closeModalButton = document.querySelector("#close-button");
const form = document.querySelector("#create-mail-form");
const mailsArea = document.querySelector(".mails-area");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-icon");

const getMailData = localStorage.getItem("data");

const mailData = JSON.parse(getMailData) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailsArea, mailData);
});

menuBars.addEventListener("click", () => {
  navigation.classList.toggle("hide");
});

createMailButton.addEventListener("click", () => showModal(modal, true));

closeModalButton.addEventListener("click", () => showModal(modal, false));

window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;

  if (width < 1024) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});

const sendMail = (e) => {
  e.preventDefault();

  const id = new Date().getTime();
  const reciever = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  if (!reciever || !title || !message) {
    Toastify({
      text: "Complete the form please.",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#fdcc00",
        borderRadius: "8px",
      },
      onClick: function () {},
    }).showToast();

    return;
  }

  const newMail = {
    id,
    sender: "Ahmet",
    reciever,
    title,
    message,
    isStarry: false,
    date: getDate(),
  };

  mailData.unshift(newMail);

  const stringData = JSON.stringify(mailData);

  localStorage.setItem("data", stringData);

  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  showModal(modal, false);

  Toastify({
    text: "Form has sent.",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#1a8710",
      borderRadius: "8px",
    },
    onClick: function () {},
  }).showToast();

  renderMails(mailsArea, mailData);
};

const updateMail = (e) => {
  const deleteButton = e.target.classList.contains("bi-trash-fill");

  if (deleteButton) {
    const mail = e.target.closest(".mail");

    const mailId = mail.dataset.id;

    const filteredMails = mailData.filter((mail) => mail.id != mailId);

    const stringData = JSON.stringify(filteredMails);

    localStorage.removeItem("data");
    localStorage.setItem("data", stringData);

    mail.remove();
  }
};

form.addEventListener("submit", sendMail);

mailsArea.addEventListener("click", updateMail);
