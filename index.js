const ICON = {
	play: "./img/play.svg",
	pause: "./img/pause.svg"
}

const btn = document.getElementById('play');
let audioCtx = new AudioContext();
const audioEl = document.querySelector('audio');
let audioSource = audioCtx.createMediaElementSource(audioEl);
let analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 2048;
let bufferLength = analyser.fftSize;
let dataArray = new Uint8Array(bufferLength);
console.log(dataArray);

btn.onclick = btnClick;

function btnClick(e){
	const iconSrc = e.target.getAttribute('src');
	if(iconSrc==ICON.play){
		e.target.setAttribute('src', ICON.pause);
		audioEl.play();
		console.log(analyser); 
	} else {
		e.target.setAttribute('src', ICON.play);
		audioEl.pause();
	}
}


