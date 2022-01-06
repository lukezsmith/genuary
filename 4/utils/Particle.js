class Particle {
  constructor(coords, direction, speed, colour) {
    this.coords = coords;
    this.direction = direction;
    this.speed = speed;
    this.colour = colour;
  }

  run() {
      this.follow();
      this.handleEdges();
      this.show();
  }

  // get particles to follow the 'flow field'
  follow() {
      // adding framecount seems to make the angle more random w.r.t time
    let angle =
      noise(
        this.coords.x / noiseScale,
        this.coords.y / noiseScale,
        frameCount / noiseScale
      ) *
      TWO_PI *
      noiseStrength;
    this.direction.x = sin(angle);
    this.direction.y = cos(angle);
    let vel = this.direction.copy();
    

    this.coords.add(vel.mult(this.speed* 0.8) );
  }

  // display particles
  show() {
    fill(this.colour);
    ellipse(this.coords.x, this.coords.y, this.coords.z);
  }


  // redraw particle randomly when it hits a (noisy) canvas edge
  handleEdges() {
    if (
      this.coords.x < windowWidth * random(0.05, 0.15) ||
      this.coords.x > windowWidth * random(0.85, 0.95) ||
      this.coords.y < windowHeight * random(0.05, 0.15) ||
      this.coords.y > windowHeight * random(0.85, 0.95)
    ) {
      this.coords.x = random(
        windowWidth * random(0.05, 0.15),
        windowWidth * random(0.85, 0.95)
      );
      this.coords.y = random(
        windowHeight * random(0.05, 0.15),
        windowHeight * random(0.85, 0.95)
      );
      this.coords.z = random(selectWithProbability(sizeWeights, sizeRanges));
    }
  }
}
