import { redirectToLogin } from './spotifyApiUtil';
import queryString from 'query-string';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', redirectToLogin)

  const parsed = queryString.parse(window.location.search)
  if (access_token in parsed) {
    console.log(parsed)
  } else {
    console.log('no access token')
  }
})