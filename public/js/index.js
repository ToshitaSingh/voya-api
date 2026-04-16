/* eslint-disable */
import { login, logout } from './login.js';
import { displayMap } from './leaflet.js';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const loginBtn = document.querySelector('.btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const logoutBtn = document.querySelector('.nav__el--logout');

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
