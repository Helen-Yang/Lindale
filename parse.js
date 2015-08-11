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


var saveUserSongs = function() {
	//make sure someone is logged in
	if (currentUser){
		//add new song to aray userSongs
		if (currentUser.get(userSongs)){
			//user has at least one song, so just add
		} else {
			//create array userSongs
			
		}

		var name = $("#Title").val();
		var file = logo.png; //this will be changed later!!!



		var parseFile = new Parse.File(name, file);
		//add the song to the array of objects (hopefully data url base 64 will work)
		var userSongs = currentUser.get("userSongs");
		userSongs.push(parseFile);
		currentUser.set("userSongs", userSongs);
	}
}; //end saveUserSongs function

//log out the user (sets currentUser to null)
var logoutUser = function() {
	Parse.User.logOut();
}; //end logoutUser function