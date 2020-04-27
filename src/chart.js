import * as d3 from 'd3';

export default (data, hook) => {
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

  // set chart width and height
  const height = 500;
  const width = 500;
  
  // pack data
  const root = d3.pack()
    .size([width, height])
    .padding(2)
    (hierarchy)

  let focus = root;

  const svg = d3.select(hook)
    .append("svg")
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
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
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
          d3.event.preventDefault();
          d3.event.stopPropagation();
          zoomTo(d);
        }
      })

  const genreTitles = genreRings.append('title')
    .text(d => d.data.name)

  // map leaves (artists) to circle nodes
  const artistsGroup = svg
    .append('g')
      .attr('id', 'artistCircles')

  const artistCircles = artistsGroup
    .selectAll('clipPath')
    .data(root.leaves())
    .join('clipPath')
      .attr('id', (_, i) => `clip${i}`)
    .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)

  // set image width and height
  const imageWidth = 30;
  const imageHeight = imageWidth;

  // Add image on top of each artistCircle
  const artistImages = svg
    .append('g')
      .attr('id', 'artistImages')
    .selectAll('image')
    .data(root.leaves())
    .join('image')
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip${i})`)
      .attr('x', d => d.x - imageWidth / 2)
      .attr('y', d => d.y - imageHeight / 2)

  debugger

  const artistTitles = artistImages.append('title')
    .text(d => d.data.name)

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
      .attr('x', d => (d.x - imageWidth / 2 - destination.x) * scaleFactor + width / 2)
      .attr('y', d => (d.y - imageHeight / 2 - destination.y) * scaleFactor + height / 2)
      .attr('width', imageWidth * scaleFactor)
      .attr('height', imageHeight * scaleFactor)
      .attr('pointer-events', focus === root ? 'none' : 'visiblePainted')
    artistCircles.transition()
      .duration(750)
      .attr('cx', d => (d.x - destination.x) * scaleFactor + (width / 2))
      .attr('cy', d => (d.y - destination.y) * scaleFactor + (height / 2))
      .attr('r', d => d.r * scaleFactor)
      .attr('pointer-events', focus === root ? 'none' : 'visiblePainted')
  }
    
  zoomTo(root)


}