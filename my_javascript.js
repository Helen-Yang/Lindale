//array that will contain the notes to put on the sheet music
var music = [];
//variable whether the audio input is being added to array as notes
var addtoArray = false; 


//when start button clicked, clears array, then starts adding notes to array based on audio input
var start = function() {
    music = [];
    addToArray = true;
};
//when stop button clicked, stops adding notes to array
var stop = function() {
    addToArray = false; 
};

//================================================================================================================================
//decides whether to use treble or bass clef
var clef = function(){
    //variables that count the number of notes that should be using bass clef and treble clef
    var bassClef = 0;
    var trebleClef = 0; 
    //get the octaves
    for (var i = 0; i < music.length; i++){
        //get the octave from the string note, make it into an integer
        var octave = parseInt(music[i].substring(music[i].length-1));
        //if the octave is less than or equal to 3, then it should be using bass clef, otherwise it should be using treble clef
        if(octave <= 3){
            bassClef ++;
        } else {
            trebleClef ++;
        }
    }
    //check if more notes are in the bass clef range or treble clef range, return clef so that in drawNotes the correct clef will be created
    // console.log(bassClef, trebleClef);
    if (bassClef > trebleClef){
        return "bass";
    } else {
        return "treble";
    }
};


//================================================================================================================================
//draws the notes on the canvas
var drawNotes = function () {
    
    var canvas = $("div.staff canvas")[0];
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
    var ctx = renderer.getContext();
    //width is first parameter
    renderer.resize(window.innerWidth, 3000); // Resize and clear canvas
    //first 2 parameters are position, last is width of staff
    var stave = new Vex.Flow.Stave(10, 0, window.innerWidth);
    //get the correct clef from the clef function above
    stave.addClef(clef()).setContext(ctx).draw();
    var plum = [];
    var notes = [];
    for(var i = 0; i<music.length; i++){
        if (music[i].substring(1,2)==="#"){
            music[i] = music[i].substring(0,1)+ music[i].substring(2);
            var apple = new Vex.Flow.StaveNote({keys:[music[i]], duration:"q"}).addAccidental(0, new Vex.Flow.Accidental("#"));
        } else {
        var apple = new Vex.Flow.StaveNote({keys: [music[i]], duration: "q"});
        
        }
        plum.push(apple);
        
    }

    
    for (var num = 0; num < plum.length; num++) {
        notes.push(plum[num]);
    };
    

    var voice = new Vex.Flow.Voice({
        num_beats: plum.length, 
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
    });
    voice.addTickables(notes);
    //last parameter is width of staff
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], window.innerWidth);

    voice.draw(ctx, stave);
};//end of draw function

var goalfrequency; //Hz

