const container = document.querySelector('#container')
const baseURL = "https://raw.githubusercontent.com/EmanuelFrigodeOliveira/myGalery/main/photos/Foto_"
const batchSize = 8; // Load n images at a time
const maxImages = 334; // Maximum number of images available
let loadedImages = new Set(); // Track which images we've already loaded
let isLoading = false; // Prevent multiple simultaneous loads

// Function to get random numbers that haven't been used yet
function getRandomImageNumbers(count) {
    const randomNumbers = [];
    while (randomNumbers.length < count && loadedImages.size < maxImages) {
        const randomNum = Math.floor(Math.random() * maxImages) + 1; // 1 to 334
        if (!loadedImages.has(randomNum)) {
            randomNumbers.push(randomNum);
            loadedImages.add(randomNum);
        }
    }
    return randomNumbers;
}

// Function to load a batch of images
function loadImages() {
    if (isLoading || loadedImages.size >= maxImages) return; // Stop if we've loaded all images
    isLoading = true;
    
    console.log(`Loading batch, total loaded: ${loadedImages.size}`); // Debug log
    
    const randomImageNumbers = getRandomImageNumbers(batchSize);
    let loadedCount = 0; // Declare loadedCount here
    
    randomImageNumbers.forEach(imageNum => {
        const newImg = document.createElement('img');
        newImg.src = `${baseURL}${imageNum}.jpg`;
        
        // Use addEventListener for load event
        newImg.addEventListener('load', () => {
            // Remove loading class and add fade-in animation
            newImg.classList.remove('loading');
            newImg.classList.add('fade-in');
            
            // Calculate how many grid rows this image should span
            const rowHeight = 10; // Must match grid-auto-rows in CSS
            const imageHeight = newImg.offsetHeight;
            const rowSpan = Math.ceil(imageHeight / rowHeight);
            newImg.style.setProperty('--row-span', rowSpan);
            
            loadedCount++;
            if (loadedCount === randomImageNumbers.length) {
                setTimeout(() => {
                    isLoading = false;
                }, 100);
            }
        });
        
        // Use addEventListener for error event
        newImg.addEventListener('error', () => {
            // Handle case where image doesn't exist
            console.log(`Image ${imageNum} not found`);
            
            loadedCount++;
            if (loadedCount === randomImageNumbers.length) {
                setTimeout(() => {
                    isLoading = false;
                }, 100);
            }
        });
        
        // Add loading class initially
        newImg.classList.add('loading');
        container.appendChild(newImg);
    });
}

// Load initial batch
loadImages();

// Throttle the scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Check if user is near bottom of page and we haven't loaded all images
        if (loadedImages.size < maxImages && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadImages();
        }
    }, 150); // Wait 150ms after scroll stops
});