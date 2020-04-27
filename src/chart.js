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
  // const height = window.innerHeight - header.offsetHeight;
  // const width = height;
  const height = 500;
  const width = 500;
  
  // pack data
  const root = d3.pack()
    .size([width, height])
    .padding(2)
    (hierarchy)

  let focus = root;

  // append svg to parent and format it
  const hook = d3.select(selector);

  const svg = hook.append("svg")
    .attr('width', `${width}px`)
    .attr('height', `${height}px`)
    .on('click', () => zoomTo(root))

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
      .on('click', d => {
        if (focus !== d) {
          debugger
          d3.event.preventDefault();
          d3.event.stopPropagation();
          zoomTo(d);
        }
      })

  const zoomTo = destination => {
    focus = destination;
    const scaleFactor = width / (destination.r * 2);
    genreRings.transition()
      .duration(750)
        .attr('cx', d => (d.x - destination.x) * scaleFactor + (width / 2))
        .attr('cy', d => (d.y - destination.y) * scaleFactor + (height / 2))
        .attr('r', d => d.r * scaleFactor)
    artistImages.transition()
      .duration(750)
        .attr('x', d => (d.x - destination.x) * scaleFactor + (width / 2))
        .attr('y', d => (d.y - destination.y) * scaleFactor + (height / 2))
        .attr('width', imageWidth * scaleFactor)
        .attr('height', imageHeight * scaleFactor)
    artistCircles.transition()
      .duration(750)
        .attr('cx', d => (d.x - destination.x) * scaleFactor + (width / 2))
        .attr('cy', d => (d.y - destination.y) * scaleFactor + (height / 2))
        .attr('r', d => d.r * scaleFactor)
  }

  // map leaves (artists) to circle nodes
  const artistsGroup = svg
    .append('g')
      .attr('id', 'artistCircles')

  const artistClipPaths = artistsGroup
    .selectAll('clipPath')
    .data(root.leaves())
    .join('clipPath')
      .attr('id', (_, i) => `clip${i}`)

  const artistCircles = artistClipPaths
    .append('circle')
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)


  // set image width and height
  const imageWidth = 35;
  const imageHeight = imageWidth;

  // Add image on top of each artistCircle
  const artistImages = svg
    .append('g')
      .attr('id', 'artistImages')
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
}