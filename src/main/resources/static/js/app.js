document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const welcomeModal = document.getElementById('welcomeModal');
    const startBtn = document.getElementById('startBtn');
    
    startBtn.addEventListener('click', () => {
        welcomeModal.classList.add('hidden');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 500); // Wait for transition
        generateArray();
    });

    // Visualizer Logic
    const arrayContainer = document.getElementById('arrayContainer');
    const btnGenerate = document.getElementById('generateArray');
    const btnSort = document.getElementById('sortBtn');
    
    const ARRAY_SIZE = 30;
    const ANIMATION_SPEED_MS = 50;
    let currentArray = [];
    let isSorting = false;

    function generateArray() {
        if (isSorting) return;
        currentArray = [];
        arrayContainer.innerHTML = '';
        
        for (let i = 0; i < ARRAY_SIZE; i++) {
            // Values between 20 and 400
            const val = Math.floor(Math.random() * 380) + 20;
            currentArray.push(val);
            
            const bar = document.createElement('div');
            bar.classList.add('array-bar');
            bar.style.height = `${val}px`;
            
            arrayContainer.appendChild(bar);
        }
    }

    // Helper for sleeping
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
        if (isSorting) return;
        isSorting = true;
        btnGenerate.disabled = true;
        btnSort.disabled = true;
        
        const bars = document.getElementsByClassName('array-bar');
        const len = currentArray.length;
        
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                // Highlight active bars
                bars[j].style.backgroundColor = 'var(--bar-active)';
                bars[j + 1].style.backgroundColor = 'var(--bar-active)';
                
                await sleep(ANIMATION_SPEED_MS);
                
                if (currentArray[j] > currentArray[j + 1]) {
                    // Swap logic
                    let temp = currentArray[j];
                    currentArray[j] = currentArray[j + 1];
                    currentArray[j + 1] = temp;
                    
                    // Swap heights in DOM
                    bars[j].style.height = `${currentArray[j]}px`;
                    bars[j + 1].style.height = `${currentArray[j + 1]}px`;
                }
                
                // Reset color
                bars[j].style.backgroundColor = 'var(--bar-color)';
                bars[j + 1].style.backgroundColor = 'var(--bar-color)';
            }
            // Mark the last element as sorted
            bars[len - 1 - i].style.backgroundColor = 'var(--bar-sorted)';
        }
        // Mark the very first element as sorted
        bars[0].style.backgroundColor = 'var(--bar-sorted)';
        
        isSorting = false;
        btnGenerate.disabled = false;
        btnSort.disabled = false;
    }

    btnGenerate.addEventListener('click', generateArray);
    btnSort.addEventListener('click', bubbleSort);
});
