var goalfrequency; //Hz

/*initializations*/
var map=
[["C0",16.35],["C#0/Db0",17.32],["D0",18.35], ["D#0/Eb0",19.45], ["E0",20.60],["F0",21.83],["F#0/Gb0",23.12],["G0",24.50],["G#0/Ab0",25.96],["A0",27.50],["A#0/Bb0",29.14], ["B0",30.87],
 ["C1",32.70],["C#1/Db1",34.65],["D1",36.71], ["D#1/Eb1",38.89], ["E1",41.20],["F1",43.65],["F#1/Gb1",46.25],["G1",49.00],["G#1/Ab1",51.91],["A1",58.27],["A#1/Bb1",58.27], ["B1",61.74],
 ["C2",65.41],["C#2/Db2",69.30],["D2",73.42], ["D#2/Eb2",77.78], ["E2",82.41],["F2",87.31],["F#2/Gb2",46.25],["G2",98.00],["G#2/Ab2",103.83],["A2",110.00],["A#2/Bb2",116.54], ["B2",123.47],
 ["C3",130.81],["C#3/Db3",138.59],["D3",146.83], ["D#3/Eb3",155.56], ["E3",164.81],["F3",174.61],["F#3/Gb3",185.00],["G3",196.00],["G#3/Ab3",207.65],["A3",220.00],["A#3/Bb3",233.08], ["B3",246.94],
 ["C4",261.63],["C#4/Db4",277.18],["D4",293.66], ["D#4/Eb4",311.13], ["E4",329.63],["F4",349.23],["F#4/Gb4",369.99],["G4",392.00],["G#4/Ab4",415.30],["A4",440.00],["A#4/Bb4",466.16], ["B4",493.88],
 ["C5",523.25],["C#5/Db5",554.37],["D5",587.33], ["D#5/Eb5",622.25], ["E5",659.25],["F5",698.46],["F#5/Gb5",739.99],["G5",783.99],["G#5/Ab5",830.61],["A5",880.00],["A#5/Bb5",932.33], ["B5",987.77],
 ["C6",1046.50],["C#6/Db6",1108.73],["D6",1174.66], ["D#6/Eb6",1244.51], ["E6",1318.51],["F6",1396.91],["F#6/Gb6",1479.98],["G6",1567.98],["G#6/Ab6",1661.22],["A6",1760.00],["A#6/Bb6",1864.66], ["B6",1975.53],
 ["C7",2093.00],["C#7/Db7",2217.46],["D7",2349.32], ["D#7/Eb7",2489.02], ["E7",2637.02],["F7",2793.83],["F#7/Gb7",2959.96],["G7",3135.96],["G#7/Ab7",3322.44],["A7",3520.00],["A#7/Bb7",3729.31], ["B7",3951.07],
 ["C8",4186.01],["C#8/Db8",4434.92],["D8",4698.63], ["D#8/Eb8",4978.03], ["E8",5274.04],["F8",5587.65],["F#8/Gb8 ",5919.91],["G8",6271.93],["G#8/Ab8",6644.88],["A8",7040.00],["A#8/Bb8",7458.62], ["B8",7902.13]];

/*initializations*/
var mapDif=
[["C0",16.35],["C#0/Db0",17.32],["D0",18.35], ["D#0/Eb0",19.45], ["E0",20.60],["F0",21.83],["F#0/Gb0",23.12],["G0",24.50],["G#0/Ab0",25.96],["A0",27.50],["A#0/Bb0",29.14], ["B0",30.87],
 ["C1",32.70],["C#1/Db1",34.65],["D1",36.71], ["D#1/Eb1",38.89], ["E1",41.20],["F1",43.65],["F#1/Gb1",46.25],["G1",49.00],["G#1/Ab1",51.91],["A1",58.27],["A#1/Bb1",58.27], ["B1",61.74],
 ["C2",65.41],["C#2/Db2",69.30],["D2",73.42], ["D#2/Eb2",77.78], ["E2",82.41],["F2",87.31],["F#2/Gb2",46.25],["G2",98.00],["G#2/Ab2",103.83],["A2",110.00],["A#2/Bb2",116.54], ["B2",123.47],
 ["C3",130.81],["C#3/Db3",138.59],["D3",146.83], ["D#3/Eb3",155.56], ["E3",164.81],["F3",174.61],["F#3/Gb3",185.00],["G3",196.00],["G#3/Ab3",207.65],["A3",220.00],["A#3/Bb3",233.08], ["B3",246.94],
 ["C4",261.63],["C#4/Db4",277.18],["D4",293.66], ["D#4/Eb4",311.13], ["E4",329.63],["F4",349.23],["F#4/Gb4",369.99],["G4",392.00],["G#4/Ab4",415.30],["A4",440.00],["A#4/Bb4",466.16], ["B4",493.88],
 ["C5",523.25],["C#5/Db5",554.37],["D5",587.33], ["D#5/Eb5",622.25], ["E5",659.25],["F5",698.46],["F#5/Gb5",739.99],["G5",783.99],["G#5/Ab5",830.61],["A5",880.00],["A#5/Bb5",932.33], ["B5",987.77],
 ["C6",1046.50],["C#6/Db6",1108.73],["D6",1174.66], ["D#6/Eb6",1244.51], ["E6",1318.51],["F6",1396.91],["F#6/Gb6",1479.98],["G6",1567.98],["G#6/Ab6",1661.22],["A6",1760.00],["A#6/Bb6",1864.66], ["B6",1975.53],
 ["C7",2093.00],["C#7/Db7",2217.46],["D7",2349.32], ["D#7/Eb7",2489.02], ["E7",2637.02],["F7",2793.83],["F#7/Gb7",2959.96],["G7",3135.96],["G#7/Ab7",3322.44],["A7",3520.00],["A#7/Bb7",3729.31], ["B7",3951.07],
 ["C8",4186.01],["C#8/Db8",4434.92],["D8",4698.63], ["D#8/Eb8",4978.03], ["E8",5274.04],["F8",5587.65],["F#8/Gb8 ",5919.91],["G8",6271.93],["G#8/Ab8",6644.88],["A8",7040.00],["A#8/Bb8",7458.62], ["B8",7902.13]];
 
var deviation = 0; //Hz
var thetadeviation=135; //degrees
var a=50; //a Hz symbolize maximum and minimum deviation on protractor from goal frequency -->resolution of protractor
var thresholdcolordeviation = 0.9; //if absolute deviation is smaller than threshold then color is of notestring is changing

//globals for pitch detection
var song = []; //array 
var counter = 0; 

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
            //alert('Web Audio API is  supported in this browser');
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
counter ++; 
var stringID = "noteString" + counter; 
console.log(stringID);
$(noteString).append("<div id=stringID></div>");
$(stringID).text(map[index1][0]);
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
song.unshift(map[nearestIndex][0]);
$(array).text(song);
console.log(song);
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