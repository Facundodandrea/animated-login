const image = document.getElementById('image');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

let currentImageIndex = 0;
const maxImageIndex = {
    email: 20, // Máximo índice para email (watch_bear)
    password: 5, // Máximo índice para password (hide_bear)
};

let focusEndIndex = 2; // Índice final al terminar la animación del focus
let blurSequenceInterval = null;

function updateImage(inputType) {
    const basePath = inputType === 'password' ? './assets/hide_bear' : './assets/watch_bear';
    image.src = `${basePath}${currentImageIndex}.png`;
}

// Reproduce la secuencia inicial de focus
function playFocusSequence(inputType, onComplete) {
    let focusSequenceIndex = currentImageIndex;
    const maxIndex = inputType === 'password' ? maxImageIndex.password : focusEndIndex;

    const focusInterval = setInterval(() => {
        updateImage(inputType);
        focusSequenceIndex++;
        currentImageIndex = focusSequenceIndex;

        if (focusSequenceIndex > maxIndex) {
            clearInterval(focusInterval);
            if (onComplete) onComplete();
        }
    }, 35);
}

// Reproduce la secuencia de blur hacia atrás
function playBlurSequence(inputType) {
    clearInterval(blurSequenceInterval);
    blurSequenceInterval = setInterval(() => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateImage(inputType);
        } else {
            clearInterval(blurSequenceInterval);
        }
    }, 35);
}

// Maneja el evento de focus en email
emailInput.addEventListener('focus', () => {
    currentImageIndex = 0;
    clearInterval(blurSequenceInterval);
    playFocusSequence('email');
});

// Maneja el evento de input en email
emailInput.addEventListener('input', (event) => {
    if (emailInput.value.length === 0) {
        currentImageIndex = focusEndIndex;
    } else {
        if (event.inputType === 'deleteContentBackward') {
            currentImageIndex = Math.max(focusEndIndex, currentImageIndex - 1);
        } else {
            currentImageIndex = Math.min(maxImageIndex.email, currentImageIndex + 1);
        }
    }
    updateImage('email');
});

// Maneja el evento de blur en email
emailInput.addEventListener('blur', () => {
    playBlurSequence('email');
});

// Maneja el evento de focus en password
passwordInput.addEventListener('focus', () => {
    currentImageIndex = 0;
    clearInterval(blurSequenceInterval);
    playFocusSequence('password');
});

// Maneja el evento de blur en password
passwordInput.addEventListener('blur', () => {
    
    playBlurSequence('password');
});

updateImage('password');
