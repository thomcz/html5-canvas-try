//previous x and y value
var oldx = 0;
var oldy = 0;
//actual x and y value
var x = 0;
var y = 0;

//true if the drawing should stop, false otherwise
var stop = true;

//the canvas to interact
var canvas;

//context of the canvas
var context;

//initialize the variables and sets the size of the canvas.
function initialize() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	setCanvasSize();
}

//fires if the device is in motion.
window.ondevicemotion = function(event) { 
	var gx = event.accelerationIncludingGravity.x
	var gy = event.accelerationIncludingGravity.y
	
	//map values from [-8,8] -> [0, canvas.width] and [0, canvas.height]
	if (canvas.width > canvas.height) {
		x = ((gx - (-8)) / (8 - (-8))) * (canvas.height - 0) + 0;
		y = ((gy - (-8)) / (8 - (-8))) * (canvas.width - 0) + 0;
	} else {
		x = ((gx - (-8)) / (8 - (-8))) * (canvas.width - 0) + 0;
		y = ((gy - (-8)) / (8 - (-8))) * (canvas.height - 0) + 0;
	}
	
	if (!stop) {
		draw();
	}
	
	oldx = x;
	oldy = y;
}

//Sets the canvas size to fit into the device screen
function setCanvasSize() {
	context.canvas.width  = window.innerWidth - (window.innerWidth * 0.1);
	context.canvas.height = window.innerHeight - (window.innerWidth * 0.15);
}

//clears the canvas
function clearingCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}  

//Sets if the drawing should stop	  
function setStop(value) {
	stop = value;
}

//draws something on the canvas.
function draw() {
	context.beginPath();
	context.strokeStyle = document.getElementById("color").value;
	switch(document.getElementById("form").value) {
		case "line": drawLine(); break;
		case "dots":drawCircle(1);break;
		case "circle":drawCircle(document.getElementById("radian").value);break;
		case "rect":drawRect();break;		
	} 
	context.lineWidth = document.getElementById("linewidth").value;
	context.stroke();
	context.closePath();
}

//draws a circle with a given radian on the canvas, or dots, if the radian is 1.
function drawCircle(radian) {	
	if (canvas.width > canvas.height) {
		context.arc(y, x, radian, 0, 2 * Math.PI);
	} else {
		context.arc(x, y, radian, 0, 2 * Math.PI);
	}
}

//draws a line on the canvas.
function drawLine() {	
	if (canvas.width > canvas.height) {
		context.moveTo(oldy, oldx);
		context.lineTo(y, x);
	} else {
		context.moveTo(oldx, oldy);
		context.lineTo(x, y);
	}
}

//draws a rectangle on the canvas.
function drawRect() {
	var l = document.getElementById("length").value;
	var h = document.getElementById("width").value;	
	if (canvas.width > canvas.height) {
		context.rect(y, x, l, h);
	} else {
		context.rect(x, y, l, h);
	}
}

//opens the settings modal.
function openSettings() {
    document.getElementById("formModal").style.display = "block";
}

//closes the settings modal.
function closeModal() {
    document.getElementById("formModal").style.display = "none";
}

//closes the settings modal if the user clicks outside the modal.
window.onclick = function(event) {
    if (event.target == document.getElementById("formModal")) {
        closeModal();
    }
}