// Функция для открытия модального окна
export function openModal(modal) {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 50);
}

// Функция для закрытия модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 600);
}

// Функция для закрытия модального окна при клике на оверлей
function closeModalOverlay(event) {
  const openedModal = document.querySelector(".popup_is-opened");
  if (event.target === openedModal) {
    closeModal(openedModal);
  }
}

// Функция для закрытия модального окна при нажатии на клавишу Esc
function closeModalEsc(event) {
  const openedModal = document.querySelector(".popup_is-opened");
  if (event.key === "Escape" && openedModal) {
    closeModal(openedModal);
  }
}

// Добавляем обработчик события для закрытия модального окна при клике на оверлей
document.addEventListener("click", closeModalOverlay);

// Добавляем обработчик события для закрытия модального окна при нажатии на клавишу Esc
document.addEventListener("keydown", closeModalEsc);

// Функция для открытия изображения в попапе
export function openImagePopup(imageLink, imageName) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

  imagePopupImage.src = imageLink;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;

  // Добавляем открытие модального окна перед открытием попапа с изображением
  openModal(imagePopup);

  // Добавляем обработчик события на кнопку закрытия
  imagePopupCloseButton.addEventListener("click", function () {
    closeModal(imagePopup);
  });
}
