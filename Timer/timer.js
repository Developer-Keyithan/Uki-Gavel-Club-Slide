let timerInterval;
let stopwatchInterval;
let timeRemaining;
let isTimerRunning = false;
let isTimerPaused = true;
let targetTime;
let stopwatchTime = 0;
let stopwatchMillis = 0;
let isStopwatchRunning = false;

document.getElementById("start-btn").addEventListener("click", start);
document.getElementById("pause-btn").addEventListener("click", pause);
document.getElementById("stop-btn").addEventListener("click", stop);
document.getElementById("reset-btn").addEventListener("click", reset);

function start() {
    // If the timer is already running, do nothing
    if (isTimerRunning) return;

    // Disable the Start button, and enable Pause and Stop buttons
    document.getElementById("start-btn").disabled = true;
    document.getElementById("pause-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;
    document.getElementById("reset-btn").disabled = true; // Reset is disabled until paused or stopped

    // Get the time from the input fields
    const minutesInput = document.getElementById("minutes-input").value;
    const secondsInput = document.getElementById("seconds-input").value;

    if (minutesInput === "" || secondsInput === "") {
        alert("Please enter both minutes and seconds.");
        return;
    }

    // Calculate the target time
    const totalTimeInSeconds = (parseInt(minutesInput) * 60) + parseInt(secondsInput);
    targetTime = new Date().getTime() + totalTimeInSeconds * 1000;

    // Start the timer
    timerInterval = setInterval(function() {
        const now = new Date().getTime();
        timeRemaining = targetTime - now;

        const minutes = Math.floor(timeRemaining / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update the display
        document.getElementById("timer-stopwatch-display").innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // If time reaches 0, stop the timer
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timer-stopwatch-display").innerHTML = "00:00";
            switchToStopwatch(); // Transition to Stopwatch once timer ends
        }
    }, 1000);

    // Update the states
    isTimerRunning = true;
    isTimerPaused = false;
    updateButtonState("pause"); // Switch button states after starting the timer
}

function switchToStopwatch() {
    stopwatchTime = 0;
    stopwatchMillis = 0;
    isStopwatchRunning = true;
    updateButtonState("resume"); // Switch to Resume on the Pause button
    startStopwatch(); // Start stopwatch immediately after timer ends
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

        // Update the stopwatch display
        document.getElementById("timer-stopwatch-display").innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${millis < 10 ? '0' : ''}${millis}`;
    }, 10); // Update every 10 milliseconds
}

function pause() {
    // If the timer is running, pause it
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        isTimerPaused = true;
        updateButtonState("resume"); // Change Pause button to Resume
    } else if (isStopwatchRunning) {
        // If stopwatch is running, pause it and change Pause to Resume
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        updateButtonState("resume"); // Change Pause button to Resume
    }
}

function resume() {
    if (isTimerPaused) {
        // Resume the timer from the paused state
        start();
        updateButtonState("pause");
    } else if (!isTimerRunning && !isTimerPaused) {
        // If stopwatch was paused, resume stopwatch from where it left off
        startStopwatch();
        updateButtonState("pause");
    }
}

function stop() {
    // Stop the timer or stopwatch and reset to the Stop state
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        updateButtonState("reset");
    } else if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        updateButtonState("reset");
    }
}

function reset() {
    // Reset the timer or stopwatch
    clearInterval(timerInterval);
    clearInterval(stopwatchInterval);
    document.getElementById("timer-stopwatch-display").innerHTML = "00:00";

    // Reset inputs
    document.getElementById("minutes-input").value = 1;
    document.getElementById("seconds-input").value = 0;

    // Reset states
    isTimerRunning = false;
    isStopwatchRunning = false;
    isTimerPaused = false;

    // Reset buttons to initial state
    updateButtonState("start");
}

function disableAllButtonsExcept(...exceptButtons) {
    const allButtons = ["start-btn", "pause-btn", "stop-btn", "reset-btn"];
    allButtons.forEach(buttonId => {
        if (!exceptButtons.includes(buttonId)) {
            document.getElementById(buttonId).disabled = false;
        }
    });
}

function enableAllButtons() {
    const allButtons = ["start-btn", "pause-btn", "stop-btn", "reset-btn"];
    allButtons.forEach(buttonId => {
        document.getElementById(buttonId).disabled = false;
    });
}

function updateButtonState(state) {
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const stopBtn = document.getElementById("stop-btn");
    const resetBtn = document.getElementById("reset-btn");

    if (state === "start") {
        startBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
        stopBtn.style.display = "none";
        resetBtn.style.display = "none";

        // Enable start button and disable others
        enableAllButtons();
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
    } else if (state === "pause") {
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        stopBtn.style.display = "inline-block";
        resetBtn.style.display = "none";

        // Disable start, stop, reset button, enable pause
        disableAllButtonsExcept("start", "reset");
        pauseBtn.innerText = "Pause";
    } else if (state === "resume") {
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        stopBtn.style.display = "inline-block";
        resetBtn.style.display = "none";

        // Switch Pause to Resume button
        pauseBtn.innerText = "Resume";
        stopBtn.disabled = true;
    } else if (state === "reset") {
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
        resetBtn.style.display = "inline-block";

        // Enable reset button and disable others
        disableAllButtonsExcept("reset");
        pauseBtn.innerText = "Resume";
    }
}

// Initial Button State
updateButtonState("start");
