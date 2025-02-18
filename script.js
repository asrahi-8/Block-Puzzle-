const grid = document.querySelector('.grid');
const blocks = document.querySelectorAll('.block');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset');
let score = 0;

// Initialize the grid
function createGrid() {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
}

// Check if the block can be placed
function canPlaceBlock(block, index) {
    const shape = block.dataset.shape;
    const cells = Array.from(grid.children);

    // Simple shape check (L, I, O, T)
    switch (shape) {
        case 'L':
            return cells[index] && cells[index + 1] && cells[index + 2] && cells[index + 4];
        case 'I':
            return cells[index] && cells[index + 4] && cells[index + 8] && cells[index + 12];
        case 'O':
            return cells[index] && cells[index + 1] && cells[index + 4] && cells[index + 5];
        case 'T':
            return cells[index] && cells[index + 1] && cells[index + 2] && cells[index + 5];
        default:
            return false;
    }
}

// Place the block on the grid
function placeBlock(block, index) {
    const shape = block.dataset.shape;
    const cells = Array.from(grid.children);

    if (canPlaceBlock(block, index)) {
        switch (shape) {
            case 'L':
                cells[index].style.backgroundColor = '#8e44ad';
                cells[index + 1].style.backgroundColor = '#8e44ad';
                cells[index + 2].style.backgroundColor = '#8e44ad';
                cells[index + 4].style.backgroundColor = '#8e44ad';
                break;
            case 'I':
                cells[index].style.backgroundColor = '#3498db';
                cells[index + 4].style.backgroundColor = '#3498db';
                cells[index + 8].style.backgroundColor = '#3498db';
                cells[index + 12].style.backgroundColor = '#3498db';
                break;
            case 'O':
                cells[index].style.backgroundColor = '#f1c40f';
                cells[index + 1].style.backgroundColor = '#f1c40f';
                cells[index + 4].style.backgroundColor = '#f1c40f';
                cells[index + 5].style.backgroundColor = '#f1c40f';
                break;
            case 'T':
                cells[index].style.backgroundColor = '#e67e22';
                cells[index + 1].style.backgroundColor = '#e67e22';
                cells[index + 2].style.backgroundColor = '#e67e22';
                cells[index + 5].style.backgroundColor = '#e67e22';
                break;
        }
        score += 10;
        scoreDisplay.textContent = score;
        block.style.display = 'none';
    } else {
        alert('Cannot place block here!');
    }
}

// Reset the game
function resetGame() {
    grid.innerHTML = '';
    createGrid();
    blocks.forEach(block => block.style.display = 'block');
    score = 0;
    scoreDisplay.textContent = score;
}

// Event listeners
blocks.forEach(block => {
    block.addEventListener('click', () => {
        const index = Math.floor(Math.random() * 16);
        placeBlock(block, index);
    });
});

resetButton.addEventListener('click', resetGame);

// Initialize the game
createGrid();
