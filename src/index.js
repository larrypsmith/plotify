import { redirectToLogin, isAuthenticated, getAccessToken } from './util'

import Welcome from './welcome';
import Chart from './chart';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  main.innerHTML = "";
  
  if (isAuthenticated()) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
    xhr.onload = function () {
      const response = JSON.parse(xhr.response);
      const data = response.items.map(artist => ({
        name: artist.name,
        genres: artist.genres
      }));
      Chart(data, 'main');
    }
    xhr.send();
  } else {
    main.appendChild(Welcome.render())
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  }
})

  