/*initializations*/
var map=
[["C/0",16.35],["C#/0",17.32],["D/0",18.35], ["D#/0",19.45], ["E/0",20.60],["F/0",21.83],["F#/0",23.12],["G/0",24.50],["G#/0",25.96],["A/0",27.50],["A#/0",29.14], ["B/0",30.87],
 ["C/1",32.70],["C#/1",34.65],["D/1",36.71], ["D#/1",38.89], ["E/1",41.20],["F/1",43.65],["F#/1",46.25],["G/1",49.00],["G#/1",51.91],["A/1",58.27],["A#/1",58.27], ["B/1",61.74],
 ["C/2",65.41],["C#/2",69.30],["D/2",73.42], ["D#/2",77.78], ["E/2",82.41],["F/2",87.31],["F#/2",46.25],["G/2",98.00],["G#/2",103.83],["A/2",110.00],["A#/2",116.54], ["B/2",123.47],
 ["C/3",130.81],["C#/3",138.59],["D/3",146.83], ["D#/3",155.56], ["E/3",164.81],["F/3",174.61],["F#/3",185.00],["G/3",196.00],["G#/3",207.65],["A/3",220.00],["A#/3",233.08], ["B/3",246.94],
 ["C/4",261.63],["C#/4",277.18],["D/4",293.66], ["D#/4",311.13], ["E/4",329.63],["F/4",349.23],["F#/4",369.99],["G/4",392.00],["G#/4",415.30],["A/4",440.00],["A#/4",466.16], ["B/4",493.88],
 ["C/5",523.25],["C#/5",554.37],["D/5",587.33], ["D#/5",622.25], ["E/5",659.25],["F/5",698.46],["F#/5",739.99],["G/5",783.99],["G#/5",830.61],["A/5",880.00],["A#/5",932.33], ["B/5",987.77],
 ["C/6",1046.50],["C#/6",1108.73],["D/6",1174.66], ["D#/6",1244.51], ["E/6",1318.51],["F/6",1396.91],["F#/6",1479.98],["G/6",1567.98],["G#/6",1661.22],["A/6",1760.00],["A#/6",1864.66], ["B/6",1975.53],
 ["C/7",2093.00],["C#/7",2217.46],["D/7",2349.32], ["D#/7",2489.02], ["E/7",2637.02],["F/7",2793.83],["F#/7",2959.96],["G/7",3135.96],["G#/7",3322.44],["A/7",3520.00],["A#/7",3729.31], ["B/7",3951.07],
 ["C/8",4186.01],["C#/8",4434.92],["D/8",4698.63], ["D#/8",4978.03], ["E/8",5274.04],["F/8",5587.65],["F#/8",5919.91],["G/8",6271.93],["G#/8",6644.88],["A/8",7040.00],["A#/8",7458.62], ["B/8",7902.13]];

/*initializations*/
var mapDif=
[["C/0",16.35],["C#/0",17.32],["D/0",18.35], ["D#/0",19.45], ["E/0",20.60],["F/0",21.83],["F#/0",23.12],["G/0",24.50],["G#/0",25.96],["A/0",27.50],["A#/0",29.14], ["B/0",30.87],
 ["C/1",32.70],["C#/1",34.65],["D/1",36.71], ["D#/1",38.89], ["E/1",41.20],["F/1",43.65],["F#/1",46.25],["G/1",49.00],["G#/1",51.91],["A/1",58.27],["A#/1",58.27], ["B/1",61.74],
 ["C/2",65.41],["C#/2",69.30],["D/2",73.42], ["D#/2",77.78], ["E/2",82.41],["F/2",87.31],["F#/2",46.25],["G/2",98.00],["G#/2",103.83],["A/2",110.00],["A#/2",116.54], ["B/2",123.47],
 ["C/3",130.81],["C#/3",138.59],["D/3",146.83], ["D#/3",155.56], ["E/3",164.81],["F/3",174.61],["F#/3",185.00],["G/3",196.00],["G#/3",207.65],["A/3",220.00],["A#/3",233.08], ["B/3",246.94],
 ["C/4",261.63],["C#/4",277.18],["D/4",293.66], ["D#/4",311.13], ["E/4",329.63],["F/4",349.23],["F#/4",369.99],["G/4",392.00],["G#/4",415.30],["A/4",440.00],["A#/4",466.16], ["B/4",493.88],
 ["C/5",523.25],["C#/5",554.37],["D/5",587.33], ["D#/5",622.25], ["E/5",659.25],["F/5",698.46],["F#/5",739.99],["G/5",783.99],["G#/5",830.61],["A/5",880.00],["A#/5",932.33], ["B/5",987.77],
 ["C/6",1046.50],["C#/6",1108.73],["D/6",1174.66], ["D#/6",1244.51], ["E/6",1318.51],["F/6",1396.91],["F#/6",1479.98],["G/6",1567.98],["G#/6",1661.22],["A/6",1760.00],["A#/6",1864.66], ["B/6",1975.53],
 ["C/7",2093.00],["C#/7",2217.46],["D/7",2349.32], ["D#/7",2489.02], ["E/7",2637.02],["F/7",2793.83],["F#/7",2959.96],["G/7",3135.96],["G#/7",3322.44],["A/7",3520.00],["A#/7",3729.31], ["B/7",3951.07],
 ["C/8",4186.01],["C#/8",4434.92],["D/8",4698.63], ["D#/8",4978.03], ["E/8",5274.04],["F/8",5587.65],["F#/8",5919.91],["G/8",6271.93],["G#/8",6644.88],["A/8",7040.00],["A#/8",7458.62], ["B/8",7902.13]];
 
