/**
 * Created by jeffstern on 7/9/14.
 */


// This is the new way of creating JavaScript classes. It's not really a function.
function Movie(title, description, imageURL, year) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.year = year;

}

// A list of all 14 Pixar movies.
var movies = [
    // Each of these lines of code makes a new Movie object from the movie class
    new Movie("Toy Story", "A bunch of toys talk about things.", "images/toystory.jpg", 1995),
    new Movie("A Bug's Life", "Bug goes on adventure, people respect him afterward.", "images/bugslife.jpg", 1998),
    new Movie("Toy Story 2", "Woody is kidnapped. Oh noz!", "images/toystory2.jpg", 1999),
    new Movie("Monsters Inc.", "AH REAL MONSTERS.", "images/monstersinc.jpg", 2001),
    new Movie("Finding Nemo", "The most popular fish adventure movie of all time.", "images/findingnemo.jpg", 2003),
    new Movie("The Incredibles", "Super heroes discover that family is the greatest power of all.", "images/incredibles.jpg", 2004),
    new Movie("Cars", "Cars drive around really fast.", "images/cars.jpg", 2006),
    new Movie("Ratatouille", "Rat has dream, rat follows dream.", "images/ratatouille.jpg", 2007),
    new Movie("Wall-E", "A lot of advanced technology exists and Wall-E prefers trash.", "images/walle.jpg", 2008),
    new Movie("Up", "How many balloons does it take to make a house fly up in the sky?", "images/up.jpg", 2009),
    new Movie("Toy Story 3", "The ultimate going-away-to-college film.", "images/toystory3.jpg", 2010),
    new Movie("Cars 2", "So. Many. Explosions.", "images/cars2.jpg", 2011),
    new Movie("Brave", "Her hair was really hard to animate.", "images/brave.jpg", 2012),
    new Movie("Monsters University", "College is exactly like this. Get pumped.", "images/monstersuniversity.jpg", 2013),
    //new Movie("Inside Out", "Everyone needs Sadness. Sadness is the best.", "images/insideout.jpg", 2015)
]

/* showMovies
    Populates the movies div with each individual movie
    Input: An array of Movie objects
 */
function showMovies(movies) {
    $(" #movies ").empty(); // A jQuery method which clears the movies div
    for (var i = 0; i < movies.length; i++) {

        if(i%3==0) {
            $(" #movies ").append("<div class='row'></div>"); // A jQuery method to add a new row for every 3rd movie
        }

        // This string is the HTML that makes up each individual movie cell,
        // It uses movie[i] attributes so that each cell has unique information
        var movieHTML = "<div class='col-md-4 movie'>" +
            "<img class='movieImage' src='" + movies[i].imageURL + "' />" +
            "<h3 class='moviename'>" + movies[i].title + " (" + movies[i].year + ")</h3>" +
            "<p class='description'>" + movies[i].description + "</p>";

        $(" #movies .row:last-child").append(movieHTML); // A jQuery method that adds the new HTML string to the last row in the movies div

        if(i%3==2) { $(" #movies ").append("</div>"); }

    }
}

/* sortButtonClicked
    Calls appropriate sort method based on which link was clicked and
        repopulates movie grid.
    Input: String representing which button was clicked on

 */
function sortButtonClicked(link) {
    if (link === "date") {
        sortMoviesByYear(movies);
    }
    else if (link == "title") {
        sortMoviesByTitle(movies);
    }
    else if(link == "shuffle") {
        shuffle(movies);
    }
    showMovies(movies);
}

/* shuffle
   Input: Array
   Output: Shuffled array
   Function courtesy of http://jsfromhell.com/array/shuffle
 */
function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
    
}

/* sortMoviesByYear
 You must implement a basic bubble sort algorithm to sort
 the movies based on it's year attribute.

    Input: a list of Movie objects.
    Output: Returns a list of Movie objects after they have been sorted by year.
*/
function sortMoviesByYear(movies) {
    var num = movies.length-1; 
     for (var i = 0; i < movies.length-1; i++){
        for (var j = 0; j < num; j++){
            if (movies[j+1].year<movies[j].year){
                var tmp = movies[j];
                movies[j] = movies[j+1];
                movies[j+1] = tmp;
            }
        }
        num --; 
     }
    return movies;
};

/* sortMoviesByTitle
 You must implement a basic bubble sort algorithm to sort
 the movies based on it's title attribute.

  Input: a list of Movie objects.
  Output: returns a list of Movie objects after they have been sorted by title.
 */
function sortMoviesByTitle(movies) {
    var num = movies.length-1;
    for(var i = 0; i < movies.length-1; i++){
        for (var j = 0; j < num; j++){
            var first = movies[j].title;
            var second = movies[j+1].title;
            //check if the is part of the title
            if (first.substring(0,3)=="The"){
                first = movies[j].title.substring(4);
            }
            if (second.substring(0,3)=="The"){
                second = movies[j+1].title.substring(4);
            }
            if (first.localeCompare(second) === 1){
                //switch
                tmp = movies[j];
                movies[j] = movies[j+1];
                movies[j+1] = tmp;
            }
        }
        num --; 
    } 
    return movies;
}

// Code that gets run once the page has loaded. It also uses jQuery.
$(document).ready(function () {
    shuffle(movies);
    showMovies(movies);
});