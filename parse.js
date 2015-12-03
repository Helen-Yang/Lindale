//this file is for saving users and their data to the parse online database

var currentUser;
//unique Parse key for Lindale
Parse.initialize("l5n5ejbZKJJVULRmjjEPF6YJfVMCYpuncq5gU6yg", "LczId30RAh0E5rbxnywhGVn57y9UtAYvYLWmYrha");

//create a new user when a person enters a username and password and then clicks join
var createNewUser = function() {
	//create a new user 
	var user = new Parse.User();
	//get the value of the username/password inputted by user
	var username = $("#newusername1").val();
	var password = $("#newpassword").val();
	//set username and password of current user 
	user.set("username", username.toString());
	user.set("password", password.toString());
	//sign up the user
	user.signUp(null, {
		//if sucessful
		success: function(user) {
			//alert("Thanks for creating an account!");
			//login the user
			user.logIn();
			currentUser = Parse.User.current();
			window.location.href = "create3.html";
			// alert("currentUser new" + currentUser);
		}, 
		//if unsucessful
		error: function(user, error) {
			//alert("Error: " + error.code + " " + error.message);
			$("#newuser").css("display","block")

		}//end error

	}); //end user signup

}; //end createNewUser function

//login the user
var loginUser = function () {
	var username = $("#usernameinput").val();
	var password = $("#passwordinput").val();
	Parse.User.logIn(username, password, {
		success: function(user) {
			//alert("Login successful!");
			currentUser = Parse.User.current();
			// alert("currentUser existing" + currentUser);
			window.location.href = "create3.html";
		}, 
		error: function(user, error) {
			//alert("Error: " + error.code + " " + error.message);
			$("#incorrect").css("display","block");

		}
	});
}; //end loginUser function

//takes each stave (each within a canvas) and gets the image url as a data URI
var saveDataURL = function(staveNum) {
    //get the height and width of one of the staves (all 15 should be the same)
    var height = document.getElementById("canvas1").height;
    var width = document.getElementById("canvas1").width;
    //make sure the new canvas will be tall enough for all of the staves
    var newHeight = (staveNum+1)*height; 
    //create the new canvas
    document.getElementById("newCanvas").innerHTML = "<canvas id='downloadCanvas'" + " height=" + newHeight + " width=" + width +"></canvas>";
    //select downloadCanvas which will be the combination of all the canvases
    var downloadCanvas = document.getElementById("downloadCanvas");
    var ctx1 = downloadCanvas.getContext("2d");   
    //go through each of the canvases that are used
    for (var i = 1; i <= staveNum; i++){
        var id = String("canvas" + i); 
        console.log(id);
        var canvas = document.getElementById(id);
        //added each of the canvases to downloadCanvas
        //width, height
        ctx1.drawImage(canvas, 0, height*(i-1));
    }
    //get the data url for the combined staves
    var musicImage =  downloadCanvas.toDataURL();
    return musicImage;

}; //end of saveDataURL function

var newUserSongs = function() {
	alert("Running");
	currentUser = Parse.User.current();
	//make sure someone is logged in
	if (currentUser){
		
		//create a class UnpublishedSongs
		// var UnpublishedSongs = Parse.Object.extend("UnpublishedSongs");
		// //create an instance of this class
		// var unpublishedSongs = new UnpublishedSongs();
		// //set the createdBy key to the current user for easy reference when retreiving a user's scores
		// unpublishedSongs.set("createdBy", currentUser);
		// //save to parse
		// unpublishedSongs.save();

		//get the name of the song from user input
		
		//get the data url of all the canvases from a function 
		var file = saveDataURL(getStaveNum());
		//convert it to a base 64 that will work as a parse file
		file = {base64: file};
		//create a parsefile and save it to parse
		var parseFile = new Parse.File(name, file);
		parseFile.save().then(function() {
			//alert("yay file has been saved");
			
		}, function(error){
			//alert("parse file save did not work :(");
			//need to find a way to delete the image and allow for notes to appear

		});

		//set the parsefile to the songfile key and save it to parse
		// unpublishedSongs.set("songFile", parseFile);
		// unpublishedSongs.save();
		
	} else {
		alert("You are not logged in!");
	}
}; //end saveUserSongs function

