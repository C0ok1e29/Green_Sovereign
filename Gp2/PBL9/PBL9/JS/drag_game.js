// Game Variables
let timer = null;
let timeleft = 180; // 3 minutes in seconds
let gameActive = false;
let gameSubmitted = false;
let draggedItem = null;
let currentItems = [];
let score = 0;

const allItems = [
    // PLASTIC ITEMS - Using free placeholder images
    { id: "item-1", type: "plastic", name: "Plastic Bottle", image: "../image2/plastics-icon.jpg", color: "primary" },
    { id: "item-2", type: "plastic", name: "Chip Bag", image: "../image2/chip-bag.jpg", color: "primary" },
    { id: "item-3", type: "plastic", name: "Plastic Cup", image: "../image2/plastics-cup.webp", color: "primary" },
    { id: "item-4", type: "plastic", name: "Plastic Straw", image: "../image2/plastics-staw.webp", color: "primary" },
    { id: "item-5", type: "plastic", name: "Plastic Bag", image: "../image2/plastics-bag.jpg", color: "primary" },
    
    // PAPER ITEMS
    { id: "item-6", type: "paper", name: "Newspaper", image: "../image2/newspaper.webp", color: "success" },
    { id: "item-7", type: "paper", name: "Cardboard Box", image: "../image2/cardboard-box.avif", color: "success" },
    { id: "item-8", type: "paper", name: "Paper Cup", image: "../imag../e2/paper-cup.jfif", color: "success" },
    { id: "item-9", type: "paper", name: "Tissue Paper", image: "image2/tissue.jpg", color: "success" },
    { id: "item-10", type: "paper", name: "food box", image: "../image2/food-box.jfif", color: "success" },
    
    // GLASS ITEMS
    { id: "item-11", type: "glass", name: "Glass Bottle", image: "../image2/glass-bottle.avif", color: "warning" },
    { id: "item-12", type: "glass", name: "Broken Glass", image: "../image2/broken-glass.jpg", color: "warning" },
    { id: "item-13", type: "glass", name: "Jam Jar", image: "../image2/jam-jar.webp", color: "warning" },
    
    // ORGANIC ITEMS
    { id: "item-14", type: "organic", name: "Apple Core", image: "../image2/apple-core.jfif", color: "danger" },
    { id: "item-15", type: "organic", name: "Banana Peel", image: "../image2/banana_peel.png", color: "danger" },
    { id: "item-16", type: "organic", name: "Orange Peel", image: "../image2/orange-peel.jfif", color: "danger" },
    { id: "item-17", type: "organic", name: "Leaf Pile", image: "../image2/leaf-Pile.jpg", color: "danger" },
    { id: "item-18", type: "organic", name: "Grass Clippings", image: "../image2/grass.jfif", color: "danger" },
    
    // METAL ITEMS
    { id: "item-19", type: "metal", name: "Soda Can", image: "https://cdn.pixabay.com/photo/2014/09/26/19/51/coca-cola-462776_640.jpg", color: "info" },
    { id: "item-20", type: "metal", name: "Food Can", image: "../image2/food-can.jpg", color: "info" },
    { id: "item-21", type: "metal", name: "Foil Wrapper", image: "../image2/foil-wrapper.png", color: "info" },
    
    // E-WASTE ITEMS
    { id: "item-22", type: "e-waste", name: "Battery", image: "../image2/battery.jpg", color: "dark" },
    { id: "item-23", type: "e-waste", name: "Broken electronic", image: "../image2/broken-eletronics.jpg", color: "dark" },
    { id: "item-24", type: "e-waste", name: "Headphones", image: "../image2/headphone.jpg", color: "dark" }
];

// Correct answers storing
// Correct answers (names must match `allItems[].name`)
const correctAnswers = {
  plastic: [
    "Plastic Bottle",
    "Chip Bag",
    "Plastic Cup",
    "Plastic Straw",
    "Plastic Bag"
  ],
  paper: [
    "Newspaper",
    "Cardboard Box",
    "Paper Cup",
    "Tissue Paper",
    "food box"
  ],
  glass: [
    "Glass Bottle",
    "Broken Glass",
    "Jam Jar"
  ],
  organic: [
    "Apple Core",
    "Banana Peel",
    "Orange Peel",
    "Leaf Pile",
    "Grass Clippings"
  ],
  metal: [
    "Soda Can",
    "Food Can",
    "Foil Wrapper"
  ],
  "e-waste": [
    "Battery",
    "Broken electronic",
    "Headphones"
  ]
};


