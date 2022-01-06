// particle config
var particles = [];
const noiseScale = 500;
const noiseStrength = 2;

// color config
const colorWeights = [0.5, 0.25, 0.1, 0.05, 0.05, 0.05];
const colors = [
  "#3d5d88",
  "#c03c37",
  "#f5d376",
  "#513f30",
  "#bfd8ce",
  "##dfd7c7",
];

// size config
const sizeWeights = [0.5, 0.3, 0.1, 0.05, 0.05, 0.01];
const sizeRanges = [(5, 10),(10, 15), (1, 3), (20, 30), (30, 50), (70, 100)];

// function to get random weighted element from an array of values given another array of associated weights
function selectWithProbability(weights, data) {
  var winner = Math.random();
  var threshold = 0;
  for (let i = 0; i < weights.length; i++) {
    threshold += parseFloat(weights[i]);
    if (threshold > winner) {
      return data[i];
    }
  }
}

// TODO
// function that checks if one particle collides with any other currently on canvas
function isColliding(data, num) {
  for (i = 0; i < num; i++) {
    var dx =
      data.loc.x + data.loc.z - (particles[i].loc.x + particles[i].loc.z);
    var dy =
      data.loc.y + data.loc.z - (particles[i].loc.y + particles[i].loc.z);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < data.loc.z + particles[i].loc.z) {
      // collision detected!
      return true;
    } else {
      // no collision
      return false;
    }
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);
  noiseDetail(1);

  // density of flow field 
  let density = 10;

  // spacing between particles
  let spacing = width / density;

  // generate particles
  for (let i = 0; i < width; i += spacing) {
    for (let j = 0; j < height; j += spacing) {
      var x = i + random(-10, 10);
      var y = j + random(-10, 10);
      var z = random(selectWithProbability(sizeWeights, sizeRanges));

      // generate initial coordinates
      var coords = createVector(x, y, z);
      
      // initial placeholder angle for particle
      let angle = 0;
      var dir = createVector(cos(angle), sin(angle));

      // select speed for particle
      var speed = random(2, 10);

      // select color
      var color = selectWithProbability(colorWeights, colors);

      var p = new Particle(coords, dir, speed, color);
      particles.push(p);
    }
  }
}

function draw() {
  noStroke();
  fill(234, 228, 217, 25);

  rect(0, 0, width, height);
  for (let i = 1; i < particles.length; i++) {
    particles[i].run();
  }
}
