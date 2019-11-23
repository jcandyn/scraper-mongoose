$.getJSON("/articles", function(data) {
  data.shift()

  for (var i = 0; i < data.length; i++) {
    newCard(data[i])
  }
});

function newCard(x) {
  console.log(x)

const cardGroup = $(".card-group")
const newCardContainer = $("<div>").addClass("row")
const newPostCard = $('<div>').addClass("card")
const newPostTitle = $("<h5>").addClass('card-title');
const favBtnIcon = $("<i>").addClass("material-icons").text("add")
const newCardBody = $("<div>").addClass("card-body");
const newPostPrice = $("<p>").addClass('card-text');
const newBtn = $("<a>").addClass("waves-effect waves-light btn modal-trigger red red darken-1").text("read more").css("color", "white").css("cursor","pointer").attr("item",x._id).attr("href", x.link).attr("target","_blank").css("margin", "5px")
const favButton = $("<a>").addClass("waves-effect waves-light btn modal-trigger green accent-2 pulse favButton").css("color", "white").css("cursor","pointer").attr("item",x._id).css("margin", "5px")
newPostTitle.text(x.title)
const newPostDescription = $("<p>").text(x.description)

if (x.money) {
  x.money = x.money.split("$")
  console.log(x.money)
  if (x.money.length > 2) {
newPostPrice.text("Prize: $" + x.money[1] + " & " + x.money[2])
  } else
  newPostPrice.text("Prize: $" + x.money[1])
}

newPostImg.attr("src", x.image)
newPostCard.append(newPostImg)

newCardBody.append(newPostTitle)
newCardBody.append(newPostDescription)

newCardBody.append(newPostPrice)
newCardBody.append(newBtn)
favButton.append(favBtnIcon)
newCardBody.append(favButton)
newPostCard.append(newCardBody)
newCardContainer.append(newPostCard)
newCardContainer.append(newNote)
cardGroup.append(newCardContainer)
}



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
