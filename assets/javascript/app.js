var shows = ["The Office", "Stranger Things", "Family Guy", "American Dad", "King of the Hill", "Dragon Ball Z",
    "Fullmetal Alchemist", "Attack On Titan", "Robot Chicken", "Archer"
];


// Function for displaying show data
function renderButtons() {

    // Deleting the shows buttons prior to adding new shows buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#shows-view").empty();

    // Looping through the array of shows
    for (var i = 0; i < shows.length; i++) {

        // Then dynamicaly generating buttons for each show in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("shows btn btn-info");
        // Adding a data-attribute with a value of the show at index i
        a.attr("data-shows", shows[i]);
        // Providing the button's text with a value of the show at index i
        a.text(shows[i]);
        // Adding the button to the HTML
        $("#shows-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-show").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var show = $("#show-input").val().trim();
    // The show from the textbox is then added to our array
    shows.push(show);

    // calling renderButtons which handles the processing of our show array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".shows", renderButtons);

// Calling the renderButtons function at least once to display the initial list of shows
renderButtons();


// Adding click event listen listener to all buttons
$("button").on("click", function () {
    // Grabbing and storing the data-shows property value from the button
    var tv = $(this).attr("data-shows");

    // Constructing a queryURL using the shows name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tv + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var showsDiv = $("<div>");
                console.log(results[i]);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var showsImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                showsImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the showsDiv
                showsDiv.append(p);
                showsDiv.append(showsImage);

                // Prependng the showsDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(showsDiv);
            }
        });
});