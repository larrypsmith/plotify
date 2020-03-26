import { redirectToLogin, isAuthenticated, getAccessToken } from './util'

import BubbleChart from './BubbleChart';
import Welcome from './Welcome';

import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  main.innerHTML = "";

  if (isAuthenticated()) {
    const accessToken = getAccessToken();
    debugger
    fetch(`https://api.spotify.com/v1/me/top/artists?limit=50`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Authorization': `Bearer ${accessToken}`}
    })
      .then(res => console.log(res))
      .then(data => console.log(data))
  } else {
    debugger
    main.appendChild(Welcome.render())
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', redirectToLogin);
  }
})

// document.addEventListener('DOMContentLoaded', () => {
//   const main = document.querySelector('main')
//   main.innerHTML = "";
  
//   if (isAuthenticated()) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
//     xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
//     xhr.onload = function () {
//       const response = JSON.parse(xhr.response);
//       const artists = response.items.map(artist => ({
//         name: artist.name,
//         genres: artist.genres
//       }));

//       const chart = new BubbleChart(artists);
//       const genres = chart.genres;
//       const root = {children: genres};
//       let hierarchy = d3.hierarchy(root).count();
//       const width = 500;
//       const height = width;

//       let pack = d3.pack()
//         .size([width, height])
//         .padding(2)
//       let packedData = pack(hierarchy);

//       const main = d3.select('main')

//       const svg = main.append("svg")
//         .style('width', `${width}px`)
//         .style('height', `${height}px`)
//         .attr('font-size', 10)
//         .attr('font-family', 'sans-serif')
//         .attr('text-anchor', 'middle');

//       const color = d3.scaleLinear()
//         .domain([0, packedData.height])
//         .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
//         .interpolate(d3.interpolateHcl)

//       const node = svg.append('g')
//         .selectAll('circle')
//         .data(packedData.descendants().slice(1))
//         .join('circle')
//           .attr('fill', d => d.children ? color(d.depth) : "white")
//           .attr('transform', d => `translate(${d.x + 1}, ${d.y + 1})`)
//           .attr('r', d => `${d.r}`)

//       debugger

//     }
//     xhr.send();
//   } else {
//     main.appendChild(Welcome.render())
//     const loginButton = document.querySelector('button');
//     loginButton.addEventListener('click', redirectToLogin);
//   }
// })

  