var deviation = 0; //Hz
var thetadeviation=135; //degrees
var a=50; //a Hz symbolize maximum and minimum deviation on protractor from goal frequency -->resolution of protractor
var thresholdcolordeviation = 0.9; //if absolute deviation is smaller than threshold then color is of notestring is changing

//globals for pitch detection

var audioContext = null;
var analyser=null;
var yinBuffer=null;
var threshold = 0.15;
var pitchInHertz = -1;
var pitchInRange=100;

//globals for median filtering
var count=0; //counts how many pitches are calculated. Every length values is reset in zero.

var myMedianFilter=
[0,0,0,0,0,0,0,0,0]; //initialization for myMedianFilter. In this array 19 values of pitch is saved and median filtering is applied

var myMedianSortedFilter=
[0,0,0,0,0,0,0,0,0]; //initialization for myMedianSortedFilter. This array contains sorted values of myMedianFilter
/*
var myMedianFilter=
[0,0,0,0,0,0,0,0,0,
 0,0,0,0,0,0,0,0,0,0]; //initialization for myMedianFilter. In this array 19 values of pitch is saved and median filtering is applied

var myMedianSortedFilter=
[0,0,0,0,0,0,0,0,0,
 0,0,0,0,0,0,0,0,0,0]; //initialization for myMedianSortedFilter. This array contains sorted values of myMedianFilter

*/

window.craicAudioContext = (function(){
      return  window.webkitAudioContext || window.AudioContext ;
    })();

    navigator.getMedia = ( navigator.mozGetUserMedia ||
                           navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.msGetUserMedia);
						   
