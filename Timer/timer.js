let timerInterval;
let timeRemaining;
let isTimerRunning = false;

document.getElementById("timer-start-btn").addEventListener("click", startTimer);
document.getElementById("timer-pause-btn").addEventListener("click", pauseTimer);
document.getElementById("timer-reset-btn").addEventListener("click", resetTimer);

function startTimer() {
  if (isTimerRunning) return;

  const minutesInput = parseInt(document.getElementById("minutes-input").value) || 0;
  const secondsInput = parseInt(document.getElementById("seconds-input").value) || 0;

  if (minutesInput === 0 && secondsInput === 0) {
    alert("Please enter a valid time.");
    return;
  }

  const totalSeconds = minutesInput * 60 + secondsInput;
  timeRemaining = totalSeconds * 1000 + Date.now();

  timerInterval = setInterval(() => {
    const now = Date.now();
    const remaining = timeRemaining - now;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer-display").textContent = "00:00";
      stopTimer();
      return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    document.getElementById("timer-display").textContent =
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);

  isTimerRunning = true;
  updateButtonState("running");
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  updateButtonState("paused");
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  document.getElementById("timer-display").textContent = "00:00";
  updateButtonState("reset");
}

function updateButtonState(state) {
  const startTimerBtn = document.getElementById("timer-start-btn");
  const pauseTimerBtn = document.getElementById("timer-pause-btn");
  const resetTimerBtn = document.getElementById("timer-reset-btn");

  if (state === "running") {
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    resetTimerBtn.disabled = true;

    startTimerBtn.style.display = "none";
    pauseTimerBtn.style.display = "inline-block";
    resetTimerBtn.style.display = "inline-block";

    resetTimerBtn.style.background = "#d3d3d3";

  } else if (state === "paused") {
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = false;

    startTimerBtn.style.display = "inline-block";
    pauseTimerBtn.style.display = "none";
    resetTimerBtn.style.display = "inline-block";

    startTimerBtn.innerText = "Resume";
    resetTimerBtn.style.background = "#9f0000";
}

  else if (state === "reset") {
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;

    startTimerBtn.style.display = "inline-block";
    pauseTimerBtn.style.display = "none";
    resetTimerBtn.style.display = "none";

    startTimerBtn.innerText = "Start";
  }
}




// function stopStopwatch() {
//     clearInterval(timerInterval);
//     isTimerRunning = false;
//     document.getElementById("stopwatch-display").textContent = "00:00";
//     updateButtonState("stopped");
//   }


let stopwatchTime = 0;
let stopwatchMillis = 0;
let isStopwatchRunning = false;

document.getElementById("stopwatch-start-btn").addEventListener("click", startStopwatch);
document.getElementById("stopwatch-pause-btn").addEventListener("click", pauseStopwatch);
document.getElementById("stopwatch-reset-btn").addEventListener("click", resetStopwatch);

function switchToStopwatch() {
    stopwatchTime = 0;
    stopwatchMillis = 0;
    isStopwatchRunning = true;
    updateButtonState("resume");
    startStopwatch();
}

function startStopwatch() {
    stopwatchInterval = setInterval(function() {
        stopwatchMillis++;
        if (stopwatchMillis >= 100) {
            stopwatchMillis = 0;
            stopwatchTime++;
        }

        const minutes = Math.floor(stopwatchTime / 60);
        const seconds = stopwatchTime % 60;
        const millis = stopwatchMillis;

        document.getElementById("stopwatch-display").innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${millis < 10 ? '0' : ''}${millis}`;
    }, 10);
}

function pauseStopwatch() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        isTimerPaused = true;
        updateButtonState("paused");
    } else if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        updateButtonState("pause");
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    clearInterval(stopwatchInterval);
    document.getElementById("stopwatch-display").innerHTML = "00:00.00";
    document.getElementById("timer-display").innerHTML = "00:00";

    document.getElementById("minutes-input").value = 1;
    document.getElementById("seconds-input").value = 0;

    isTimerRunning = false;
    isStopwatchRunning = false;
    isTimerPaused = false;

    updateButtonState("start");
}

function updateButtonState(state) {
    const startStopwatchBtn = document.getElementById("stopwatch-start-btn");
    const pauseStopwatchBtn = document.getElementById("stopwatch-pause-btn");
    const resetStopwatchBtn = document.getElementById("stopwatch-reset-btn");

    if (state === "start") {
        startStopwatchBtn.style.display = "inline-block";
        pauseStopwatchBtn.style.display = "none";
        resetStopwatchBtn.style.display = "none";

        // Enable start button and disable others
        enableAllButtons();
        pauseStopwatchBtn.disabled = false;
        resetStopwatchBtn.disabled = true;
    } else if (state === "pause") {
        startStopwatchBtn.style.display = "none";
        pauseStopwatchBtn.style.display = "inline-block";
        resetStopwatchBtn.style.display = "none";

        // Disable start, stop, reset button, enable pause
        disableAllButtonsExcept("start", "reset");
        pauseStopwatchBtn.innerText = "Pause";
    } else if (state === "resume") {
        startStopwatchBtn.style.display = "none";
        pauseStopwatchBtn.style.display = "inline-block";
        resetStopwatchBtn.style.display = "none";

        // Switch Pause to Resume button
        pauseStopwatchBtn.innerText = "Pause";
    } else if (state === "reset") {
        startStopwatchBtn.style.display = "none";
        pauseStopwatchBtn.style.display = "inline-block";
        resetStopwatchBtn.style.display = "inline-block";

        // Enable reset button and disable others
        disableAllButtonsExcept("reset");
        startStopwatchBtn.innerText = "Resume";
    }
}

// Initial Button State
updateButtonState("start");      
