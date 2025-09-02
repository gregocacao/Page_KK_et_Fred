document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const correctCipherAnswer = "CAROLEETFREDFOREVER"; 
    const numCipherLetters = 19; 

    // Function to render the Home Page
    function renderHomePage() {
        app.innerHTML = `
            <div class="container" id="home-page">
                <img src="fouras.jpg" alt="Fouras" class="home-image">
                <p>Bonjour Carole et Fred. Sonia et Grégory ont deux nouvelles énigme pour vous !n nouveau défi vous attend !</p>
                <button id="continue-button">Poursuivre</button>
            </div>
        `;

        document.getElementById('continue-button').addEventListener('click', renderCipherPage);
    }

    // Function to render the Cipher Page
    function renderCipherPage() {
        app.innerHTML = `
            <div class="container" id="cipher-container">
                <h1>Carole et Fred, décodez ce Message !</h1>
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

        generateCipherInputs(cipherInputGrid, numCipherLetters);

        decryptButton.addEventListener('click', () => {
            let userAnswer = '';
            const inputs = document.querySelectorAll('.cipher-letter-input');
            inputs.forEach(input => {
                userAnswer += input.value.toUpperCase();
            });

            if (userAnswer === correctCipherAnswer) {
                cipherFeedback.textContent = "Magnifique ! Vous avez déchiffré le message ! Vous avancez à la prochaine étape. Bisous, Sonia et Grégory";
                cipherFeedback.className = "feedback success";
                setTimeout(renderMarcoPage, 1500);
            } else {
                cipherFeedback.textContent = "Ce n'est pas tout à fait ça. Continuez d'essayer ! ";
                cipherFeedback.className = "feedback error";
            }
        });
    }

    // Function to generate the cipher input fields
    function generateCipherInputs(gridElement, numLetters) {
        gridElement.innerHTML = '';
        for (let i = 0; i < numLetters; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('cipher-letter-input');
            input.dataset.index = i;
            gridElement.appendChild(input);

            input.addEventListener('input', (event) => {
                event.target.value = event.target.value.toUpperCase();
                if (event.target.value.length === 1) {
                    const nextInput = document.querySelector(`.cipher-letter-input[data-index="${i + 1}"]`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && event.target.value.length === 0) {
                    const prevInput = document.querySelector(`.cipher-letter-input[data-index="${i - 1}"]`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        }
        // Focus the first input after generation
        document.querySelector('.cipher-letter-input[data-index="0"]').focus();
    }

    // Function to render the Marco Page
    function renderMarcoPage() {
        app.innerHTML = `
            <div class="container" id="marco-page">
                <h1>Voici l'énigme suivante</h1>
                <p>Bienvenue à cette nouvelle étape, chers Carole et Fred ! Vous avez brillamment déchiffré le premier message. Votre perspicacité est remarquable !</p>
                <p>Pour cette énigme, Marco a préparé quelque chose de spécial. Il vous demande de bien observer l'image suivante. Ce n'est pas un simple visuel, mais un indice clé pour la suite de votre aventure.</p>
                <p>Que voyez-vous ? Quelle émotion cela évoque-t-il ? Quel détail vous semble important ? Le message n'est pas écrit, il est caché dans la forme, la couleur et le contexte.</p>
                <p>Une fois que vous pensez avoir compris l'indice de Marco, vous saurez où chercher la prochaine pièce du puzzle. N'oubliez pas, l'observation est votre meilleure alliée !</p>
                <p>Bonne chance, et amusez-vous bien !</p>
                <img src="enigme_marco.jpg" alt="Enigme de Marco" class="cryptogram-image">
                <p>N'oubliez pas d'indiquer votre réponse sur le carnet fourni. Bisous, Sonia et Grégory.</p>
            </div>
        `;
    }

    // Initial load: render the home page
    renderHomePage();
});
