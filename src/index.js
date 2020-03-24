import { redirectToLogin } from './util';
import QueryString from 'query-string';

document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');
  const venn = document.getElementById('venn')
  const parsed = QueryString.parse(window.location.search)
  
  if ('access_token' in parsed) {
    welcome.setAttribute('style', 'display: none')
  } else {
    venn.setAttribute('style', 'display: none')
    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', redirectToLogin)
  }
})