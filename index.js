//sort out
//play pause function
//dataarray only goes up to 620?

const ICON = {
	play: "./img/play.svg",
	pause: "./img/pause.svg"
};

const width = window.innerWidth,
	height = window.innerHeight,
	tau = 2*Math.PI;

let audioCtx = new AudioContext();
const audioEl = document.querySelector("audio");
let audioSource = audioCtx.createMediaElementSource(audioEl);
let analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 8192;
let dataArray = new Uint8Array(analyser.frequencyBinCount);
let posArray = getPositions(dataArray.length);
let timer;
let color = d3.scaleLinear().domain([0, dataArray.length/4]).range([0,1]);
let colorInt = d3.interpolateHclLong('purple', 'orange')
//let color = d3.scaleLinear().domain([0, dataArray.length/4]).range(['blue', 'red']);

let canvas = d3
	.select("main")
	.append("canvas")
	.attr("width", width)
	.attr("height", height);
let ctx = canvas.node().getContext("2d");

let ARRAY=[];

//console.log(c(0.5));
//console.log(c(color(600)));

function draw() {
	requestAnimationFrame(draw);
	analyser.getByteFrequencyData(dataArray);
	ARRAY.push(highest(dataArray));
	ctx.fillStyle = 'black';
	ctx.strokStyle= 'black';
	ctx.fillRect(0,0,width,height);
	for(let i=0;i<dataArray.length; i++){
		let c = posArray[i];
		//ctx.strokeStyle=d3.interpolateSpectral(color(i));
		ctx.strokeStyle=colorInt(color(i));
		ctx.beginPath();
		ctx.arc(c.x, c.y, dataArray[i], 0, tau);
		ctx.stroke();
	}
};

function highest(arr){
	let res;
	for(let i=0; i<arr.length; i++){
		if(arr[i]>0)
			res=i
	}
	return res;
}

function high(arr){
	let res;
	for(let i=0; i<arr.length; i++){
		if(arr[i]>res&&typeof arr[i]=='number')
			res=arr[i]
	}
	return res;
}

const btn = document.getElementById("play");
btn.onclick = btnClick;
window.onkeypress = spaceBar

function spaceBar(e){
	if(e.code=='Space')
		btnClick();
}

function btnClick() {
	audioEl.paused ? play() : pause();
};

function play(){
		audioEl.play();
		d3.select(btn).classed('opaque', true);
		draw();
};

function pause(){
	audioEl.pause();
	console.log(high(ARRAY));
	d3.select(btn).classed('opaque', false);
}

function getPositions(l){
	let res=[];
	for(let i=0; i<l; i++){
		const x = d3.randomUniform(0, width)();
		const y = d3.randomUniform(0, height)();
		res.push({x: x, y: y})
	}
	return res;
}