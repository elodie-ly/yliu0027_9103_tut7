//lets create an empty array to store our balls in
let balls = [];

//and a variable for how many balls, lets make a lot!
const numberOfballs = 50;

function setup() {
  createCanvas(400, 400);
//here we use a for loop to create a lot of new balls
  for (let i = 0; i < numberOfballs; i++) {
    //to create a new ball we need to call the Ball class constructor and give it values
    //for the starterXPos, starterYPos and starterRadius
    let ball = new Ball(random(width/4, 3*width/4), random(height/4,3*height/4), random(10, 50));
    //then we use the push() function to add the new ball to the balls array
    balls.push(ball);
  }
}

function draw() {
  background(222);
  //this is a for of loop, it is a special type of for loop that is used to loop through arrays
  //we don't use a numerical iterator like in a for loop
  //instead we use a variable to represent each item in the array
  //for each element in the array the ball variable will be set to that element
  //it 'becomes' each element  temporarily, until it has looped through all the elements
  for (let ball of balls) {
    ball.move();
    ball.display();
  }
}

//this is the Ball class, it is a blueprint for creating balls
//Here we define all the information and functions that a ball needs
class Ball {
  //this is the class constructor - it is called when you create a new Ball,
  //it is like the recipe for creating a ball, it needs some information to start with
  constructor(starterXPos, starterYPos, starterRadius) {
    //the this keyword refers to the object that is being created
    //so these parameters are parameters of the ball that is being created
    this.ballXPos = starterXPos;
    this.ballYPos = starterYPos;
    this.ballRadius = starterRadius;
    this.ballXSpeed = random(-5, 5);
    this.ballYSpeed = random(-5, 5);
  }

  //we want the ball to move, so we need a move function
  move() {
    this.ballXPos += this.ballXSpeed;
    this.ballYPos += this.ballYSpeed;

    // Check if the ball is off the screen horizontally
    if (this.ballXPos + this.ballXSpeed + this.ballRadius / 2 > width 
    || this.ballXPos + this.ballXSpeed - this.ballRadius / 2 < 0) {
      this.ballXSpeed *= -1;
    }

    // Check if the ball is off the screen vertically
    if (this.ballYPos + this.ballRadius / 2 > height 
    || this.ballYPos - this.ballRadius / 2 < 0) {
      this.ballYSpeed *= -1;
    }
  }
  
//when we have calculated the new position of the ball we want to display it
  display() {
    fill(0, 255, 0);
    circle(this.ballXPos, this.ballYPos, this.ballRadius);
  }
}
