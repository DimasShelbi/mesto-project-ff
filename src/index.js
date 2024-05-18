import "./index.css";
import initialCards from "./components/cards.js";
import logo from "./images/logo.svg";
import {
  createCard,
  deleteCard,
  handleLikeButtonClick,
} from "./components/card-function.js";
import { openModal, closeModal, openImagePopup } from "./components/modal.js";

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

// Получаем ссылку на модальное окно "Редактировать"
const editModal = document.querySelector(".popup_type_edit");

// Добавляем слушатель события клика по кнопке "Редактировать"
editButton.addEventListener("click", function () {
  openModal(editModal);
});

// Получаем ссылку на кнопку "Закрыть" в модальном окне "Редактировать"
const closeButton = editModal.querySelector(".popup__close");

// Добавляем слушатель события клика по кнопке "Закрыть" в модальном окне "Редактировать"
closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

// Находим форму в DOM
const formElement = editModal.querySelector(".popup__form");

// Прикрепляем обработчик к форме
formElement.addEventListener("submit", handleFormSubmit);

// Получаем элементы профиля для заполнения формы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Получаем поля формы в модальном окне "Редактировать"
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");

// Добавляем слушатель события клика по кнопке "Редактировать"
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

// Добавляем слушатель события клика по кнопке "Закрыть" в модальном окне "Редактировать"
closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;

  if (title && link) {
    const newCard = createCard(
      { name: title, link: link },
      deleteCard,
      handleLikeButtonClick
    );
    const placesList = document.querySelector(".places__list");
    placesList.prepend(newCard);
  }

  closeModal(addModal);
  titleInput.value = "";
  linkInput.value = "";
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  // Получаем значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Выбираем элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  // Закрыть модальное окно
  closeModal(editModal);
}

// Функционал добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
const titleInput = addModal.querySelector(".popup__input_type_card-name");
const linkInput = addModal.querySelector(".popup__input_type_url");

addButton.addEventListener("click", function () {
  openModal(addModal);
});

const addCloseButton = addModal.querySelector(".popup__close");
addCloseButton.addEventListener("click", function () {
  closeModal(addModal);
});

const addFormElement = addModal.querySelector(".popup__form");
addFormElement.addEventListener("submit", handleAddFormSubmit);