$(document).ready(function(){

 // Check that the browser can handle web audio
        try {
//            audioContext = new webkitAudioContext();
            audioContext = new craicAudioContext();
            // alert('Web Audio API is  supported in this browser');
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
		
// get the input audio stream and set up the nodes
        try {
            // calls the function gotStream
            navigator.getMedia({audio:true}, gotStream, didntGetStream);

        } catch (e) {
            alert('webkitGetUserMedia threw exception :' + e);
        }
})

function printArray(arr){

$.each(arr, function( index, value ) {
console.log(value);
});
}

function didntGetStream() {
    alert('Stream generation failed.');
}

function gotStream(stream) {

//alert("Got audio stream");

// Create an AudioNode from the stream.
window.source  = audioContext.createMediaStreamSource(stream);  //fixes bug of firefox
var microphone = audioContext.createMediaStreamSource(stream);
analyser = audioContext.createAnalyser();
microphone.connect(analyser);
   
// Create a pcm processing "node" for the filter graph.
var bufferSize = 4096;
var myPCMProcessingNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
myPCMProcessingNode.onaudioprocess = function(e) {
input = e.inputBuffer.getChannelData(0);
output = e.outputBuffer.getChannelData(0);
for (var i = 0; i<bufferSize; i++) {
// Modify the input and send it to the output.
// output[i] = input[i]; //no output to speakers
}

yinBuffer = new Array(input.length/2);
//calculate pitch with YIN algorithm
//console.log("audioContext.sampleRate: "+audioContext.sampleRate);
my_YIN(input,audioContext.sampleRate); 

}

microphone.connect(myPCMProcessingNode);
myPCMProcessingNode.connect(audioContext.destination);


var errorCallback = function(e) {
  alert("Error in getUserMedia: " + e);
};  
    
}

function my_YIN(pitchBuf,sampleRate){

//console.log("Hello from my_YIN");
var tauEstimate = -1;

//step 2
difference(pitchBuf);

//step 3
cumulativeMeanNormalizedDifference();

//step 4

tauEstimate =absoluteThreshold();

//step 5

if(tauEstimate!=-1){
//step 6
var localTau = bestlocal(tauEstimate);
	
//step 5
//var betterTau = parabolicInterpolation(tauEstimate);
var betterTau = parabolicInterpolation(localTau);

//conversion to Hz
pitchInHertz = sampleRate/betterTau;

//do some filtering...median filtering for 1D signal is selected

/*step 1. Save myMedianFilter.length values for computed pitch in an array*/
myMedianFilter[count] = pitchInHertz;//Math.round(pitchInHertz);

/*handle counter*/
if(count<myMedianFilter.length-1){
//increase count
count++;
}
else{
//reset to zero
count=0;
}
//1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19

//check myMedianFilter values
//console.log("Checking myMedianFilter. Length:"+ myMedianFilter.length);
//printArray(myMedianFilter);
 
/*step 2. sort myMedianFilter values*/

myMedianSortedFilter = myMedianFilter.sort(function(a, b){return a-b});

//check sorted values
//console.log(""+myMedianSortedFilter);

/*step3. Select as goalfrequency the median element and display*/

//console.log("median element index:"+(Math.round(myMedianSortedFilter.length/2)));
//Math.round(myMedianSortedFilter.);

//set goal frequency
goalfrequency=myMedianSortedFilter[Math.round(myMedianSortedFilter.length/2)];
//console.log(""+goalfrequency);
displayNote();
//console.log("pitchInHertz: "+pitchInHertz);

}

}

/**
* Implements the difference function as described
 * in step 2 of the YIN paper
*/
function difference(difBuf){
var j,tau;
var delta;

//population of yinBuffer with zero values
for(tau=0;tau < yinBuffer.length;tau++){
	yinBuffer[tau] = 0;
}

//save differences from difBuf in yinBuffer
for(tau = 1 ; tau < yinBuffer.length ; tau++)
    {
	for(j = 0 ; j < yinBuffer.length ; j++)
        {
		delta = difBuf[j] - difBuf[j+tau];
        	yinBuffer[tau] += delta * delta;
                             
		}
    }
//printArray(yinBuffer);              
//console.log("Hello from difference");
}

function cumulativeMeanNormalizedDifference(){
var tau;
yinBuffer[0] = 1;
//Very small optimization in comparison with AUBIO
//start the running sum with the correct value:
//the first value of the yinBuffer
var runningSum = yinBuffer[1];
//yinBuffer[1] is always 1
yinBuffer[1] = 1;
//now start at tau = 2
for(tau = 2 ; tau < yinBuffer.length ; tau++){
	runningSum += yinBuffer[tau];
	yinBuffer[tau] *= tau / runningSum;
    }
//console.log("Hello from cumulativeMeanNormalizedDifference");
}

/*** Implements step 4 of the YIN paper
 */
function absoluteThreshold(){

/**/
var temp;
var sortedyinBuffer;
var buffwithminimums=[0];
var countmin=0;

//returns the minimum period value which is smaller than threshold

/* Search inside the yinBuffer to find in which position exists minimum of threshold and return it*/
for(var tau = 1;tau<yinBuffer.length;tau++){
    if(yinBuffer[tau] < threshold){
	while(tau+1 < yinBuffer.length &&yinBuffer[tau+1] < yinBuffer[tau]) 
		tau++;
		return tau;
	}
}
//no pitch found
//console.log("Hello from absoluteThreshold");
return -1;/**/
}

/**
* Implements step 5 of the YIN paper. It refines the estimated tau value
* using parabolic interpolation. This is needed to detect higher
* frequencies more precisely.
* @param tauEstimate the estimated tau value.
* @return a better, more precise tau value.
*/

function parabolicInterpolation(tauEstimate) {
var s0, s1, s2,newtauEstimate;
var ar,par;

/*boundary handling*/
var x0 = (tauEstimate < 1) ? tauEstimate : tauEstimate - 1; //handles the first position of array

var x2 = (tauEstimate + 1 < yinBuffer.length) ? tauEstimate + 1 : tauEstimate; //handles the last position of the array. Checks if exceeds array boundaries

if (x0 == tauEstimate) //applys when tauestimate is the first element of array
	return (yinBuffer[tauEstimate] <= yinBuffer[x2]) ? tauEstimate : x2; //compares only two points and is returning the smaller one

if (x2 == tauEstimate) //applys when tauestimate is the last element of array
    return (yinBuffer[tauEstimate] <= yinBuffer[x0]) ? tauEstimate : x0; //compares only two points and is returning the smaller one

/*in all other cases 3 points are interpolated. x0 is taustimate-1 position in array and x2 is tauestimate+1 position in array. So
they are the immediate neighbors to tauestimate. We are using parabola curve and we are searching for minimum on that curve.
Formulae is f(x)=a2x^2+a1x+a0. 
For more information see http://sfb649.wiwi.hu-berlin.de/fedc_homepage/xplore/tutorials/xegbohtmlnode62.html 
*/
s0 = yinBuffer[x0];
s1 = yinBuffer[tauEstimate];
s2 = yinBuffer[x2];

//newtauEstimate=0.5*(Math.pow(tauEstimate, 2)*s2 - s1*Math.pow(x2,2)-Math.pow(x0,2)*s2+Math.pow(x2, 2)*s0 +Math.pow(x0, 2)*s1 - s0*Math.pow(tauEstimate, 2))/(x2*s1 - tauEstimate*s2);
ar= Math.pow((tauEstimate-x0),2)*(s1-s2)-Math.pow((tauEstimate-x2),2)*(s1-s0);
par= (tauEstimate-x0)*(s1-s2)-(tauEstimate-x2)*(s1-s0);

newtauEstimate=tauEstimate-0.5*ar/par;
return newtauEstimate;
//console.log("newtauEstimate: "+newtauEstimate+"tauEstimate: "+tauEstimate);
//return (tauEstimate + 0.5 * (s2 - s0 ) / (2.0 * s1 - s2 - s0));
//return (0.5*(Math.pow(tauEstimate, 2)*s2 - s1*Math.pow(x2,2)-Math.pow(x0,2)*s2+Math.pow(x2, 2)*s0 +Math.pow(x0, 2)*s1 - s0*Math.pow(tauEstimate, 2))/(x2*s1 - tauEstimate*s2));
//console.log("Hello from parabolicInterpolation");
}        

/**
* Implements step 6 of the YIN paper. It refines the best local estimate for tau value
* This is needed to avoid flunctuation
* @param tauEstimate the estimated tau value.
* @return a better, more precise tau value.
*/

function bestlocal(tauEstimate){
var bestlocalestimate=tauEstimate;
var lowlimit=i-tauEstimate/2;
var highlimit=i+tauEstimate/2;

for (var i=0;i<yinBuffer.length;i++){
	
if(lowlimit.toFixed(0)>0){
	//search in vicinity for new minimum
	for(var j=lowlimit.toFixed(0);j<=highlimit.toFixed(0);j++)

		if(yinBuffer[j]<tauEstimate)
			{
			bestlocalestimate=j;
			//alert("Hello from 6 step");
			return bestlocalestimate;
			}
			
}
}

//no pitch found
	
return bestlocalestimate;
}

function displayNote(){
var indexf1=-1;
var indexf2=-1;
var nearestIndex=-1;

//goalfrequency=6644.00;
console.log("goalfrequency:"+goalfrequency);
/*search for goal frequency in map arrays*/

$.each(map, function( index1, value1 ) {
$.each(map[index1], function( index2, value2 ) {

/*Map contains two types of data. Notes as strings and frequencies as numbers. We check for goalfrequency
only in numbers. Then we get the corresponding string of that number*/

if($.type( map[index1][index2] ) === "number"){

//if value is found 
if(map[index1][index2]==goalfrequency){

console.log("found goal frequency in map["+index1+"]["+index2+"]");
console.log("Matching note is:"+map[index1][0]);







//THIS IS THE MOST IMPORTANT PART!!! using jquery to access object with id noteString; this is the note if it matches the frequency; if doesn't match exactly is below
//==========================================================================================================================================================
//===============================================================================================================================================================================================================
//====================================================================================================================================================================================================================================================================================
//==========================================================================================================================================

$(noteString).text( map[index1][0]);

//==========================================================================================================================================
//==========================================================================================================================================
//==========================================================================================================================================

deviation = goalfrequency-map[index1][1];
console.log("Tone is:"+map[index1][0]+ " with deviation:"+deviation);
indexf1=index1;
indexf2=index2;


}
console.log("indexf1 :"+indexf1);
}
/**/
})
});

/*if value is not found then indexf1 and idexf2 has the default values -1. So we are searching for nearest values in map array*/
if (indexf1==-1){
console.log("Matching note does not exist in map. Calculating the nearest value");

nearestIndex = calculateNearestValue();
//THIS IS THE MOST IMPORTANT PART!!! using jquery to access object with id noteString; this is the rounded note if it doesn't match the frequency perfectly
//==========================================================================================================================================================
//===============================================================================================================================================================================================================
//==========================================================================================================================================================
//======================
$(noteString).text( map[nearestIndex][0]);

//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================

deviation = goalfrequency-map[nearestIndex][1];
console.log("Nearest tone is:"+map[nearestIndex][0]+ " with deviation:"+deviation);
//=============================================================================
//=============================================================================
//=============================== STUFF I EDITED==============================
//=============================================================================
//=============================================================================
//makes array of notes-- problem: if the same note is held for multiple seconds, then will interpret it as the same note being played multiple times....
if(addToArray === true){
    //update array music that contains notes
    music.push(map[nearestIndex][0]);
    //update the sheet music
    drawNotes();
}
console.log(music);
//end stuff i edited 
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================
//==========================================================================================================================================================


/**/
}


}

function calculateNearestValue(){
var minimumIndex=-1;

/*calculate difference from goalfrequency and save them in a new array. Then get the one with minimum difference from
goal frequency*/

$.each(mapDif, function(index1NV, value1NV) {
$.each(mapDif[index1NV], function( index2NV,value2NV) {

/*Map contains two types of data. Notes as strings and frequencies as numbers. We apply difference
only in numbers. Then we get string of that number*/

if($.type( mapDif[index1NV][index2NV] ) === "number"){

mapDif[index1NV][index2NV] = Math.abs(map[index1NV][index2NV] - goalfrequency);
}

})
});

//printArray(mapDif);
minimumIndex=findMinimumIndex(mapDif);
//console.log("minimum Index at:"+minimumIndex);
//console.log("nearest music tone is:"+mapDif[minimumIndex][0]);
return minimumIndex;
}

function findMinimumIndex(arr){

/*initializations*/
var tempminOfArray = 100000;
var tempIndex = -1;

$.each(arr, function(index1m,value1m) {
$.each(arr[index1m], function(index2m,value2m) {

/*Map contains two types of data. Notes as strings and frequencies as numbers. We check for minimum
only in numbers. Then we get string of that number*/

if($.type( arr[index1m][index2m] ) === "number"){
/**/

 if(arr[index1m][index2m]<=tempminOfArray){
  tempminOfArray=arr[index1m][index2m];
  tempIndex=index1m;

}


}
})
});
//console.log("tempIndex:"+tempIndex);
return tempIndex;
}