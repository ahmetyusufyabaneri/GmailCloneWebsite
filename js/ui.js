import { trimString } from "./helpers.js";

export const showModal = (modal, isOpen) => {
  modal.style.display = isOpen ? "block" : "none";
};

export const renderMails = (outlet, data) => {
  outlet.innerHTML = data
    .map(
      (mail) => `
  <div class="mail" data-id=${mail.id}>
  <div class="left">
    <input type="checkbox" />
    <i class="bi bi-star"></i>
    <span>${trimString(mail.reciever, 10)}</span>
  </div>
  <div class="right">
    <p class="subject">${trimString(mail.title, 10)}</p>
    <p class="description">${trimString(mail.message, 30)}</p>
    <p class="date">${mail.date}</p>
    <div class="delete">
      <i class="bi bi-trash-fill"></i>
    </div>
  </div>
</div>
`
    )
    .join("");
};
