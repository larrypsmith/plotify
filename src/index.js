import { redirectToLogin } from './spotifyApiUtil';
import queryString from 'query-string';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', redirectToLogin)

  const parsed = queryString.parse(window.location.href)
  console.log(parsed)
})