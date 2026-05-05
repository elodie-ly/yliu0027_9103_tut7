const numSegments = 50;

let segments = [];

let img;

let fit ={
  x: 0,
  y: 0,
  w: 0,
  h: 0
};

let pixelcolors = [];

let drawSegments = true;

let canvsasAspectRatio = 0;


function preload() {
  img = loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  imgAspect = img.width / img.height;
  canvasAspect = width / height;

  calculateFit();

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  for (let row = 0; row < numSegments; row++) {
    for (let col = 0; col < numSegments; col++) {
      let segmentColor = img.get(col * segmentWidth + segmentWidth / 2, row * segmentHeight + segmentHeight / 2);
      let segment = new ImageSegment(row, col, segmentColor);
      segments.push(segment);
    }

  

    }
  }


function draw() {
  background(220);

  if (drawSegments) {
    for(const segment of segments) {
     
      segment.draw();
    }
  } else {
    image(img, fit.x, fit.y, fit.w, fit.h);
  }
  fill(pixelcolors);
  stroke(255);
  circle(mouseX, mouseY, 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateFit();
}

function calculateFit() { 
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  if (imgAspect > canvasAspect) {
    fit.w = width;
    fit.h = width / imgAspect;
    fit.x = 0;
    fit.y = (height - fit.h) / 2;
  } else {
    fit.h = height;
    fit.w = height * imgAspect;
  }
    fit.x = (width - fit.w) / 2;
    fit.y = (height - fit.h) / 2;
  }

class ImageSegment {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.color = this.sampleColor();
  }


sampleColor() {
  let sampleW = img.width / numSegments;
  let sampleH = img.height / numSegments;
  let x = this.col * sampleW + sampleW / 2;
  let y = this.row * sampleH + sampleH / 2;
  return img.get(x, y);
}
draw() {
    let w = fit.w / numSegments;
    let h = fit.h / numSegments;

    let x = fit.x + this.col * w;
    let y = fit.y + this.row * h;

    stroke(0);
    fill(this.color);
    rect(x, y, w, h);

}
}

function keyPressed() {
  if (key == 's') {
    drawSegments = !drawSegments;
    
   }
}
function mouseMoved(){
  pixelcolors = img.get(mouseX, mouseY);
}

