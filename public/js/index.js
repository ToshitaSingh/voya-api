/* eslint-disable */
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';
import { displayMap } from './leaflet.js';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const loginBtn = document.querySelector('.btn');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);
  displayMap(locations);
}

document.addEventListener('DOMContentLoaded', () => {
  if (loginForm && loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
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
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // updateSettings({ name, email }, 'data');

    updateSettings(form, 'data');
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    console.log(passwordCurrent, password, passwordConfirm);
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
