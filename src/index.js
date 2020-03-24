import { redirectToLogin } from './spotifyApiUtil';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', redirectToLogin)
})