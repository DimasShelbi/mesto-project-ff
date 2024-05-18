// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
// @todo: Функция создания карточки
export function createCard(
    data,
    deleteCallback,
    likeCallback,
    openImageCallback
  ) {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
  
    if (data.link && data.name) {
      cardImage.src = data.link;
      cardImage.alt = data.name;
    } else {
      // Удалите изображение, если данные отсутствуют или неверны
      cardImage.remove();
    }
  
    cardTitle.textContent = data.name || "No title";
  
    deleteButton.addEventListener("click", function () {
      deleteCallback(cardElement);
    });
  
    likeButton.addEventListener("click", function () {
      likeCallback(likeButton);
    });
  
    cardImage.addEventListener("click", function () {
      openImageCallback(data.link, data.name);
    });
  
    return cardElement;
  }

// Функция удаления карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки нажатия на кнопку лайка

export function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
