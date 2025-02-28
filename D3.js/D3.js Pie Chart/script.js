// Sample data
const data = [10, 20, 30, 40];

// Set the dimensions of the chart
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Set up the color scale for the slices
const color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeCategory10);  // Using a pre-defined color palette

// Create the SVG container
const svg = d3.select("#pie-chart")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);  // Center the pie chart

// Create the pie chart
const pie = d3.pie();

// Create the arc generator
const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);  // Full pie chart (no hole in the middle)

// Create the slices
const slices = svg.selectAll(".slice")
    .data(pie(data))
  .enter().append("g")
    .attr("class", "slice");

// Append paths for the slices
slices.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))  // Color each slice
    .attr("class", "slice");

// Optional: Add labels to the slices
slices.append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", ".35em")
    .text((d) => d.data)  // Show the value in each slice
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle");


slices.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("class", "slice")
    .on("mouseover", function(event, d) {
        d3.select(this).style("opacity", 0.7);  // Change opacity on hover
    })
    .on("mouseout", function(event, d) {
        d3.select(this).style("opacity", 1);  // Reset opacity when mouse leaves
    });