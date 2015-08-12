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
			alert("Thanks for creating an account!");
			//login the user
			user.logIn();
			currentUser = Parse.User.current();
			window.location.href = "newcreate3.html";
			alert("currentUser new" + currentUser);
		}, 
		//if unsucessful
		error: function(user, error) {
			alert("Error: " + error.code + " " + error.message);
		}//end error

	}); //end user signup

}; //end createNewUser function

//login the user
var loginUser = function () {
	var username = $("#usernameinput").val();
	var password = $("#passwordinput").val();
	Parse.User.logIn(username, password, {
		success: function(user) {
			alert("Login successful!" + username + password);
			currentUser = Parse.User.current();
			alert("currentUser existing" + currentUser);
			window.location.href = "create3.html";
		}, 
		error: function(user, error) {
			alert("Error: " + error.code + " " + error.message);

		}
	});
}; //end loginUser function

//takes each stave (each within a canvas) and gets the image url as a data URI
var saveDataURL = function(staveNum) {
    //get the height and width of one of the staves (all 15 should be the same)
    var height = document.getElementById("canvas1").height;
    var width = document.getElementById("canvas1").width;
    //make sure the new canvas will be tall enough for all of the staves
    var newHeight = 16*height; 
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
        ctx1.drawImage(canvas, 0, height*i);
    }
    //get the data url for the combined staves
    var musicImage =  downloadCanvas.toDataURL();
    return musicImage;

}; //end of saveDataURL function


//actually save the songs to parse
var saveUserSongs = function() {
	currentUser = Parse.User.current();
	//make sure someone is logged in
	if (currentUser){
		
		//create a class SavedSongs
		var SavedSongs = Parse.Object.extend("SavedSongs");
		//create an instance of this class
		var savedSongs = new SavedSongs();
		//set the createdBy key to the current user for easy reference when retreiving a user's scores
		savedSongs.set("createdBy", currentUser);
		//save to parse
		savedSongs.save();

		//get the name of the song from user input
		var name = $("#Title").val();
		//get the data url of all the canvases from a function 
		var file = saveDataURL(getStaveNum());
		//convert it to a base 64 that will work as a parse file
		file = {base64: file};
		//create a parsefile and save it to parse
		var parseFile = new Parse.File(name, file);
		parseFile.save().then(function() {
			alert("yay file has been saved"); 
		}, function(error){
			alert("parse file save did not work :(");

		});

		//set the parsefile to the songfile key and save it to parse
		savedSongs.set("songFile", parseFile);
		savedSongs.save();
		
	} else {
		alert("You are not logged in!");
	}
}; //end saveUserSongs function

var getUserSongs = function() {
	currentUser = Parse.User.current();
	var query = new Parse.Query("SavedSongs");
	//get all the songs created by the current user
	query.equalTo("createdBy", currentUser);
	query.find({
		success: function(results){
			alert("successfully retrieved  " + results.length);
			for (var i = 0; i < results.length; i ++){
				//get each object that you've found
				var object = results[i];
				console.log(object.id);
				//make sure there is a defined songFile for this object
				if (object.get("songFile")) {
					var file = object.get("songFile");
					console.log(file);
					var image = document.createElement("IMG");
					image.src = file.url();
					document.getElementById("mySongList").appendChild(image);
				}
			} //end for
			
		}, 
		error: function(error) {
			alert("error" + error.code + " " + error.message);
		}
	}); //end query

}; //end getUserSongs function

//log out the user (sets currentUser to null)
var logoutUser = function() {
	Parse.User.logOut();
}; //end logoutUser function
