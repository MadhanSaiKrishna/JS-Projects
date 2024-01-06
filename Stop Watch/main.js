const timeDisplay = document.querySelector(".timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let millisecs = 0;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 75);
  }
});
pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);

  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  paused = true;
  intervalId;
  hrs = 0;
  mins = 0;
  secs = 0;
  millisecs=0;

  timeDisplay.textContent = "00:00:00:000";
});

function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  millisecs =  Math.floor(((elapsedTime/(1000)*1000)%1000));

  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);
  millisecs= padmillisecs(millisecs);

  timeDisplay.textContent = `${hrs}:${mins}:${secs}:${millisecs}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }

  function padmillisecs(unit) {
    unit = unit.toString();
    if(unit.length===3)
    {
      return unit;
    }
    else if(unit.length ===2) {
      return ("0" + unit);
    }
    else if(unit.length === 1){
      return ("00" + unit);
    }
  }
}
