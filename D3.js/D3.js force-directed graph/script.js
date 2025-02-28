// Sample graph data (nodes and links)
const graph = {
    nodes: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
        { id: 'F' }
    ],
    links: [
        { source: 'A', target: 'B' },
        { source: 'A', target: 'C' },
        { source: 'B', target: 'D' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'F' },
        { source: 'F', target: 'A' }
    ]
};

// Set up the dimensions of the SVG container
const width = window.innerWidth;
const height = window.innerHeight;

// Create the SVG container
const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

// Create the force simulation
const simulation = d3.forceSimulation(graph.nodes)
    .force("link", d3.forceLink(graph.links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-300))  // Repelling force
    .force("center", d3.forceCenter(width / 2, height / 2));  // Center the graph

// Create the links (edges)
const link = svg.append("g")
    .selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link");

// Create the nodes (circles)
const node = svg.append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .attr("fill", "steelblue")
    .call(d3.drag()  // Allow nodes to be dragged
        .on("start", dragStart)
        .on("drag", dragMove)
        .on("end", dragEnd));

// Add labels to the nodes
node.append("title")
    .text(d => d.id);

// Add simulation tick function to update the graph
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
});

// Drag functions to make nodes interactive
function dragStart(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragMove(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragEnd(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}
