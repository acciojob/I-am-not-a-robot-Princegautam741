// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Get the main container and the h3 element
const main = document.querySelector('main');
const h3 = document.createElement('h3');
h3.id = 'h';
h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
main.appendChild(h3);

const imageUrls = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/seed/picsum/200/300',
    'https://picsum.photos/200/300?grayscale',
    'https://picsum.photos/200/300/',
    'https://picsum.photos/200/300.jpg',
];

// Duplicate one of the images
imageUrls.push(imageUrls[Math.floor(Math.random() * imageUrls.length)]);

shuffleArray(imageUrls);

// Create and add image elements to the main container
for (let i = 1; i <= 6; i++) {
    const img = document.createElement('img');
    img.src = imageUrls[i - 1];
    img.className = `img${i}`;
    main.appendChild(img);
}

const images = document.querySelectorAll('img');
let selectedImages = [];

// Click event for images
images.forEach((image) => {
    image.addEventListener('click', () => {
        // Check if the image is already selected
        if (image.classList.contains('selected')) return;

        // Check the state to determine behavior
        switch (selectedImages.length) {
            case 0:
                // State 1: User has not clicked any tiles
                selectedImages.push(image);
                image.classList.add('selected');
                break;

            case 1:
                // State 2: User has clicked at least one tile
                const resetButton = document.createElement('button');
                resetButton.id = 'reset';
                resetButton.textContent = 'Reset';
                resetButton.addEventListener('click', reset);
                main.appendChild(resetButton);
                selectedImages.push(image);
                image.classList.add('selected');
                break;

            case 2:
                // State 3: User has clicked both tiles
                const verifyButton = document.createElement('button');
                verifyButton.id = 'verify';
                verifyButton.textContent = 'Verify';
                verifyButton.addEventListener('click', verify);
                main.appendChild(verifyButton);
                break;
        }
    });
});

function reset() {
    selectedImages.forEach((image) => {
        image.classList.remove('selected');
    });
    selectedImages = [];
    document.getElementById('reset').remove();
}

function verify() {
    if (
        selectedImages[0].src === selectedImages[1].src &&
        selectedImages[0].classList[0] !== selectedImages[1].classList[0]
    ) {
        h3.textContent = 'You are a human. Congratulations!';
    } else {
        h3.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    selectedImages = [];
    document.getElementById('verify').remove();
}