// Get random 8 items from pool
function getRandomItems(count = 8) {
    // [...allItems makes new copy array], .sort() changes the array, to prevent changing array, copy the array first
    //... is the spread operator
    const shuffled = [...allItems].sort(() => 0.5 - Math.random()); //Sorts the array using a random value (sometimes positive, sometimes negative), making it shuffle
    // .sort() with a random comparator shuffles the array randomly.

    return shuffled.slice(0, count); 
    
}

// display items
function displayItems(items) {
    // calling the items that will be display
    const container = document.getElementById('items-container');
    // items  = [applecore,plastics-bottle,etc]
    // item = applecore
 
    
    container.innerHTML = '';
    
    
    items.forEach(item => {
        // create div and add the class
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-3 mb-3';
        
        // Check if item has image or icon
        // condition? value if true : value
        const itemImage = item.image ? 
            `<img src="${item.image}" alt="${item.name}" class="item-image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">` :
            `<i class="${item.icon} fa-2x text-${item.color} mb-2"></i>`;
        
        // chcecking with ternary operator, 
        col.innerHTML = `
            <div class="drag-item bg-white p-3 rounded border border-${item.color} shadow-sm text-center"
                 id="${item.id}" data-type="${item.type}" draggable="true">
                ${itemImage}
                <div class="item-name fw-bold mt-2">${item.name}</div>
            </div>
        `;
        container.appendChild(col);
    });
    
    // Update items left counter
    const itemsLeftElement = document.getElementById('items-left');
    if (itemsLeftElement) {
        itemsLeftElement.textContent = items.length;
    }
    
    attachDragListeners();
}

// Initialize game
function initializeGame() {
    clearInterval(timer);
    timeleft = 180;
    gameActive = false;
    gameSubmitted = false;
    score = 0;
    
    // Update displays
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '03:00';
    document.getElementById('timer').classList.remove('timer-warning');
    document.getElementById('result').style.display = 'none';
    
    // Enable buttons
    document.getElementById('startBtn').disabled = false;
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('reloadBtn').disabled = false;
    
    // Clear all bins
    document.querySelectorAll('.bin-items').forEach(bin => {
        bin.innerHTML = '';
    });
    
    // Get and display initial 8 items
    currentItems = getRandomItems(8);
    displayItems(currentItems);
}

// Timer functions
function startTimer() {
    if (timer) clearInterval(timer); // stop the timer
    
    timer = setInterval(() => {
        timeleft--; // started counting the time, decrease the time
        updateTimerDisplay();
        
        // if time is less then 30 seconds, it will add the class name timer-warning
        if (timeleft <= 30) {
            document.getElementById('timer').classList.add('timer-warning');
        }
        
        if (timeleft <= 0) {
            clearInterval(timer);
            gameActive = false;
            document.getElementById('result').innerHTML = `
                <div class="alert alert-warning">
                    <h4><i class="fas fa-clock me-2"></i>Time's Up!</h4>
                    <p>Time has run out. Click Submit to see your score.</p>
                </div>
            `;
            // in order to show the text, the style sholud be d-block, (in css is display:none)
            document.getElementById('result').style.display = 'block';
        }
    }, 1000);
}

