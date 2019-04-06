

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
