import { redirectToLogin } from './util'
import QueryString from 'query-string'

import BubbleChart from './BubbleChart';
import Welcome from './Welcome';


const isAuthenticated = () => {
  const hash = window.location.hash.substr(1);
  return hash.includes('access_token');
}

const getAccessToken = () => {
  const hash = window.location.hash.substr(1);
  const parsedHash = QueryString.parse(hash);
  return parsedHash.access_token;
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  main.innerHTML = "";
  
  if (isAuthenticated()) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
    xhr.onload = function () {
      const response = JSON.parse(xhr.response);
      const artists = response.items.map(artist => ({
        name: artist.name,
        genres: artist.genres
      }));
      const venn = new BubbleChart(artists);
      main.appendChild(venn.render())
    }
    xhr.send();
  } else {
    main.appendChild(Welcome.render())
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  }
})