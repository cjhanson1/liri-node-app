var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var command = process.argv[2];
var arb = process.argv;
run();
function run(){
if (command==="my-tweets") {
	var client = new Twitter({
  		consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_secret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret
	})
	var params = {screen_name: 'ineedtopeetoo'}
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  		for (var i=0;i<tweets.length;i++) {
  			console.log(tweets[i].text);
  			console.log(tweets[i].created_at);
  		}
  	}
	})
}
else if (command==="spotify-this-song") {
	var arbArray = [];
	if (arb.length===3) {
		var song = "the sign ace";
	}
	else {
	for (var i=3;i<arb.length;i++){
		arbArray.push(arb[i]);
		var song = arbArray.join(" ");
	}
	}
	var spotify = new Spotify({
  		id: '93328a7c031a4b778916139503603a88',
  		secret: '7e9ad86e7f5b49808e9f8e4d8ad2fbc4'
	});
	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  	}
  	console.log(data.tracks.items[0].artists[0].name);
  	console.log(data.tracks.items[0].name);
  	console.log(data.tracks.items[0].preview_url);
	console.log(data.tracks.items[0].album.name); 
	});
}
else if (command==="movie-this") {
	var arbArray = [];
	if (arb.length===3) {
		var movie = "Mr. Nobody";
	}
	else {
	for (var i=3;i<arb.length;i++){
		arbArray.push(arb[i]);
		var movie = arbArray.join(" ");
	}
	}
	request('http://www.omdbapi.com/?t='+movie+'&apikey=40e9cece', function (error, response, body) {
  	var newBody = JSON.parse(body);
  	console.log("Title: "+newBody.Title);
  	console.log("Year: "+newBody.Year);
  	console.log("IMDB Rating: "+newBody.Ratings[0].Value);
  	console.log("Rotten Tomatoes Rating: "+newBody.Ratings[1].Value);
  	console.log("Country: "+newBody.Country);
  	console.log("Language: "+newBody.Language);
  	console.log("Plot Summary: "+newBody.Plot);
  	console.log("Actors: "+newBody.Actors);

	});
}
else if (command==="do-what-it-says") {
	fs.readFile("random.txt","utf8",function(err,data){
		arb2=data.split(",");
		command=arb2[0];
		var detail =arb2[1].slice(1,arb2[1].length-1);
		detail=detail.split(" ");
		detail.unshift("","","");
		arb=detail;
		run();
	})
}
}