function getCustomErrorMessage(inputElement) {
    if (inputElement.validity.valueMissing) {
        return "Это поле обязательно для заполнения.";
    }
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
        return `Длина поля должна быть от ${inputElement.minLength} до ${inputElement.maxLength} символов.`;
    }
    if (inputElement.validity.patternMismatch) {
        return inputElement.dataset.errorMessage;
    }
    return inputElement.validationMessage;
}

// Скрытие ошибки
function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
        errorElement.textContent = '';
    }
}

// Показ ошибки
function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    }
}

// Проверка валидности поля
function checkInputValidity(formElement, inputElement, settings) {
    const errorMessage = getCustomErrorMessage(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

// Установка состояния кнопки
function setSubmitButtonState(buttonElement, isActive, settings) {
    if (isActive) {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

// Проверка состояния кнопки
function toggleButtonState(inputList, buttonElement, settings) {
    const isFormValid = inputList.every((inputElement) => inputElement.validity.valid);
    setSubmitButtonState(buttonElement, isFormValid, settings);
}

// Добавление обработчиков к полям формы
function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });

    toggleButtonState(inputList, buttonElement, settings);
}

// Включение валидации
export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

// Очистка ошибок валидации
export function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });

    setSubmitButtonState(buttonElement, false, settings);
}
