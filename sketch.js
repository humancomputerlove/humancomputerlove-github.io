"use strict";

// add perlin noise back https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=7&t=0s

let bubbleArray = [];
let numOfBubbles = 69;
let bubbleArrayLength;



function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('bubbleCanvas');

  frameRate(30);



  // bubble animation
  for (let i = 0; i < numOfBubbles; i++) {
    bubbleArray.push(new Bubble(20, 50));
    bubbleArray.push(new Bubble(windowWidth / 10, windowWidth / 10 + 10));
    bubbleArray.push(new Bubble(windowWidth / 5, windowWidth / 5 + 10));
    bubbleArray.push(new Bubble(windowWidth * 3 / 5, windowWidth * 3 / 5 + 10));
    bubbleArray.push(new Bubble(windowWidth * 5 / 6, windowWidth * 5 / 6 + 10));
    bubbleArray.push(new Bubble(windowWidth - 33, windowWidth - 50));
  }

  bubbleArrayLength = bubbleArray.length;


  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

}

function draw() {
  clear();

  noStroke();

  for (let i = 0; i < bubbleArrayLength; i++) {
    bubbleArray[i].drawBubble();

    bubbleArray[i].moveBubble();

    bubbleArray[i].checkBounds();
  }

}


function WidthChange(mq) {

  // if (mq.matches) {
  //   // window width is at least 500px = browser
  //   document.querySelector("#browser-content").style.display = "block";
  //   document.querySelector("#mobile-content").style.display = "none";
  // } else {
  //   console.log("mobile");
  //   document.querySelector("#mobile-content").style.display = "block";
  //   document.querySelector("#browser-content").style.display = "none";
  //   // mobile phone
  //
  // }
}


class Bubble {
  constructor(_xStart, _xEnd) {
    this.xStart = _xStart;
    this.xEnd = _xEnd
    this.x = random(this.xStart, this.xEnd);
    // this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    // this.y = random(windowHeight + 50, windowHeight * 2);
    this.speedX = 0;
    this.speedY = -4;
    this.accelX = 0;
    this.accelY = random(-0.0080, -0.0010);
    this.diam = random(3, 7);
    this.c = color(random(222, 255), random(222, 255), random(222, 255));
  }

  drawBubble() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.diam, this.diam);
  }

  moveBubble() {
    this.y = this.y + this.speedY;
    this.speedY = this.speedY + this.accelY;

    this.x = this.x + this.speedX;
    this.speedX = this.speedX + this.accelX;

    // Select a random amount to change the accelX.
    // This will produce a gentle wiggle effect.
    this.accelX += random(-0.00005, 0.00005);

    this.diam = this.diam + 0.02;
  }

  checkBounds() {
    if (this.y < -20) {
      this.y = random(windowHeight + 10, windowHeight + 100);
      this.speedY = -4;
      this.x = random(this.xStart, this.xEnd);
      this.diam = random(3, 7);
      this.speedX = 0;
      this.accelX = 0;
      this.c = color(random(222, 255), random(222, 255), random(222, 255));
    }
  }
}



let canvasDivInstance = function(p) { // p could be any variable name

  p.canvas;
  // p.eraseButton = document.querySelector("#eraseButton");


  p.setup = function() {
    p.canvas = p.createCanvas(windowWidth, windowHeight);
    p.canvas.parent('bgCanvas');
    // p.background(100, 100, 100);
  };

  p.draw = function() {

  };


}

let canvasDiv = new p5(canvasDivInstance, 'canvasDiv');
