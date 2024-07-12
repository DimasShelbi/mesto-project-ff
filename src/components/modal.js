export function openModal(modal) {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
      modal.classList.add("popup_is-opened");
  }, 50);

  document.addEventListener("click", closeModalOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  setTimeout(() => {
      modal.classList.remove("popup_is-animated");
  }, 600);

  document.removeEventListener("click", closeModalOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalOverlay(event) {
  const isOverlayClicked =
      event.target.classList.contains("popup") &&
      event.target.classList.contains("popup_is-opened");
  if (isOverlayClicked) {
      closeModal(event.target);
  }
}

function closeModalEsc(event) {
  const isEscapeKey = event.key === "Escape";
  if (isEscapeKey) {
      const openedModal = document.querySelector(".popup_is-opened");
      if (openedModal) {
          closeModal(openedModal);
      }
  }
}
