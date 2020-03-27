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
  
  // create root
  const root = {children: formattedData}

  // create count-based hierarchy
  const hierarchy = d3.hierarchy(root).count();

  // set chart width and height
  const width = 700;
  const height = width;
  
  // pack data
  const pack = d3.pack()
    .size([width, height])
    .padding(2);
  const packedData = pack(hierarchy);

  // append svg to parent and format it
  const hook = d3.select(selector);
  const svg = hook.append("svg")
    .style('width', `${width}px`)
    .style('height', `${height}px`)
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');

  // map genres to circle nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(packedData.children)
    .join('circle')
      .attr('fill', '#1db954')
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)

  // map leaves (artists) to circle nodes
  const leaf = svg.append('g')
    .selectAll('clipPath')
    .data(packedData.leaves())
    .enter()
    .append('clipPath')
      .attr('id', (d, i) => `clip-${i}`)
    .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', '5')
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)
    

  // set image width and height
  const imageWidth = 35;
  const imageHeight = imageWidth;

  // Add image on top of each leaf
  const image = svg.append('g')
    .selectAll('image')
    .data(packedData.leaves())
    .join('image')
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip-${i})`)
      .attr('x', d => d.x - imageWidth / 2)
      .attr('y', d => d.y - imageHeight / 2)

  // const labels = parent.selectAll('text')
  //   .data(packedData.descendants().slice(1))
  //   .enter()
  //   .append('text')
  //   .text(d => d.data.name)
  //   .attr('transform', d => `translate(${d.x + 1}, ${d.y + 1})`)
}