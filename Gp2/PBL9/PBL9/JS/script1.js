// This script is responsible for the Random Tip functionality.

const tips = [
    "Challenge yourself to leave the park cleaner than you found it.",
    "Avoid feeding wildlife; it disrupts their natural diet and habits.",
    "Choose reusable cloths instead of disposable wipes for cleaning up.",
    "Check local rules—some parks ban single-use plastics entirely!",
    "Take only pictures, leave only footprints. Respect nature."
];
const tipButton = document.getElementById('tip-button');
const tipOutput = document.getElementById('random-tip-output');

function generateRandomTip() {
    if (tips.length === 0) {
        tipOutput.textContent = "No tips available.";
        return;
    }
    
    // Logic to select and display a new tip without any animation classes
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipOutput.textContent = tips[randomIndex];
}

// Ensure the listener is attached once the button is available
if (tipButton) {
    tipButton.addEventListener('click', generateRandomTip);
}