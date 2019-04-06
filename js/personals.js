"use strict";

// add perlin noise back https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=7&t=0s

let bubbleArray = [];
let numOfBubbles = 69;
let bubbleArrayLength;

let userData;
let allData;
let allDataArray;
let database;
let keys;

let personalsCreated = false;


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

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDllsUmTj6d55EqybvIBNSLnM0lvL7Z0aw",
    authDomain: "humancomputerlove-436b7.firebaseapp.com",
    databaseURL: "https://humancomputerlove-436b7.firebaseio.com",
    projectId: "humancomputerlove-436b7",
    storageBucket: "humancomputerlove-436b7.appspot.com",
    messagingSenderId: "63005466495"
  };

  firebase.initializeApp(config);

  database = firebase.database();


  let ref = database.ref('personals');
  ref.on('value', gotData, errData);

  // createPersonals();

}

function draw() {
  clear();
  noStroke();

  drawBubbles();

  // console.log(allData);

  if (allData && !personalsCreated) {
    createPersonals();
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

function createPersonals() {
  personalsCreated = true;

  document.querySelector("#loading").style.visibility = "hidden";

  allDataArray.forEach(function(post){
    createCell(post.timeStamp, post.postType, post.postTitle, post.postText, post.contact, post.likes, post.flags);
  });

  // createCell("humanSeeksComputer", "testing", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in", "test contact", 10);
}

function createCell(_id, _type, _title, _text, _contact, _likes, _flags) {
  let cellColor;

  switch (_type) {
    case "humanSeeksComputer":
      cellColor = "pink";
      break;
    case "computerSeeksHuman":
      cellColor = "purple";
      break;
    case "seekingBusinessPartner":
      cellColor = "green";
      break;
  }

  // console.log(_text.length);

  let colSize;
  // set col size
  if (_text.length > 300) {
    colSize = `col-md-5`;
  } else if (_text.length > 200) {
    colSize = `col-md-4`;
  } else {
    colSize = `col-md-3`;
  }


  let html = `<h4 class="personalsTitle">${_title}</h4>
            <p class="personalsText">${_text}</p>
            <p class="contact">${_contact}</p>
            <p class="text-right mb-1"> <a href="javascript:void(0)" onclick="">like</a>
              <a href="javascript:void(0)" onclick="">flag</a><br><span class="likes">${_likes}</span> likes</p>`;


  let post = document.createElement("div");
  post.className = `${colSize} m-2 h-25 cell ${cellColor}`;
  post.id = `${_id}`;
  post.innerHTML = html;

  document.querySelector("#personalsDiv").appendChild(post);

}
