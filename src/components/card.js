import { likeCard, unlikeCard, deleteCardFromServer } from "./api.js";

// Функция создания карточки
export function createCard(cardData, currentUserId, deleteCard, handleLikeButtonClick, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  // Устанавливаем начальное состояние кнопки лайка
  if (cardData.likes.some(like => like._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Отображаем кнопку удаления только для карточек, созданных текущим пользователем
  if (cardData.owner._id !== currentUserId) {
    cardDeleteButton.style.display = 'none';
  } else {
    cardDeleteButton.addEventListener("click", () => deleteCard(cardData._id, cardElement));
  }

  cardLikeButton.addEventListener("click", () => handleLikeButtonClick(cardData._id, cardLikeButton, cardLikeCount));
  cardImage.addEventListener("click", () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция обработки лайка
export function handleLikeButtonClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardId)
      .then(data => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = data.likes.length;
      })
      .catch(err => console.log(err));
  } else {
    likeCard(cardId)
      .then(data => {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = data.likes.length;
      })
      .catch(err => console.log(err));
  }
}
