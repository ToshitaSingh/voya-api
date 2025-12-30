// /* eslint-disable */

// console.log('login.js loaded');

// console.log('axios in login.js:', typeof axios);

// const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//     });

//     if (res.data.status === 'success') {
//       alert('Logged In successfully!!');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

// document.querySelector('.form').addEventListener('click', (e) => {
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   login(email, password);
// });

/* eslint-disable */

console.log('login.js loaded');
console.log('axios in login.js:', typeof axios);

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email, password },
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form .form');
  if (!form) return;

  const btn = form.querySelector('button');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
});
