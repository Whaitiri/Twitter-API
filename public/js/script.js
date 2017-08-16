$(document).ready(main);

function main() {
	function sendToAjax(sendURL){
		$.ajax({
			url: 'http://localhost:3000/' + sendURL,
			dataType: "json",
			success: function(dataFromJSON){
				console.log(dataFromJSON);
				for (var i = 0; i < dataFromJSON.length; i++) {
					$("#masterContainer").append (`
						${dataFromJSON[i].user.name} (@${dataFromJSON[i].user.screen_name}) tweeted:<br>
						${dataFromJSON[i].text}<br>
						On ${dataFromJSON[i].created_at}<br>
						Likes: ${dataFromJSON[i].favorite_count}<br>
						Retweets: ${dataFromJSON[i].retweet_count}<br>
						<br>
					`);
				}
			},
			error: function() {
				console.log("error");
			}
		})
	}
	$("#searchButton").click(function() {
		var searchTerm = prompt("Please enter a search term").toString();
		if (searchTerm != null) {
			console.log(searchTerm);
			$("#masterContainer").empty();
			sendToAjax('search=' + searchTerm);
		}
	});
}