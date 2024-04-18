// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

document.addEventListener("DOMContentLoaded", function () {
  const placesList = document.querySelector(".places__list");
  initialCards.forEach(function (cardData) {
    const cardElement = createCard(cardData, deleteCard);

    placesList.appendChild(cardElement);
  });
});

// @todo: Функция создания карточки

function createCard(data, deleteCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  // @todo: Функция удаления карточки

  deleteButton.addEventListener("click", function () {
    deleteCallback(cardElement);
  });

  return cardElement;
}
function deleteCard(cardElement) {
  cardElement.remove();
}
