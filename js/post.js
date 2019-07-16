"use strict";

// add perlin noise back https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=7&t=0s

let bubbleArray = [];
let numOfBubbles = 69;
let bubbleArrayLength;

// store name as firebase key
// let userName;
let userData;
let allData;
let allDataArray;
let database;
let keys;

let postID;
let postType;
let bodyType;
let postTitle;
let postText;
let contact;


// loading sound / songs
/*
function loadItem(index, filename) {
  loadSound(filename, soundLoaded);

  function soundLoaded(sound) {
    // console.log(index + ' ' + filename);
    songs[index] = sound;
    counter++;

    if (counter == 3) {
      songs[0].loop();
      loading = false;
    }
  }
}
*/

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('bubbleCanvas');

  frameRate(30);

  // store question divs
  let a0 = document.querySelector("#a0_humanOrComputer");
  let a1 = document.querySelector("#a1_intimateOrBusiness");
  let a2 = document.querySelector("#a2_humanSeeksComputer");
  let b1 = document.querySelector("#b1_humanSeeksBusiness");
  let c1 = document.querySelector("#c1_computerSeeksHuman");

  // store menu buttons
  let humanButton = document.querySelector("#human");
  let computerButton = document.querySelector("#computer");
  let intimacyButton = document.querySelector("#intimacy");
  let businessButton = document.querySelector("#business");

  // store back buttons
  let a1_back = document.querySelector("#a1_back");
  let a2_back = document.querySelector("#a2_back");
  let b1_back = document.querySelector("#b1_back");
  let c1_back = document.querySelector("#c1_back");

  // store input fields


  // store submit buttons
  let a2_submit = document.querySelector("#a2_submit");
  let b1_submit = document.querySelector("#b1_submit");
  let c1_submit = document.querySelector("#c1_submit");


  humanButton.onclick = function() {
    a0.style.display = "none";
    a1.style.display = "block";
  }

  computerButton.onclick = function() {
    a0.style.display = "none";
    c1.style.display = "block";
    postType = "computerSeeksHuman";
  }

  intimacyButton.onclick = function() {
    a1.style.display = "none";
    a2.style.display = "block";
    postType = "humanSeeksComputer";
  }

  businessButton.onclick = function() {
    a1.style.display = "none";
    b1.style.display = "block";
    postType = "seekingBusinessPartner";
  }

  // back buttons
  a1_back.onclick = function() {
    a0.style.display = "block";
    a1.style.display = "none";
  }

  a2_back.onclick = function() {
    a1.style.display = "block";
    a2.style.display = "none";
  }

  b1_back.onclick = function() {
    a1.style.display = "block";
    b1.style.display = "none";
  }

  c1_back.onclick = function() {
    a0.style.display = "block";
    c1.style.display = "none";
  }


  // a2 human seeks computer submit
  a2_submit.onclick = function() {
    if (document.querySelector('#a2_postTitle').value && document.querySelector('#a2_postText').value && document.querySelector('#a2_postContact').value && document.querySelector('input[name="desiredBodyType"]:checked')) {
      bodyType = document.querySelector('input[name="desiredBodyType"]:checked').value;
      postTitle = document.querySelector('#a2_postTitle').value;
      postText = document.querySelector('#a2_postText').value;
      contact = document.querySelector('#a2_postContact').value;

      savePersonalsData();
      createPersonalsNode();
      window.location.href = '../congrats/index.html';
    } else {
      alert("please fill out all fields.")
    }
  }

  // b1 seeking business partner submit
  b1_submit.onclick = function() {
    if (document.querySelector('#b1_postTitle').value && document.querySelector('#b1_postText').value && document.querySelector('#b1_postContact').value) {
      bodyType = null;
      postTitle = document.querySelector('#b1_postTitle').value;
      postText = document.querySelector('#b1_postText').value;
      contact = document.querySelector('#b1_postContact').value;

      savePersonalsData();
      createPersonalsNode();
      window.location.href = '../congrats/index.html';
    } else {
      alert("please fill out all fields.")
    }
  }

  // c1 computer seeks human submit
  c1_submit.onclick = function() {
    if (document.querySelector('#c1_postTitle').value && document.querySelector('#c1_postText').value && document.querySelector('#c1_postContact').value && document.querySelector('input[name="computerBody"]:checked')) {
      bodyType = document.querySelector('input[name="computerBody"]:checked').value;
      postTitle = document.querySelector('#c1_postTitle').value;
      postText = document.querySelector('#c1_postText').value;
      contact = document.querySelector('#c1_postContact').value;

      savePersonalsData();
      createPersonalsNode();
      window.location.href = '../congrats/index.html';
    } else {
      alert("please fill out all fields.")
    }
  }

  // userData.bodyType = document.querySelector('input[name="computerBody"]:checked').value;



  createBubbleArray();

  // for sound / songs
  /*
    // for loading items
    loadItem(0, 'assets/audio/music/EagleInk_Aja_loop.mp3');
    loadItem(1, 'assets/audio/sfx/click.mp3');
    loadItem(2, 'assets/audio/sfx/fizzDown_hiPitch.mp3');

    // add sound to buttons
    let buttons = document.querySelectorAll("button, [type='checkbox'], [type='radio'], select, [href]");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        songs[1].play();
      });
    }
  */

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }


  // Initialize
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
