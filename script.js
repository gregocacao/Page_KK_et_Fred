document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const correctCipherAnswer = "CAROLEETFREDFOREVER";
    const numCipherLetters = 19;

    const correctRebusAnswer = "MARCANTOINEAMIEL";
    const numRebusLetters = 16;

    // Function to render the Home Page
    function renderHomePage() {
        app.innerHTML = `
            <div class="container" id="home-page">
                <img src="fouras.jpg" alt="Fouras" class="home-image">
                <p>Bonjour Carole et Fred. Sonia et Grégory m'ont confié deux nouvelles énigmes pour vous !</p>
                <button id="continue-button">Poursuivre</button>
            </div>
        `;

        document.getElementById('continue-button').addEventListener('click', renderCipherPage);
    }

    // Function to render the Cipher Page (Enigma 1)
    function renderCipherPage() {
        app.innerHTML = `
            <div class="container" id="cipher-container">
                <h1>Enigme n°1: Décodez ce Message !</h1>
                <p>Observez attentivement cette image. Elle contient un message crypté. Entrez les <strong>${numCipherLetters} lettres décodées</strong> ci-dessous.</p>
                <div class="cipher-challenge">
                    <img src="cryptogramme.png" alt="Message Crypté" class="cryptogram-image">
                    <div class="input-grid" id="cipher-input-grid">
                        <!-- The input fields will be generated here by generateCipherInputs -->
                    </div>
                    <button id="decrypt-button">Déchiffrer</button>
                    <p id="cipher-feedback" class="feedback"></p>
                </div>
            </div>
        `;

        const cipherInputGrid = document.getElementById('cipher-input-grid');
        const decryptButton = document.getElementById('decrypt-button');
        const cipherFeedback = document.getElementById('cipher-feedback');

        generateInputGrid(cipherInputGrid, numCipherLetters, 'cipher-letter-input'); // Pas de spaceIndices ici

        decryptButton.addEventListener('click', () => {
            let userAnswer = '';
            const inputs = document.querySelectorAll('.cipher-letter-input');
            inputs.forEach(input => {
                userAnswer += input.value.toUpperCase();
            });

            if (userAnswer === correctCipherAnswer) {
                cipherFeedback.textContent = "Magnifique ! Vous avez déchiffré le message ! Vous êtes vraiment très fort !";
                cipherFeedback.className = "feedback success";
                setTimeout(renderRebusPage, 1500);
            } else {
                cipherFeedback.textContent = "Ce n'est pas tout à fait ça. Continuez d'essayer ! ";
                cipherFeedback.className = "feedback error";
            }
        });
    }

    // Function to render the Rebus Page (Enigma 2)
    function renderRebusPage() {
        app.innerHTML = `
            <div class="container" id="rebus-container">
                <h1>Enigme n°2: Le Rébus !</h1>
                <p>Ce rébus vous permettra de découvrir qui est l'auteur de la chasse au trésor qui vous attends ! </p>
                <div class="rebus-challenge">
                    <img src="rebus.png" alt="Rébus" class="cryptogram-image">
                    <div class="input-grid" id="rebus-input-grid">
                        <!-- The input fields will be generated here -->
                    </div>
                    <button id="solve-rebus-button">Résoudre le rébus</button>
                    <p id="rebus-feedback" class="feedback"></p>
                </div>
            </div>
        `;

        const rebusInputGrid = document.getElementById('rebus-input-grid');
        const solveRebusButton = document.getElementById('solve-rebus-button');
        const rebusFeedback = document.getElementById('rebus-feedback');

        generateInputGrid(rebusInputGrid, numRebusLetters, 'rebus-letter-input'); // Pas de spaceIndices ici

        solveRebusButton.addEventListener('click', () => {
            let userAnswer = '';
            const inputs = document.querySelectorAll('.rebus-letter-input');
            inputs.forEach(input => {
                userAnswer += input.value.toUpperCase();
            });

            if (userAnswer === correctRebusAnswer) {
                rebusFeedback.textContent = "Fantastique ! Vous avez résolu le rébus ! Passez à la dernière étape. Bisous, Sonia et Grégory.";
                rebusFeedback.className = "feedback success";
                setTimeout(renderFinalPage, 1500);
            } else {
                rebusFeedback.textContent = "Presque ! Réfléchissez bien aux images. ";
                rebusFeedback.className = "feedback error";
            }
        });
    }

    // Generic function to generate input fields (simplifiée)
    function generateInputGrid(gridElement, numLetters, inputClass) {
        gridElement.innerHTML = '';
        for (let i = 0; i < numLetters; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add(inputClass);
            input.dataset.index = i;
            gridElement.appendChild(input);

            input.addEventListener('input', (event) => {
                event.target.value = event.target.value.toUpperCase();
                if (event.target.value.length === 1) {
                    const nextInput = document.querySelector(`.${inputClass}[data-index="${i + 1}"]`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && event.target.value.length === 0) {
                    const prevInput = document.querySelector(`.${inputClass}[data-index="${i - 1}"]`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        }
        document.querySelector(`.${inputClass}[data-index="0"]`).focus();
    }


// Function to render the Final Page
function renderFinalPage() {
    app.innerHTML = `
        <div class="container final-page" id="final-page">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background-color: white;
                    overflow: hidden; /* Empêche le défilement */
                }
                .image-container {
                    max-width: 100%; /* S'assure que l'image ne dépasse pas la largeur du conteneur parent */
                    max-height: 100vh; /* S'assure que l'image ne dépasse pas la hauteur de la vue */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .image-container img {
                    max-width: 100%; /* L'image prend 100% de la largeur disponible dans son conteneur */
                    max-height: 100vh; /* L'image prend 100% de la hauteur disponible dans la vue */
                    height: auto; /* Maintient le ratio de l'image */
                    display: block; /* Supprime l'espace sous l'image */
                }
            </style>
            <div class="image-container">
                <img src="parchemin.png" alt="Parchemin final">
            </div>
        </div>
    `;
}
    // Initial load: render the home page
    renderHomePage();
});