//actually save the songs just created to parse
var saveUserSongs = function() {
	currentUser = Parse.User.current();
	//make sure someone is logged in
	if (currentUser){
		
		//create a class UnpublishedSongs
		var UnpublishedSongs = Parse.Object.extend("UnpublishedSongs");
		//create an instance of this class
		var unpublishedSongs = new UnpublishedSongs();
		//set the createdBy key to the current user for easy reference when retreiving a user's scores
		unpublishedSongs.set("createdBy", currentUser);
		//save to parse
		unpublishedSongs.save();

		//get the name of the song from user input
		var name = $("#Title").val();
		if (name === ""){
			name = "untitled";
		}
		//get the data url of all the canvases from a function 
		var file = saveDataURL(getStaveNum());
		//convert it to a base 64 that will work as a parse file
		file = {base64: file};
		//create a parsefile and save it to parse
		var parseFile = new Parse.File(name, file);
		parseFile.save().then(function() {
			alert("yay file has been saved");
			clearStaves(); // used to link with newUserSong
			newUserSongs(); 
		}, function(error){
			alert("parse file save did not work :(");

		});

		//set the parsefile to the songfile key and save it to parse
		unpublishedSongs.set("songFile", parseFile);
		unpublishedSongs.save();
		
	} else {
		alert("You are not logged in!");
	}
}; //end saveUserSongs function


//update the edit existing song page with a table displaying all the songs the user has created but not published
var getUnpublishedSongs = function() {
	currentUser = Parse.User.current();
	var query = new Parse.Query("UnpublishedSongs");
	query.equalTo("createdBy", currentUser);
	query.find({
		success: function(results){
			// alert("successfully retrieved" + results.length + "songs");
			if (results.length > 0){
				$("#unpublishedSongsTable").html("");
				$("#unpublishedSongsScript").html("");
				// if the object does not have a songfile, then delete it (this might be caused by saving a file with no name)
				for (var i = 0; i < results.length; i ++){
					var object = results[i];
					if (!object.get("songFile")){
						object.destroy();
					}
				}

				for (var i = 0; i < results.length; i++){
					//because we want numbering of tables to start at 1, not 0
					var number = i + 1; 
					var object = results[i];
					
						var file = object.get("songFile");
						var url = file.url();
						var name = file.name();
						var objectId = object.id; 
						//parse adds a unique identifier to the beginning of the file name, so starting at the end, go through the file name, look for a dash and slice the string there to get the name
						var j = name.length-1;
						while (j>=0 && name.charAt(j) != "-"){
							j--;
						} //end while
						name = name.slice(j+1);

						//create an HTML table row with the name that links to the file
						$("#unpublishedSongsTable").append(String('<tr><th style=\"font-size: 18px\">'+ number + '</th><td style=\"font-size: 18px\"> '+ name + '</td>   <td><a href=\"#\" id=\"edit' + number + '\" class=\"btn btn-default btn-sm\" role=\"button\">Edit</a>  <button class=\"btn btn-default btn-sm\" role=\"button\" data-toggle=\"modal\" data-target=\"#myModal'+ number + '\">Delete</button>   <div class=\"modal fade\" id=\"myModal' + number + '\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><center><h4 class=\"modal-title\">Confirmation</h4></center> </div><div class=\"modal-body\"><center>Are you sure you want to delete? <br> <br> <button class=\"btn btn-default btn-sm\" role=\"button\" data-dismiss=\"modal\">Yes</button> <button class=\"btn btn-default btn-sm\" role=\"button\"data-dismiss=\"modal\">No</button></center></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div>   <a href=\"#\" class=\"btn btn-default btn-sm\" role=\"button\" id=\"publish' + number + '\">Publish</a></td></tr>'));

						//make the edit button link to a page where the user can add to the song
						var script = document.createElement('script');
						script.text = String('$(\"#edit' + number + '\").click(function() { $(\"#page3\").css(\"display\", \"block\"); $(\"#editExisting\").html(\"<img src='+ url + '>\"); $(\"#saving\").click(function(){ $(\"#myModal' + number + '\").hide(); }); $(\"#page4\").css(\"display\", \"none\"); clearStaves(); }); $(\"#publish' + number + '\").click(function() { savePublishedSongs(\"' + objectId + '\"); });');
						// console.log("changed script text", script.text);
						$("#unpublishedSongsScript").append(script);
						// console.log("appended script");
					
				} //end for
			} //end else
		}, 
		error: function(error){
			//alert("error: " + error.code + " " + error.message);
		}
	}); //end query
};

