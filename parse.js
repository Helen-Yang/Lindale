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
			window.location.href = "create3.html";
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
		unpublishedSongs.set("songFile", parseFile);
		unpublishedSongs.save();
		
	} else {
		alert("You are not logged in!");
	}
}; //end saveUserSongs function

var getUserSongs = function() {
	currentUser = Parse.User.current();
	var query = new Parse.Query("UnpublishedSongs");
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

//update the edit existing song page with a table displaying all the songs the user has created but not published
var getUnpublishedSongs = function() {
	$("#unpublishedSongsTable").html("");
	currentUser = Parse.User.current();
	var query = new Parse.Query("UnpublishedSongs");
	query.equalTo("createdBy", currentUser);
	query.find({
		success: function(results){
			alert("successfully retrieved" + results.length + "songs");
			for (var i = 0; i < results.length; i++){
				var number = i + 1; 
				var object = results[i];
				var file = object.get("songFile");
				var url = file.url();
				var name = file.name();
				//parse adds a unique identifier to the beginning of the file name, so starting at the end, go through the file name, look for a dash and slice the string there to get the name
				var j = name.length-1;
				while (j>=0 && name.charAt(j) != "-"){
					j--;
				} //end while
				name = name.slice(j+1);
				console.log("name", name);
				//create an HTML table row with the name that links to the file
				$("#unpublishedSongsTable").append(String('<tr><th style=\"font-size: 18px\">'+ number + '</th><td style=\"font-size: 18px\"> '+ name + '</td>   <td><a href=\"#\" id=\"edit' + number + '\" class=\"btn btn-default btn-sm\" role=\"button\">Edit</a>  <button class=\"btn btn-default btn-sm\" role=\"button\" data-toggle=\"modal\" data-target=\"#myModal'+ number + '\">Delete</button>   <div class=\"modal fade\" id=\"myModal' + number + '\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><center><h4 class=\"modal-title\">Confirmation</h4></center> </div><div class=\"modal-body\"><center>Are you sure you want to delete? <br> <br> <button class=\"btn btn-default btn-sm\" role=\"button\" data-dismiss=\"modal\">Yes</button> <button class=\"btn btn-default btn-sm\" role=\"button\"data-dismiss=\"modal\">No</button></center></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div>   <a href=\"#\" class=\"btn btn-default btn-sm\" role=\"button\" id=\"publish' + number + '\">Publish</a></td></tr>'));

				var script = document.createElement('script');
				script.text = '$(\"#edit' + number + '\").click(function() { $(\"#page3\").css(\"display\", \"block\"); $(\"#editExisting\").html(\"<img src='+ url + '>\"); $(\"#saving\").click(function(){ $(\"#myModal' + number + '\").hide(); }); $(\"#page4\").css(\"display\", \"none\"); clearStaves(); });';
				$("#unpublishedSongsScript").append(script);

    	
    				console.log("after appending");
			} //end for
		}, 
		error: function(error){
			alert("error" + error.code + " " + error.message);
		}
	}); //end query
};

//log out the user (sets currentUser to null)
var logoutUser = function() {
	Parse.User.logOut();
}; //end logoutUser function
