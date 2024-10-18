let playerMove = '';
let wins = 0;
let draw = 0;
let loss = 0;

// Load previous results from local storage if available
loadResultsFromLocalStorage();

// Access background music
const music = document.getElementById('backgroundMusic');

// Play background music
function playBackgroundMusic() {
    music.play().catch(error => {
        console.error('Error trying to play audio:', error);
        // Handle error (e.g., show a message to the user)
    });
}

// Pause background music when the game resets
function pauseBackgroundMusic() {
    music.pause();
    music.currentTime = 0; // Reset to the beginning
}

// Setup the game when the page loads
window.onload = function() {
    loadResultsFromLocalStorage(); // Load results when the page loads
    playBackgroundMusic(); // Play music when the page loads
};

// Button event listeners for player moves
document.querySelectorAll('.js-button').forEach((button) => {
    button.addEventListener('click', () => {
        playerMove = button.value;
        playGame(playerMove);
    });
});

// Play game logic
function playGame(playerMove) {
    // Generate a random number between 0 and 1
    let computerMove = Math.random();
    let result = '';

    // Determine the computer's move based on the random number
    if (computerMove < 1 / 3) {
        computerMove = "✊🏾Rock";
    } else if (computerMove < 2 / 3) {
        computerMove = "🤚🏾Paper";
    } else {
        computerMove = "✌🏾 Scissors";
    }

    // Game logic
    if (playerMove === "🤚🏾Paper") {
        if (computerMove === "✊🏾Rock") {
            result = "Win";
            wins++;
        } else if (computerMove === "🤚🏾Paper") {
            result = "Draw";
            draw++;
        } else if (computerMove === "✌🏾 Scissors") {
            result = "Lose";
            loss++;
        }
    } else if (playerMove === "✊🏾Rock") {
        if (computerMove === "✊🏾Rock") {
            result = "Draw";
            draw++;
        } else if (computerMove === "🤚🏾Paper") {
            result = "Lose";
            loss++;
        } else if (computerMove === "✌🏾 Scissors") {
            result = "Win";
            wins++;
        }
    } else if (playerMove === "✌🏾 Scissors") {
        if (computerMove === "✊🏾Rock") {
            result = "Lose";
            loss++;
        } else if (computerMove === "🤚🏾Paper") {
            result = "Win";
            wins++;
        } else if (computerMove === "✌🏾 Scissors") {
            result = "Draw";
            draw++;
        }
    }

    // Save results to local storage
    saveResultsToLocalStorage(result);

    // Log the result and update the UI
    console.log(result);
    document.querySelector('.js-playerMove').innerHTML = `Your Move: ${playerMove}`;
    document.querySelector('.js-computerMove').innerHTML = `Computer's Move: ${computerMove}`;
    updateResultsUI();
}

// Save results to local storage
function saveResultsToLocalStorage(result) {
    localStorage.setItem('wins', wins);
    localStorage.setItem('draw', draw);
    localStorage.setItem('loss', loss);
    localStorage.setItem('result', result); // Save the result to local storage
}

// Load results from local storage
function loadResultsFromLocalStorage() {
    if (localStorage.getItem('wins')) {
        wins = parseInt(localStorage.getItem('wins'), 10);
    }
    if (localStorage.getItem('draw')) {
        draw = parseInt(localStorage.getItem('draw'), 10);
    }
    if (localStorage.getItem('loss')) {
        loss = parseInt(localStorage.getItem('loss'), 10);
    }
    updateResultsUI(); // Update the UI with loaded results
}

// Update the results UI
function updateResultsUI() {
    document.querySelector('.js-results').innerHTML = `Wins: ${wins} Draw: ${draw} Loss: ${loss}`;
}

// Clear results function
function clearResults() {
    localStorage.clear();
    wins = 0;
    draw = 0;
    loss = 0;
    updateResultsUI();
}

// Get the mute button and volume icon
const muteButton = document.getElementById('muteButton');
const volumeIcon = document.getElementById('volumeIcon');

// Initialize a variable to keep track of the mute state
let isMuted = true; // Assume it's initially muted

// Function to toggle the mute state
muteButton.addEventListener('click', () => {
    if (isMuted) {
        // Change to volume on icon
        volumeIcon.classList.remove('fa-volume-off');
        volumeIcon.classList.add('fa-volume-high');
        // Unmute the audio and video
        document.getElementById('backgroundMusic').muted = false;
        document.getElementById('backgroundVideo').muted = false;
    } else {
        // Change to volume off icon
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-off');
        // Mute the audio and video
        document.getElementById('backgroundMusic').muted = true;
        document.getElementById('backgroundVideo').muted = true;
    }
    // Toggle the mute state
    isMuted = !isMuted;
});

// Add event listener to the reset button
document.querySelector('.js-reset').addEventListener('click', clearResults);
