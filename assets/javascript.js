$(document).ready(function () {
	var movies = ["when harry met sally", "the notebook", "wedding singer", "pretty woman", "my fair lady", "dirty dancing", "50 first dates", "breakfast at tiffany's"];

	// Add buttons for original movies array
	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < movies.length; i++) {
			$("#movie-buttons").append("<button class='btn btn-default' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
		}
		buttonClick();
	}

	renderButtons();

	// Adding a button for movie entered
	$("#add-movie").on("click", function () {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		movies.push(movie);
		renderButtons();
		console.log(movie);
		return;
	});
	


	// Getting gifs from api... onto html
	function buttonClick () {
		$("button").on("click", function () {
			console.log("button-clicked");
			var movie = $(this).attr("data-movie");
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
				movie + "&api_key=KrINFogbdVx9DS5f7Y9Bp0YHNFHWr3x9&limit-10"

			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function (response) {
				var results = response.data;
				$("#movies").empty();
				for (var i = 0; i < 10; i++) {
					var movieDiv = $("<div>");
					var p = $("<p>").text("Rating: " + results[i].rating);
					var movieImg = $("<img>");
					console.log(response);

					movieImg.attr("src", results[i].images.original_still.url);
					movieImg.attr("data-still", results[i].images.original_still.url);
					movieImg.attr("data-animate", results[i].images.original.url);
					movieImg.attr("data-state", "still");
					movieImg.attr("class", "gif");
					movieDiv.append(p);
					movieDiv.append(movieImg);
					$("#movies").append(movieDiv);
				}
			});
		});
	}

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}


	$(document).on("click", ".gif", changeState);

});


