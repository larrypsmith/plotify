import { redirectToLogin } from './spotifyApiUtil';
import queryString from 'query-string';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', redirectToLogin)

  const parsed = queryString.parse(window.location.search)
  if (Object.keys(parsed).includes(access_token)) {
    debugger
    console.log(parsed)
  } else {
    console.log('no access token')
  }
})