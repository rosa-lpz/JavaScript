// Sample data
const data = [25, 30, 45, 60, 20, 65, 75, 40];

d3.json('data.json').then(function(data) {
    // Process the data and create the chart as shown earlier
  });

// Set chart dimensions
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create the SVG container
const svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Create scales for x and y axes
const x = d3.scaleBand()
    .domain(d3.range(data.length)) // Indexes of data points
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data)]) // Set the domain to the max data value
    .nice() // Optional: makes the axis values more readable
    .range([height, 0]);

// Add the bars to the chart
svg.selectAll('.bar')
  .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => x(i))
    .attr('y', d => y(d))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d));

// Add x-axis
svg.append('g')
    .selectAll('.tick')
    .data(x.domain())
    .enter().append('text')
    .attr('class', 'tick')
    .attr('x', d => x(d) + x.bandwidth() / 2)
    .attr('y', height + 20)
    .attr('text-anchor', 'middle')
    .text((d, i) => `Item ${i + 1}`);

// Add y-axis
const yAxis = svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y));

yAxis.selectAll('text')
    .style('font-size', '12px')
    .style('fill', 'black');