//when the user clicks published on an unpublished song, this function will remove that song from the unpublished song list and add it to the published song list; then it will create a table on the finished songs page with all the published songs with links to view them
var savePublishedSongs = function(objectId){
	currentUser = Parse.User.current();

	//add the song to the published song list
	var PublishedSongs = Parse.Object.extend("PublishedSongs");
	var publishedSongs = new PublishedSongs();
	publishedSongs.set("createdBy", currentUser);
	publishedSongs.save();


 	var query = new Parse.Query("UnpublishedSongs");
 	query.get(objectId, {
 		success: function(unpublishedSongs){
 			console.log("id", unpublishedSongs.id);
 			var file = unpublishedSongs.get("songFile");
 			console.log("file here!!!", file, "file");

			var url = file.url();
			var name = file.name();
			//parse adds a unique identifier to the beginning of the file name, so starting at the end, go through the file name, look for a dash and slice the string there to get the name
			var j = name.length-1;
			while (j>=0 && name.charAt(j) != "-"){
				j--;
			} //end while
			name = name.slice(j+1);
			console.log("name", name);
			
			console.log("file", file);
			//convert the file to a base 64 thingy that parse will work with
			//put the file as an image on a canvas
			var newImage = document.createElement('IMG');
			newImage.crossOrigin = "Anonymous";
			newImage.src = url;
			$("#canvasHere").append(newImage);
			var newCanvas = document.createElement('CANVAS');

			$("#canvasHere").ready(function(){
				console.log(newImage.height, "height of new image");
				newCanvas.height = newImage.height;
				newCanvas.width = newImage.width; 
				var ctx = newCanvas.getContext('2d');
				ctx.drawImage(newImage, 0, 0);
				console.log("image drawn");
				$("#canvasHere").append(newCanvas);	
				console.log("appended");
			});
				
			
			console.log("added to page");
			file = newCanvas.toDataURL();
			console.log("file as data url", file);
			newCanvas = null;
			
			console.log(newImage.src, "source");
			
			//get the dataurl of the canvas
			file = {base64: file};
			console.log("base 64 file", file);


			var parseFile = new Parse.File(name, file);
			console.log("parseFile", parseFile);
			// if file save succesful, then save the class publishedSongs
			parseFile.save().then(function() {
				// alert("yay file has been saved"); 
				console.log("after parse file save");
				publishedSongs.set("songFile", parseFile);
				//if saving publishedSongs successful, then delete this song from unpublishedSongs, redirect to published songs page
				publishedSongs.save().then(function() {
					// alert("yay publishedSongs saved");
					//after publishing your song, remove this song from your unpublished songs
					var query1 = new Parse.Query("UnpublishedSongs");
					query1.get(objectId, {
						success: function(unpublishedSongs){
							unpublishedSongs.destroy();
							console.log("unpublishedSong has been destroyed");
							
							//call getPublishedSongs function which will update the published songs
							getPublishedSongs();
							//go to the published songs page
							$("#page5").css("display","block");
					    	$("#page1").css("display","none");
					    	$("#page2").css("display","none");
					    	$("#page3").css("display","none");
					    	$("#page4").css("display","none");
					    	$("#page6").css("display","none");
					    	$("#page7").css("display","none");
					    	$("#page8").css("display","none");
					    	$("body").css({ 'background-color': '#ffffff' });
					     	$("body").css('background-image', 'none');
						}, 
						error: function(unpublishedSongs, error){
							//alert(error.code + error.message);
						} //end error
					}); //end query
					
				}, function (error){
					alert(error.code + error.message + "published songs not saved");
				});
			}, function(error){
				//alert(error.code + error.message + "Parse file save did not work :( Try again.");
			});
			

		
 		} //end success
 	}); //end query

	
}; //end savePublishedSongs

var getPublishedSongs = function() {
	console.log("hello from getPublishedSongs!");
	currentUser = Parse.User.current();
	//go through published songs and delete any objects without song files 
	var query = new Parse.Query("PublishedSongs");
	query.equalTo("createdBy", currentUser);
	query.find({
		success: function(results){
			
			console.log("query successfully found" + results.length);
			for (var i = 0; i < results.length; i ++){
				var object = results[i];
				if (!object.get("songFile")){
					console.log("an object is being destroyed");
					object.destroy();
				}
			} //end for

		}, //end success
		error: function(object, error){
			alert(error.message + error.code);
		} //end error

	}); //end query

	//a new query after the ones with no files have been destroyed

	var query = new Parse.Query("PublishedSongs");
	query.equalTo("createdBy", currentUser);
	query.find({
		success: function(results){
			$("#publishedSongsTable").html("");
			$("#publishedSongsScript").html("");
			for (var i = 0; i < results.length; i++){
				number = i + 1;
				//go through each published song and create a table row with that song name
				var object = results[i];
				var file = object.get("songFile");
				var url = file.url();
				var name = file.name();

				console.log("object, file, url, name", object, file, url, name);
				var j = name.length-1;
				while (j>=0 && name.charAt(j) != "-"){
					j--;
				}
				name = name.slice(j+1);
				$("#publishedSongsTable").append('<tr><th></th><th style="font-size: 18px">' + number + '</th><td style="font-size: 18px">'+ name + '</td><td><a href="'+ url +'" class="btn btn-default btn-sm" role="button">View</a></td></tr>');

			}
		}, 
		error: function(object, error){
			alert(error.message + error.code + " from second published songs query");
		} //end error
	}); //end query

	

	//also make the view button link to the correct file
}; //end get Published Songs

//log out the user (sets currentUser to null)
var logoutUser = function() {
	Parse.User.logOut();
	window.location.href = "index.html";


}; //end logoutUser function
