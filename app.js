const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");
const infoBtn = document.querySelector(".info");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
	startBtn.removeEventListener("click", handleStart);
	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 100);
};

const handlePause = () => {
	clearInterval(countTime);
	startBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;

	if (stopwatch.textContent !== "0:00") {
		time.style.visibility = "visible";
		timesArr.push(stopwatch.textContent);
	} else {
		time.style.visibility = "hidden";
	}
	clearStuff();
};

const handleReset = () => {
	time.style.visibility = "hidden";
	timesArr = [];
	clearStuff();
};

const showHistory = () => {
	timeList.textContent = "";
	let num = 1;
	timesArr.forEach((time) => {
		const newTime = document.createElement("li");
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;

		timeList.appendChild(newTime);
		num++;
	});
};

const showModal = () => {
	modalShadow.style.display = "block";
};

const hideModal = () => {
	modalShadow.style.display = "none";
};

const clearStuff = () => {
	clearInterval(countTime);
	startBtn.addEventListener("click", handleStart);
	stopwatch.textContent = "0:00";
	timeList.textContent = "";
	seconds = 0;
	minutes = 0;
};

startBtn.addEventListener("click", handleStart);
pauseBtn.addEventListener("click", handlePause);
stopBtn.addEventListener("click", handleStop);
resetBtn.addEventListener("click", handleReset);
historyBtn.addEventListener("click", showHistory);
infoBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
window.addEventListener("click", (e) =>
	e.target === modalShadow ? hideModal() : false
);
