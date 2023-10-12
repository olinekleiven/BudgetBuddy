document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const gameArea = document.getElementById('gameArea');
    const scoreElement = document.getElementById('coinsCollected');
    const startOverButton = document.getElementById('startOverButton');
    const startGameButton = document.getElementById('startGameButton'); // New

    // Game settings
    const gameAreaSize = 20;
    const speed = 5; // moves per second

    // Game state variables
    let score, snake, direction, coin, gameActive, gameInterval;

    // High scores variable
    let highScores = []; // Add this line at the top of your script

    // Initialize game
    function init() {
        startGameButton.addEventListener('click', startGame);
        startOverButton.addEventListener('click', startGame);
        window.addEventListener('keydown', changeDirection);
        startGame();
        startGameButton.style.display = 'block'; // New
    }

    // Start or restart the game
    function startGame() {
        gameActive = true;
        score = 0;
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        coin = generateCoin();
        scoreElement.textContent = score;
        startOverButton.style.display = 'none'; // Hide button when game starts
        if (gameInterval) clearInterval(gameInterval); // Clear existing interval to prevent speedup
        gameInterval = setInterval(updateGame, 1000 / speed); // Update game at the set speed
        startGameButton.style.display = 'none'; // nEW
    }

    // End the game
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval); // Stop game updates
        alert('Game Over! You collected ' + score + ' coins!');
        let playerName = prompt("You got a high score! Enter your name:"); // Prompt for player name
        if (playerName) {
            highScores.push({ name: playerName, score: score });
            highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
            highScores = highScores.slice(0, 10); // Keep only the top 10 scores
            updateHighScores(); // Update the high score list
        }
        startOverButton.style.display = 'block'; // Show the "Start Over" button
        startGameButton.style.display = 'none'; // Ensure the start button remains hidden
    }


    // Update the high score list
    function updateHighScores() {
        const highScoreList = document.getElementById('highScoreList');
        highScoreList.innerHTML = ''; // Clear the current list
        highScores.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
            highScoreList.appendChild(listItem);
        });
    }

    // Generate a new coin in the game area
    function generateCoin() {
        let newCoinPosition;
        do {
            newCoinPosition = {
                x: Math.floor(Math.random() * gameAreaSize),
                y: Math.floor(Math.random() * gameAreaSize)
            };
        } while (snake.some(segment => segment.x === newCoinPosition.x && segment.y === newCoinPosition.y));
        return newCoinPosition;
    }

    // Update game state in each interval
    function updateGame() {
        if (!gameActive) return; // Stop updating if game is not active

        // Move snake
        const newSnakeHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(newSnakeHead);

        // Check for coin collision
        if (newSnakeHead.x === coin.x && newSnakeHead.y === coin.y) {
            score++;
            scoreElement.textContent = score; // Update score display
            coin = generateCoin(); // Generate new coin
        } else {
            snake.pop(); // Remove the last snake segment if no coin was eaten
        }

        // Check for game over conditions
        if (hasGameEnded()) endGame();

        // Render the current game state
        renderGame();
    }

    // Check if the snake has collided with the wall or itself
    function hasGameEnded() {
        const head = snake[0];
        const hitWall = head.x < 0 || head.x >= gameAreaSize || head.y < 0 || head.y >= gameAreaSize;
        const hitSelf = snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
        return hitWall || hitSelf;
    }

    // Render the game area, snake, and coin
    function renderGame() {
        gameArea.innerHTML = ''; // Clear previous game state
        snake.forEach(renderSnakeSegment); // Render each snake segment
        renderCoin(); // Render the coin
    }

    // Create and display a snake segment in the game area
    function renderSnakeSegment(segment) {
        const element = document.createElement('div');
        element.style.gridRowStart = segment.y + 1;
        element.style.gridColumnStart = segment.x + 1;
        element.classList.add('snake');
        gameArea.appendChild(element);
    }

    // Create and display the coin in the game area
    function renderCoin() {
        const coinElement = document.createElement('div');
        coinElement.style.gridRowStart = coin.y + 1;
        coinElement.style.gridColumnStart = coin.x + 1;
        coinElement.classList.add('coin');
        gameArea.appendChild(coinElement);
    }

    // Change the snake's direction based on the arrow key pressed
    function changeDirection(event) {
        const directions = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 }
        };
        const newDirection = directions[event.key];
        if (newDirection) {
            // Prevent the snake from reversing direction
            const isOppositeDirection = direction.x === newDirection.x * -1 && direction.y === newDirection.y * -1;
            if (!isOppositeDirection) direction = newDirection;
        }
    }

    // Start the game initialization
    init();
});
