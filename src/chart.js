import * as d3 from 'd3';

export default (data, selector) => {
  // format input data
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
  
  const formattedData = Object.keys(genres).map(genre => ({
    name: genre,
    children: genres[genre]
  }));
  
  // create root for hierarchy
  const root = {children: formattedData}

  // create count-based hierarchy
  const hierarchy = d3.hierarchy(root).count();

  // set chart width and height
  const width = 900;
  const height = width;
  
  // pack data
  const pack = d3.pack()
    .size([width, height])
    .padding(2);
  const packedData = pack(hierarchy);

  // append svg to parent and format it
  const hook = d3.select(selector);
  const svg = hook.append("svg")
    .attr('viewbox', [0, 0, width, height])
    .style('width', `${width}px`)
    .style('height', `${height}px`)
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');


  // map data to circle nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(packedData.descendants().slice(1))
    .enter()
    .append('circle')
      .attr('fill', d => d.children ? "#1db954" : "white")
      .attr('cx', d => `${d.x}`)
      .attr('cy', d => `${d.y}`)
      .attr('r', d => `${d.r}`)

  // set image width and height
  const imageWidth = 40;
  const imageHeight = imageWidth;

  const image = svg.append('g')
    .selectAll('image')
    .data(packedData.leaves())
    .join('image')
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip-${i})`)
      .attr('x', d => d.x - (imageWidth / 2))
      .attr('y', d => d.y - (imageHeight / 2))

  // const labels = parent.selectAll('text')
  //   .data(packedData.descendants().slice(1))
  //   .enter()
  //   .append('text')
  //   .text(d => d.data.name)
  //   .attr('transform', d => `translate(${d.x + 1}, ${d.y + 1})`)
}