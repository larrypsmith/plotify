import {
  isAuthenticated,
  fetchArtists,
  formatResponse,
  redirectToLogin
} from './util'

import Hero from './hero';
import Chart from './chart';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  
  const main = document.querySelector('main');
  main.innerHTML = "";

  if (isAuthenticated()) {
    fetchArtists(response => {
      const data = formatResponse(response);
      Chart(data, main);
    })
  } else {
    main.appendChild(Hero.render());
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  }
})