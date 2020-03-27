import * as d3 from 'd3';

export default (data, selector) => {

  // format input data
  let genres = {};

  data.forEach(artist => {
    artist.genres.forEach(genre => {
      if (!genres[genre]) genres[genre] = [];
      genres[genre].push(artist.name);
    })
  });

  data = Object.keys(genres).map(genre => ({
    name: genre,
    children: genres[genre]
  }));

  // create root for hierarchy
  const root = {children: data}

  // create count-based hierarchy
  const hierarchy = d3.hierarchy(root).count();

  // set chart width and height
  const width = 500;
  const height = width;
  
  // pack data
  const pack = d3.pack()
    .size([width, height])
    .padding(2);
  const packedData = pack(hierarchy);

  // append svg to parent and format it
  const parent = d3.select(selector);
  const svg = parent.append("svg")
    .style('width', `${width}px`)
    .style('height', `${height}px`)
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');

  // create color scale
  const color = d3.scaleLinear()
    .domain([0, packedData.height])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)

  // map data to circles
  const node = svg.append('g')
    .selectAll('circle')
    .data(packedData.descendants().slice(1))
    .join('circle')
    .attr('fill', d => d.children ? "#1db954" : "white")
    .attr('transform', d => `translate(${d.x + 1}, ${d.y + 1})`)
    .attr('r', d => `${d.r}`)
}