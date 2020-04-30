import {
  isAuthenticated,
  fetchArtists,
  formatResponse,
  redirectToLogin
} from './util'

import Hero from './hero';
import Chart from './chart';
import ProtectedHeader from './protectedHeader';
import AuthHeader from './authHeader';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  const main = document.createElement('main');

  if (isAuthenticated()) {
    app.appendChild(ProtectedHeader.render());
    app.appendChild(main);
    fetchArtists(response => {
      const data = formatResponse(response);
      Chart(data, main);
    })
  } else {
    app.appendChild(AuthHeader.render());
    app.appendChild(main);
    main.appendChild(Hero.render());
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  };
})