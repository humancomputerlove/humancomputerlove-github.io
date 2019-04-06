"use strict";

// add perlin noise back https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=7&t=0s

let bubbleArray = [];
let numOfBubbles = 69;
let bubbleArrayLength;


// function loadItem(index, filename) {
//   loadSound(filename, soundLoaded);
//
//   function soundLoaded(sound) {
//     // console.log(index + ' ' + filename);
//     songs[index] = sound;
//     counter++;
//
//     if (counter == 3) {
//       songs[0].loop();
//       loading = false;
//     }
//   }
// }


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('bubbleCanvas');

  frameRate(30);

  createBubbleArray();


  // // for loading items
  // loadItem(0, 'assets/audio/music/EagleInk_Aja_loop.mp3');
  // loadItem(1, 'assets/audio/sfx/click.mp3');
  // loadItem(2, 'assets/audio/sfx/fizzDown_hiPitch.mp3');

  // // add sound to buttons
  // let buttons = document.querySelectorAll("button, [type='checkbox'], [type='radio'], select, [href]");
  //
  // for (let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", function() {
  //     songs[1].play();
  //   });
  // }


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

  drawBubbles();
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
