import {
  isAuthenticated,
  fetchArtists,
  formatResponse
} from './util'

import Hero from './hero';
import Chart from './chart';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  if (isAuthenticated()) {
    fetchArtists(response => {
      const data = formatResponse(response);
      const charts = Chart(data);
      body.appendChild(charts[0]);
      body.appendChild(charts[1]);
    })
  } else {
    body.appendChild(Hero.render());
  }
})

  