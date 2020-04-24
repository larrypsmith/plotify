import * as d3 from 'd3';

export default (data, selector) => {
  // create genres object
  let genres = {};

  data.forEach(artist => {
    artist.genres.forEach(genre => {
      if (!genres[genre]) genres[genre] = [];
      genres[genre].push({
        name: artist.name,
        imageUrl: artist.imageUrl
      });
    })
  });

  // delete genres with only 1 member
  Object.keys(genres).forEach(genre => {
    let artists = genres[genre]
    if (artists.length < 2) delete genres[genre]
  })

  // format data for D3 hierarchy
  const formattedData = Object.keys(genres).map(genre => ({
    name: genre,
    children: genres[genre]
  }));
  
  // create count-based hierarchy
  const hierarchy = d3.hierarchy({ children: formattedData })
    .count();

  // get header 
  const header = document.querySelector("header");

  // set chart width and height
  const height = window.innerHeight - header.offsetHeight;
  const width = height;
  
  // pack data
  const root = d3.pack()
    .size([width, height])
    .padding(2)
    (hierarchy)

  let focus = root;
  let view = [root.x, root.y, root.r * 2];

  // append svg to parent and format it
  const hook = d3.select(selector);

  const svg = hook.append("svg")
    .attr('width', `${width}px`)
    .attr('height', `${height}px`)
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle')

  // map genres to circle nodes
  const strokeWidth = 2;
  const genreRings = svg
    .append('g')
      .attr('id', 'genreRings')
    .selectAll('circle')
    .data(root.children)
    .join('circle')
      .attr('fill-opacity', '0')
      .attr('stroke', '#1db954')
      .attr('stroke-width', strokeWidth)
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)
      .on('mouseover', function() {
        d3.select(this)
          .attr('stroke', 'white')
          .attr('cursor', 'pointer')
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke', '#1db954')
          .attr('cursor', 'auto')
      })
      .on('click', d => focus !== d && (zoomTo(d)))

  // map leaves (artists) to circle nodes
  const artistCircles = svg
    .append('g')
      .attr('id', 'artistCircles')
    .selectAll('clipPath')
    .data(root.leaves())
    .enter()
    .append('clipPath')
      .attr('id', (d, i) => `clip${i}`)
    .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', '5')
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)
      
  // set image width and height
  const imageWidth = 35;
  const imageHeight = imageWidth;

  // Add image on top of each artistCircle
  const image = svg.append('g')
    .selectAll('image')
    .data(root.leaves())
    .join('image')
      .attr('pointer-events', 'none')
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip${i})`)
      .attr('x', d => d.x - imageWidth / 2)
      .attr('y', d => d.y - imageHeight / 2)

  // function zoomTo(d) {
  //   const {x, y, r} = d;
  //   focus = d;
  //   svg.attr('viewBox', `${x - r - strokeWidth / 2} ${y - r - strokeWidth / 2} ${r * 2 + strokeWidth} ${r * 2 + strokeWidth}`)
  // }
}