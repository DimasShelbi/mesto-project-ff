import "./index.css";

import initialCards from "./components/cards.js";

import logo from "./images/logo.svg";
import { openModal, closeModal } from "./components/modal.js";
import {
  createCard,
  deleteCard,
  handleLikeButtonClick,
} from "./components/card.js";

// Динамическая вставка логотипа
document.addEventListener("DOMContentLoaded", () => {
  const logoElement = document.querySelector(".header__logo");
  if (logoElement) {
    logoElement.src = logo;
  }
});

// @todo: DOM узлы

document.addEventListener("DOMContentLoaded", function () {
  const placesList = document.querySelector(".places__list");
  initialCards.forEach(function (cardData) {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handleLikeButtonClick,
      openImagePopup
    );
    placesList.appendChild(cardElement);
  });
});

// Получаем ссылку на кнопку "Редактировать"
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");
const editModalCloseButton = editModal.querySelector(".popup__close");
const editFormElement = editModal.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", function () {
  closeModal(editModal);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(editModal);
}

// Функционал добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
const titleInput = addModal.querySelector(".popup__input_type_card-name");
const linkInput = addModal.querySelector(".popup__input_type_url");
const addModalCloseButton = addModal.querySelector(".popup__close");
const addFormElement = addModal.querySelector(".popup__form");

addButton.addEventListener("click", function () {
  openModal(addModal);
});

addModalCloseButton.addEventListener("click", function () {
  closeModal(addModal);
});

addFormElement.addEventListener("submit", handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = createCard({ name: title, link: link });
  const placesList = document.querySelector(".places__list");
  placesList.prepend(newCard);
  closeModal(addModal);
  titleInput.value = '';
  linkInput.value = '';
}

// Функция для открытия изображения в попапе
function openImagePopup(imageLink, imageName) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

  imagePopupImage.src = imageLink;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;

  openModal(imagePopup);
  imagePopupCloseButton.addEventListener("click", function () {
    closeModal(imagePopup);
  });
}
