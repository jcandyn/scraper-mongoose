document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});

// Or with jQuery

$(document).ready(function(){
  $('.sidenav').sidenav();
});



// Grab the articles as a json

$.getJSON("/articles", function(data) {
  // For each one

  for (var i = 0; i < data.length; i++) {
    newCard(data[i])
    // console.log(data)
    // Display the apropos information on the page
  }
});

function newCard(x) {
  console.log(x)
 
const cardGroup = $(".card-group")
const newCardContainer = $("<div>").addClass("row")
const newPostCard = $('<div>').addClass("card")
const newPostTitle = $("<h5>").addClass('card-title');
const favBtn = $("<a>").addClass('btn-floating btn-large waves-effect waves-light red')
const favBtnIcon = $("<i>").addClass("material-icons").text("add")
const newCardBody = $("<div>").addClass("card-body");
const newPostPrice = $("<p>").addClass('card-text');
const newPostImg = $("<img>").addClass("card-img-top responsive-img")
const newBtn = $("<a>").addClass("waves-effect waves-light btn modal-trigger red red darken-1").text("read more").css("color", "white").css("cursor","pointer").attr("item",x._id).attr("href", x.link).attr("target","_blank").css("margin", "5px")
const favButton = $("<a>").addClass("waves-effect waves-light btn modal-trigger red accent-2 pulse favButton").css("color", "white").css("cursor","pointer").attr("item",x._id).css("margin", "5px")
const noteButton = $("<a>").addClass("waves-effect waves-light btn modal-trigger grey darken-2 note").text("Write Note").css("color", "white").css("cursor","pointer").attr("item",x._id).css("margin", "5px")
newPostTitle.text(x.title)
newPostPrice.text(x.abstract)
newPostImg.attr("src", x.image)
newPostCard.append(newPostImg)

// newPostCard.append(favBtn)
newCardBody.append(newPostTitle)

newCardBody.append(newPostPrice)
newCardBody.append(newBtn)
newCardBody.append(noteButton)
favButton.append(favBtnIcon)
newCardBody.append(favButton)


newPostCard.append(newCardBody)
newCardContainer.append(newPostCard)
cardGroup.append(newCardContainer)

        
          // $(".card-group").append(newCard)
}


// Whenever someone clicks a p tag
$(document).on("click", ".note", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("item");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      
     
      // // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
 
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("item");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// When you click the savenote button
$(document).on("click", ".favButton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("item");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/favorites/" + thisId,
    // data: {
    //   // Value taken from title input
    //   title: $("#titleinput").val(),
    //   // Value taken from note textarea
    //   body: $("#bodyinput").val()
    // }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});
