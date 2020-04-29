import { redirectToLogin } from './util';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.login-button');
  loginButton.addEventListener('click', redirectToLogin)
});