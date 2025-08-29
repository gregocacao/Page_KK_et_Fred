document.addEventListener('DOMContentLoaded', () => {
    const cipherContainer = document.getElementById('cipher-container');
    const marcoPage = document.getElementById('marco-page');

    const cipherInputGrid = document.getElementById('cipher-input-grid');
    const decryptButton = document.getElementById('decrypt-button');
    const cipherFeedback = document.getElementById('cipher-feedback');

    // Message décrypté de 24 lettres SANS ESPACES
    // "LA CONNAISSANCE EST POUVOIR" devient "LACONNAISSANCEESTPOUVOIR"
    const correctCipherAnswer = "LACONNAISSANCEESTPOUVOIR"; // 24 caractères
    const numCipherLetters = 24; // <-- CORRIGÉ À 24

    // Fonction pour générer les 24 champs de saisie
    function generateCipherInputs() {
        cipherInputGrid.innerHTML = '';
        for (let i = 0; i < numCipherLetters; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('cipher-letter-input');
            input.dataset.index = i;
            cipherInputGrid.appendChild(input);

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
        document.querySelector('.cipher-letter-input[data-index="0"]').focus();
    }

    generateCipherInputs();

    decryptButton.addEventListener('click', () => {
        let userAnswer = '';
        const inputs = document.querySelectorAll('.cipher-letter-input');
        inputs.forEach(input => {
            userAnswer += input.value.toUpperCase();
        });

        if (userAnswer === correctCipherAnswer) {
            cipherFeedback.textContent = "Magnifique ! Vous avez déchiffré le message !";
            cipherFeedback.className = "feedback success";
            setTimeout(() => {
                cipherContainer.classList.add('hidden');
                marcoPage.classList.remove('hidden');
            }, 1500);
        } else {
            cipherFeedback.textContent = "Ce n'est pas tout à fait ça. Continuez d'essayer !";
            cipherFeedback.className = "feedback error";
        }
    });
});
