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
  const formattedData = Object.keys(genres)
    .map(genre => ({
      name: genre,
      children: genres[genre]
    }))
    .sort((a, b) => d3.descending(a.children.length, b.children.length))
  
  // create count-based hierarchy
  const hierarchy = d3.hierarchy({ children: formattedData })
    .count();

  // set chart width and height
  const width = 500;
  const height = 500;
  
  // pack data
  const root = d3.pack()
    .size([width, width])
    .padding(2)
    (hierarchy)

  let focus = root;

  const svg = d3.select(hook)
    .append("svg")
      .attr('width', width)
      .attr('height', height)
    .on('click', () => zoomTo(root))

  const green = '#1db954'

  // map genres to circle nodes
  const strokeWidth = 2;
  const genreRings = svg
    .append('g')
      .attr('id', 'genreRings')
    .selectAll('circle')
    .data(root.children)
    .join('circle')
      .attr('fill-opacity', '0')
      .attr('stroke', green)
      .attr('stroke-width', strokeWidth)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .on('mouseover', function(datum) {
        d3.select(this)
          .attr('stroke', 'white')
          .attr('cursor', 'pointer')
        bars
          .attr('fill', d => d.name === datum.data.name ? green : 'white')
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

  const artistCircles = svg
    .append('g')
      .attr('id', 'artistCircles')
    .selectAll('clipPath')
    .data(root.leaves())
    .join('clipPath')
      .attr('id', (_, i) => `clip${i}`)
    .append('circle')

  // move nodes to initial positions
  svg.selectAll('circle')
    .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)

  // set image width
  const imageWidth = 30;

  // Add image on top of each artistCircle
  const artistImages = svg
    .append('g')
      .attr('id', 'artistImages')
    .selectAll('image')
    .data(root.leaves())
    .join('image')
      .attr('width', imageWidth)
      .attr('height', imageWidth)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip${i})`)
      .attr('x', d => d.x - imageWidth / 2)
      .attr('y', d => d.y - imageWidth / 2)

  const artistTitles = artistImages.append('title')
    .text(d => d.data.name)

  const zoomTo = destination => {
    focus = destination;
    const scaleFactor = width / (destination.r * 2);
    const transition = d3.transition().duration(750) 
    const translateCircle = (start, end) => (start - end) * scaleFactor + width / 2;
    const translateImage = (start, end) => (start - end - imageWidth / 2) * scaleFactor + width / 2;

    svg.selectAll('circle')
      .transition(transition)
        .attr('cx', d => translateCircle(d.x, destination.x))
        .attr('cy', d => translateCircle(d.y, destination.y))
        .attr('r', d => d.r * scaleFactor)
    artistImages
      .transition(transition)
        .attr('x', d => translateImage(d.x, destination.x))
        .attr('y', d => translateImage(d.y, destination.y))
        .attr('width', imageWidth * scaleFactor)
        .attr('height', imageWidth * scaleFactor)
        .attr('pointer-events', focus === root ? 'none' : 'visiblePainted')
  }
    
  zoomTo(root)

  const margin = { top: 50, right: 50, bottom: 50, left: 150 }
  const innerWidth = width - margin.right - margin.left
  const innerHeight = height - margin.top - margin.bottom

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(formattedData, d => d.children.length)])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(formattedData.map(d => d.name))
    .range([0, innerHeight])
    .padding(0.1)
  
  const barChart = d3.select(hook)
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('color', 'white')
      .attr('class', 'bar-chart')
  
  const innerChart = barChart.append('g') 
    .attr('transform', `translate(${margin.left} ${margin.top})`)
  
  const bars = innerChart.append('g')
    .selectAll('rect')
    .data(formattedData)
    .join('rect')
      .attr('width', d => xScale(d.children.length))
      .attr('height', yScale.bandwidth())
      .attr('y', d => yScale(d.name))
      .attr('fill', 'white')
    .on('mouseover', function(datum) {
      d3.select(this)
        .attr('fill', green)
      genreRings
        .attr('stroke', d => d.data.name === datum.name ? 'white' : green)
    })
    .on('mouseout', function() {
      d3.select(this)
        .attr('fill', 'white')
    });
  
  const yAxisG = innerChart.append('g')
    .call(d3.axisLeft(yScale))

  yAxisG.selectAll('.domain, .tick line')
    .remove();

  const xAxisG = innerChart.append('g')
    .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.selectAll('.domain')
    .remove();

  xAxisG.append('text')
    .text('Number of Artists')
    .attr('fill', 'white')
    .attr('x', innerWidth / 2)
    .attr('y', 30)

  innerChart.append('text')
    .text('Top genres by number of artists')
    .attr('fill', 'white')
    .attr('y', -5)  
  
  zoomTo(root)
}