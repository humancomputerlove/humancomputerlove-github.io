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

  setTimeout(function() {
    let scroll = setInterval(function() {
      window.scrollBy(0, 1);
    }, 30);
  }, 2000);



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

}

function draw() {
  clear();
  noStroke();

  drawBubbles();

  if (personalsCreated && (window.innerHeight + window.scrollY) >= document.querySelector("#wrap").offsetHeight) {
    setTimeout(function() {
      window.location.href = window.location.href;
    }, 4000);
  }

  if (allData && !personalsCreated) {
    createPersonals("viewAll");
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


function createPersonals(_type) {




  // shuffle entries
  for (let i = allDataArray.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = allDataArray[randomIndex];

    allDataArray[randomIndex] = allDataArray[i];
    allDataArray[i] = itemAtIndex;
  }

  // create post for each entry
  allDataArray.forEach(function(post) {
    if (_type === "viewAll") {
      createCell(post.timeStamp, post.postType, post.postTitle, post.postText, post.contact, post.likes, post.flags);
    } else if (post.postType === _type)
      createCell(post.timeStamp, post.postType, post.postTitle, post.postText, post.contact, post.likes, post.flags);
  });

  personalsCreated = true;
}

function createCell(_id, _type, _title, _text, _contact, _likes, _flags) {
  let flagColor;

  switch (_type) {
    case "humanSeeksComputer":
      flagColor = "pinkFlag";
      break;
    case "computerSeeksHuman":
      flagColor = "purpleFlag";
      break;
    case "seekingBusinessPartner":
      flagColor = "greenFlag";
      break;
  }

  // console.log(_text.length);

  let colSize;

  colSize = `col-md-8`;

  // // set col size, varies with text length
  // if (_text.length + _title.length * 4 > 400) {
  //   colSize = `col-md-5`;
  // } else if (_text.length + _title.length * 4 > 300) {
  //   colSize = `col-md-4`;
  // } else {
  //   colSize = `col-md-3`;
  // }


  // // just title
  // let html = `<h4 class="personalsTitle">${_title}</h4>`;

  // // includes body of personal
  // let html = `<h4 class="personalsTitle">${_title}</h4>
  //           <p class="personalsText">${_text}</p>
  //           <p class="contact">${_contact}</p>
  //           <p class="text-right mb-1"> <span class="likes">${_likes} </span><a href="javascript:void(0)" onclick="">&#9825;</a>
  //           <a href="javascript:void(0)" onclick="">&#9872;</a>
  //             </p>
  //           `;

  // includes body of personal, no like icon
  let html = `<h4 class="personalsTitle">${_title}</h4>
                      <p class="personalsText">${_text}</p>
                      <p class="contact" style="margin-bottom: 1em;">${_contact}</p>
                      `;


  let post = document.createElement("div");
  post.className = `${colSize} my-2 mx-auto h-25 cell transBlack corner-ribbon ${flagColor}`;
  post.id = `${_id}`;
  post.innerHTML = html;

  document.querySelector("#personalsDiv").appendChild(post);

  document.querySelector("#notFindingDiv").style.display = "block";

}