// updateTimer
function updateTimerDisplay() {
    // converting total seconds into minutes and seconds
    // if example: the timeleft = 95 sec, 1 min, 35 second
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;
    document.getElementById('timer').textContent = 
         // minutes.tostring -> number to string
         // 2 . padStart (2,'0'), shows 02 [2mins]
         // 5. padstart(2,'0'), show 05
         // 02:05
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Drag and drop functions
function attachDragListeners() {
    //dragstart → when the user starts dragging an item

    // dragend → when the user lets go the items
    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
}

function handleDragStart(e) {
    //If the game isn’t running or it’s already been submitted, bail out — no dragging allowed.
    if (!gameActive || gameSubmitted) return;
    draggedItem = this;
    this.classList.add('dragging');
    // Sets the dragged item’s ID into the drag event, so the drop target knows what was dragged.
    e.dataTransfer.setData('text/plain', this.id);
}

function handleDragEnd() {
    // remove the class
    this.classList.remove('dragging');
}

// Setup drop zones
document.querySelectorAll('.drop-bin').forEach(bin => {
    bin.addEventListener('dragover', function(e) {
        if (!gameActive || gameSubmitted) return;
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    bin.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    bin.addEventListener('drop', function(e) {
        if (!gameActive || gameSubmitted || !draggedItem) return;
        e.preventDefault();
        this.classList.remove('drag-over');
        
        // Check if item is already in a bin
        const currentBin = draggedItem.closest('.drop-bin');
        if (currentBin) {
            currentBin.querySelector('.bin-items').removeChild(draggedItem);
        }
        
        // Add to new bin
        const binItems = this.querySelector('.bin-items');
        const itemClone = draggedItem.cloneNode(true);
        itemClone.classList.remove('border-' + draggedItem.dataset.type);
        itemClone.classList.add('dropped-item');
        itemClone.draggable = false;
        
        binItems.appendChild(itemClone);
        
        // Remove from game area
        draggedItem.remove();
        
        // Update items left counter
        const itemsLeft = document.querySelectorAll('.drag-item').length;
        document.getElementById('items-left').textContent = itemsLeft;
    });
});

// Button event listeners
document.getElementById('startBtn').addEventListener('click', function() {
      // Only start if the game is currently inactive
    if (!gameActive) {
        gameActive = true;
          // Disable the start button so it can’t be clicked again
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-pause me-2"></i>Game Running';
        startTimer();
    }
});

document.getElementById('restartBtn').addEventListener('click', function() {
    initializeGame();
});

document.getElementById('reloadBtn').addEventListener('click', function() {
    if (gameSubmitted) return;
    
    // Clear bins
    document.querySelectorAll('.bin-items').forEach(bin => {
        bin.innerHTML = '';
    });
    
    // Get new random items
    currentItems = getRandomItems(8); // GET THE RANDOM 8 ITEMS FOR ALLITEM POOL
    displayItems(currentItems);// SHWO NEW 8 ITENS
});

document.getElementById('submitBtn').addEventListener('click', function() {
    if (gameSubmitted) return;
    
    clearInterval(timer);
    gameSubmitted = true;
    gameActive = false;
    
    // Disable buttons
    document.getElementById('startBtn').disabled = true;
    document.getElementById('reloadBtn').disabled = true;
    this.disabled = true;
    
    // Calculate score
    calculateScore();
});

// Calculate score
function calculateScore() {
    let totalScore = 0;
    let maxScore = currentItems.length;
    let resultsHTML = '<h4><i class="fas fa-chart-bar me-2"></i>Game Results</h4>';
    
    document.querySelectorAll('.drop-bin').forEach(bin => {
        const binType = bin.dataset.type;
        const correctItems = correctAnswers[binType] || [];
        const binItems = bin.querySelector('.bin-items');
        const itemsInBin = Array.from(binItems.children).map(item => 
            item.querySelector('.item-name').textContent
        );
        
        let correctCount = 0;
        let wrongItems = [];
        
        // Check each item in bin
        itemsInBin.forEach(itemName => {
            if (correctItems.includes(itemName)) {
                correctCount++;
                totalScore++;
            } else {
                wrongItems.push(itemName);
            }
        });
        
        // Add to results
        if (itemsInBin.length > 0) {
            resultsHTML += `
                <div class="mb-3">
                    <strong>${binType.charAt(0).toUpperCase() + binType.slice(1)} Bin:</strong><br>
                    <span class="text-success">✓ Correct: ${correctCount} item(s)</span><br>
                    ${wrongItems.length > 0 ? `<span class="text-danger">✗ Wrong: ${wrongItems.join(', ')}</span><br>` : ''}
                </div>
            `;
        }
    });
    
    // Calculate percentage
    const percentage = Math.round((totalScore / maxScore) * 100);
    let resultClass = 'alert-success';
    let message = 'Excellent work!';
    
    if (percentage < 50) {
        resultClass = 'alert-danger';
        message = 'Keep practicing!';
    } else if (percentage < 80) {
        resultClass = 'alert-warning';
        message = 'Good job!';
    }
    
    // Update score display
    document.getElementById('score').textContent = totalScore;
    
    // Show results
    const resultDiv = document.getElementById('result');
    resultDiv.className = `alert ${resultClass}`;
    resultDiv.innerHTML = `
        ${resultsHTML}
        <hr>
        <div class="text-center">
            <h5>Final Score: ${totalScore}/${maxScore} (${percentage}%)</h5>
            <p class="mb-0"><strong>${message}</strong></p>
        </div>
    `;
    resultDiv.style.display = 'block';
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    // prevent loading too early
    // Initialize AOS
    if (typeof AOS !== '') {
        AOS.init({
            duration: 1000, // duration 1 second
            once: true // animations only run the first time the element scrolls into view
        });
    }
    
    // Initialize game
    initializeGame();
    
    // Add some animations to bins
    document.querySelectorAll('.drop-bin').forEach((bin, index) => {
        bin.style.opacity = '0'; // hiding
        bin.style.transform = 'translateY(20px)'; // moving downworad
        
        setTimeout(() => {
            bin.style.transition = 'all 0.5s ease';
            bin.style.opacity = '1';
            bin.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
