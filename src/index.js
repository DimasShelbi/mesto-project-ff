import "./index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleLikeButtonClick, deleteCard } from "./components/card.js";
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard, deleteCardFromServer, updateAvatar } from "./components/api.js";
import logo from './images/logo.svg';  // Импорт логотипа

// Конфигурация для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включаем валидацию
enableValidation(validationConfig);

// Динамическая вставка логотипа и загрузка данных
document.addEventListener("DOMContentLoaded", function () {
  const logoElement = document.querySelector(".header__logo");
  if (logoElement) {
    logoElement.src = logo;
  }

  const profileAvatar = document.querySelector(".profile__image");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  let currentUserId;

  // Загрузка информации о пользователе и карточек при загрузке страницы
  const placesList = document.querySelector(".places__list");

  Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      if (profileAvatar) {
        profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      }
      currentUserId = userInfo._id;

      cards.forEach(function (cardData) {
        const cardElement = createCard(
          cardData,
          currentUserId,
          deleteCard,
          handleLikeButtonClick,
          openImagePopup
        );
        placesList.appendChild(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Открытие модального окна редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");
const editModalCloseButton = editModal.querySelector(".popup__close");
const editFormElement = editModal.querySelector(".popup__form");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");
const editSubmitButton = editFormElement.querySelector(".popup__button");

editButton.addEventListener("click", function () {
  getUserInfo()
    .then((userInfo) => {
      nameInput.value = userInfo.name;
      jobInput.value = userInfo.about;
      clearValidation(editModal, validationConfig);
      openModal(editModal);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Закрытие модального окна
editModalCloseButton.addEventListener("click", function () {
  closeModal(editModal);
});

// Обработчик отправки формы
editFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  editSubmitButton.textContent = 'Сохранение...';
  updateUserInfo(newName, newJob)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(editModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editSubmitButton.textContent = 'Сохранить';
    });
});

// Функционал добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
const titleInput = addModal.querySelector(".popup__input_type_card-name");
const linkInput = addModal.querySelector(".popup__input_type_url");
const addModalCloseButton = addModal.querySelector(".popup__close");
const addFormElement = addModal.querySelector(".popup__form");
const addSubmitButton = addFormElement.querySelector(".popup__button");

addButton.addEventListener("click", function () {
  clearValidation(addModal, validationConfig);
  openModal(addModal);
});

addModalCloseButton.addEventListener("click", function () {
  closeModal(addModal);
});

addFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;

  addSubmitButton.textContent = 'Сохранение...';
  addNewCard(title, link)
    .then((card) => {
      const newCard = createCard(
        { ...card, owner: { _id: currentUserId } },
        currentUserId,
        deleteCard,
        handleLikeButtonClick,
        openImagePopup
      );
      const placesList = document.querySelector(".places__list");
      placesList.prepend(newCard);
      closeModal(addModal);
      titleInput.value = '';
      linkInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addSubmitButton.textContent = 'Сохранить';
    });
});

// Получаем ссылку на модальное окно с изображением
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

// Устанавливаем обработчик события клика по кнопке закрытия 
imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

// Функция для открытия изображения в попапе
function openImagePopup(imageLink, imageName) {
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  openModal(imagePopup);
  imagePopupImage.src = imageLink;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;
}

// Добавляем обработчик события клика на оверлей для всех модальных окон
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Функционал обновления аватара
const avatarButton = document.querySelector('.profile__image');
const avatarModal = document.querySelector('.popup_type_avatar');
const avatarFormElement = avatarModal.querySelector('.popup__form');
const avatarInput = avatarModal.querySelector('.popup__input_type_avatar-url');
const avatarModalCloseButton = avatarModal.querySelector('.popup__close');
const avatarSubmitButton = avatarFormElement.querySelector(".popup__button");

avatarButton.addEventListener('click', function () {
  clearValidation(avatarModal, validationConfig);
  openModal(avatarModal);
});

avatarModalCloseButton.addEventListener('click', function () {
  closeModal(avatarModal);
});

avatarFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;

  avatarSubmitButton.textContent = 'Сохранение...';
  updateAvatar(avatarUrl)
    .then((userInfo) => {
      const profileAvatar = document.querySelector(".profile__image");
      if (profileAvatar) {
        profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      }
      closeModal(avatarModal);
      avatarInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
    });
});
