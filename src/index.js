import {
  isAuthenticated,
  fetchArtists,
  formatResponse,
  redirectToLogin
} from './util'

import { demoChartData } from './data';

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
    app.innerHTML = "";
    app.appendChild(AuthHeader.render());
    app.appendChild(main);
    main.appendChild(Hero.render());
    const loginButton = document.querySelector('.login-btn');
    loginButton.addEventListener('click', redirectToLogin);

    const demoButton = document.querySelector('.demo-btn');
    demoButton.addEventListener('click', () => {
      app.innerHTML = ""
      app.appendChild(ProtectedHeader.render());
      app.appendChild(main)
      main.innerHTML = "";
      Chart(demoChartData, main);
    })
  };
})