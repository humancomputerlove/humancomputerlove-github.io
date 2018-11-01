"use strict";

let documentActive = false;

let robots;
let onRobots;
let popperRobots;
let vr;
let onVr;
let popperVr;
let mr;
let onMr;
let popperMr;
let ai;
let onAi;
let popperAi;
let femmebot;
let onFemmebot;
let allOverlay;

let eraseButton;

let bubbleArray = [];
let numOfBubbles = 69;
let bubbleArrayLength;

let video;




function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('bgCanvas');

  frameRate(30);

  // *******************
  // pop ups
  robots = document.querySelector('#robots');
  onRobots = document.querySelector('#onRobots');
  vr = document.querySelector('#vr');
  onVr = document.querySelector('#onVr');
  mr = document.querySelector('#mr');
  onMr = document.querySelector('#onMr');
  ai = document.querySelector('#ai');
  onAi = document.querySelector('#onAi');
  femmebot = document.querySelector('#femmebot');
  onFemmebot = document.querySelector('#onFemmebot');

  allOverlay = document.querySelectorAll('.overlay');

  // code below causes overlay to appear on click, others appear on mouseOver

  // robots.addEventListener("click", function() {
  //   toggleViz(onRobots);
  // });

  //robots
  robots.addEventListener("mouseenter", function() {
    hideAllOverlay();
    onRobots.style.visibility = "visible";
  });

  robots.addEventListener("mouseleave", function() {
    onRobots.style.visibility = "hidden";
  });

  robots.addEventListener("touchstart", function() {
    toggleViz(onRobots);
  });


  // virtual reality

  vr.addEventListener("mouseenter", function() {
    hideAllOverlay();
    onVr.style.visibility = "visible";
  });

  vr.addEventListener("mouseleave", function() {
    onVr.style.visibility = "hidden";
  });

  vr.addEventListener("touchstart", function() {
    toggleViz(onVr);
  });


  // mixed reality

  mr.addEventListener("mouseenter", function() {
    hideAllOverlay();
    onMr.style.visibility = "visible";
  });

  mr.addEventListener("mouseleave", function() {
    onMr.style.visibility = "hidden";
  });

  mr.addEventListener("touchstart", function() {
    toggleViz(onMr);
  });



  // ai

  ai.addEventListener("mouseenter", function() {
    hideAllOverlay();
    onAi.style.visibility = "visible";
  });

  ai.addEventListener("touchstart", function() {
    toggleViz(onAi);
  });

  ai.addEventListener("mouseleave", function() {
    onAi.style.visibility = "hidden";
  });


  // femmebot


  femmebot.addEventListener("mouseenter", function() {
    hideAllOverlay();
    onFemmebot.style.visibility = "visible";
  });

  femmebot.addEventListener("touchstart", function() {
    toggleViz(onFemmebot);
  });

  femmebot.addEventListener("mouseleave", function() {
    onFemmebot.style.visibility = "hidden";
  });


  // // ********************
  // // create and play video
  // video = createVideo(['assets/SHOWDOWN_H264.webm']);;
  // let videoWidth = document.querySelector("#videoDiv").offsetWidth;
  //
  // video.parent("videoDiv");
  // video.id("videoEl");
  // document.querySelector("#videoEl").width = videoWidth - 80;
  // document.querySelector("#videoEl").height = videoWidth * 3 / 4;
  // // p.video.width = p.videoWidth;
  // // video.loop();
  // video.mouseOver(playVid);
  // video.mouseClicked(playVid);
  // video.mouseOut(pauseVid);



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


  // for p5 sketch
  eraseButton = document.querySelector("#eraseButton");


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

function toggleViz(_this) {
  if (_this.style.visibility === "hidden") {
    hideAllOverlay();
    _this.style.visibility = "visible";
  } else {
    _this.style.visibility = "hidden"
  }
}

function hideAllOverlay() {
  allOverlay.forEach(function(el) {
    el.style.visibility = "hidden";
  })
}


function WidthChange(mq) {

  if (mq.matches) {
    // window width is at least 500px = browser
    document.querySelector("#browser-content").style.display = "block";
    document.querySelector("#mobile-content").style.display = "none";
  } else {
    console.log("mobile")
    document.querySelector("#mobile-content").style.display = "block";
    document.querySelector("#browser-content").style.display = "none";
    // mobile phone

  }
}

function touchStarted() {
  documentActive = true;
}

function mousePressed() {
  documentActive = true;
}

function playVid() {
  if (documentActive) {
    video.loop();
  }
}

function pauseVid() {
  video.pause();
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

  p.mouseIsClickedHere = false;

  p.setup = function() {
    p.canvas = p.createCanvas(400, 300);
    // p.canvas.class("gameCanvas");
    // p.canvas.id("breakoutGameCanvas");
    // p.canvas.style("z-index: 5;");
    p.canvas.mousePressed(localMouseClicked);
    p.canvas.mouseReleased(localMouseUp);


    p.frameRate(30);

    eraseButton.addEventListener("click", p.eraseCanvas);
  };

  p.draw = function() {
    // p.clear();


    p.stroke(0);
    p.strokeWeight(3);
    if (p.mouseIsClickedHere === true) {
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
    // p.noStroke();
    // p.fill(225, 235, 255);
    // if (p.mouseX >= 10 && p.mouseX <= p.width - 10 && p.mouseY >= 10 && p.mouseY <= p.height - 10) {
    //   p.ellipse(p.mouseX, p.mouseY, 20, 20);
    // }
  };

  p.eraseCanvas = function() {
    p.clear();
  }

function localMouseClicked() {
  console.log("hey")
    p.mouseIsClickedHere = true;
  }

function localMouseUp() {
  console.log("by")
    p.mouseIsClickedHere = false;
  }
};

let canvasDiv = new p5(canvasDivInstance, 'canvasDiv');
