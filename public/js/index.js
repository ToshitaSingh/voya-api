/* eslint-disable */
import { login, logout } from './login.js';
import { updateData } from './updateSettings.js';
import { displayMap } from './leaflet.js';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const loginBtn = document.querySelector('.btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userNameInput = document.getElementById('name');
const userEmailInput = document.getElementById('email');

// DELEGATION
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);
  displayMap(locations);
}

document.addEventListener('DOMContentLoaded', () => {
  if (loginForm && loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput?.value;
      const password = passwordInput?.value;
      login(email, password);
    });
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = userNameInput?.value;
    const email = userEmailInput?.value;

    updateData(name, email);
  });
}
