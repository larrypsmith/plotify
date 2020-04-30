import {
  redirectToLogin,
  isAuthenticated,
  fetchArtists,
  formatResponse
} from './util'

import Welcome from './welcome';
import Chart from './chart';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  
  const main = document.querySelector('main');
  main.innerHTML = "";

  if (isAuthenticated()) {
    fetchArtists((response) => {
      const data = formatResponse(response);
      Chart(data, main);
    })
  } else {
    main.appendChild(Welcome.render());
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  }
})

  