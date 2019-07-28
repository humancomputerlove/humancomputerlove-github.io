"use strict";

function gotData(data) {
  // need to retrieve firebase data with val() method
  allData = data.val();
  allDataArray = Object.values(allData);
  // numberPersonals = allDataArray.length;
  console.log(allDataArray);


  // create array of keys (post ids)
  keys = Object.keys(allData);


// to reassign post object values > this was for making "seekingBusinessPartner" change to "humanSeeksComputer"
  // allDataArray.forEach(function(post) {
  //   if (post.postType === "seekingBusinessPartner") {
  //     console.log(post);
  //     firebase.database().ref('personals/' + post.timeStamp).update({
  //       postType: "humanSeeksComputer"
  //     });
  //   }
  // });

  createPersonals("viewAll");
}

function errData(err) {
  console.log("error!");
  console.log(err);
}

function savePersonalsData() {

  userData = {
    postType: postType,
    bodyType: bodyType,
    postTitle: postTitle,
    postText: postText,
    contact: contact,
    likes: 0,
    flags: 0,
    timeStamp: Date.now() // actuall same as postID but, whatever
  }


}

function createPersonalsNode() {

  postID = Date.now();
  // original
  let result = firebase.database().ref('personals/' + postID).set(userData);
}

function pushMoreData(data) {

  // this works to add new key:value pairs and also to reassign values with same key name

  // original push
  firebase.database().ref('personals/' + postID).update(data);

  // add new data to local userData object (this will also reassign values)
  userData = Object.assign(userData, data);
  // console.log(userData);
}

function rewriteData(node, data) {

  firebase.database().ref(`personals/${postID}/${node}`).set(data);

}
