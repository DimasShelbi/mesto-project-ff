// api.js

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: 'a581d94f-cb25-4c50-b8d1-9a07a522768e',
    'Content-Type': 'application/json'
  }
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};
