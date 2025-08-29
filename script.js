document.addEventListener('DOMContentLoaded', () => {
    const rebusInput = document.getElementById('rebus-input');
    const submitButton = document.getElementById('submit-button');
    const feedback = document.getElementById('feedback');
    const rebusContainer = document.getElementById('rebus-container');
    const secondPage = document.getElementById('second-page');
    const finalPage = document.getElementById('final-page'); // Nouvelle page finale

    const cipherInputGrid = document.getElementById('cipher-input-grid');
    const decryptButton = document.getElementById('decrypt-button');
    const cipherFeedback = document.getElementById('cipher-feedback');

    const correctAnswerRebus = "chatpot"; // La réponse correcte au rébus
    const correctCipherAnswer = "LA CONNAISSANCE EST POUVOIR"; // Message crypté de 22 lettres (sans espaces pour la comparaison)
    const numCipherLetters = 22;

    // --- Logique du Rébus ---
    submitButton.addEventListener('click', () => {
        const userAnswer = rebusInput.value.trim().toLowerCase();

        if (userAnswer === correctAnswerRebus) {
            feedback.textContent = "Correct ! Félicitations !";
            feedback.className = "feedback success";
            setTimeout(() => {
                rebusContainer.classList.add('hidden');
                secondPage.classList.remove('hidden');
                generateCipherInputs(); // Génère les inputs une fois la page visible
            }, 1500); // Délai avant d'afficher la seconde page
        } else {
            feedback.textContent = "Incorrect. Réessayez !";
            feedback.className = "feedback error";
        }
    });

    rebusInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });

    // --- Logique du Message Crypté ---
    function generateCipherInputs() {
        cipherInputGrid.innerHTML = ''; // Nettoie d'abord au cas où
        for (let i = 0; i < numCipherLetters; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1; // Une seule lettre par case
            input.classList.add('cipher-letter-input');
            input.dataset.index = i; // Pour identifier la case
            cipherInputGrid.appendChild(input);

            // Gestion du focus automatique sur la prochaine case
            input.addEventListener('input', (event) => {
                if (event.target.value.length === 1) {
                    const nextInput = document.querySelector(`.cipher-letter-input[data-index="${i + 1}"]`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            // Gestion du retour arrière (backspace) pour remonter
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && event.target.value.length === 0) {
                    const prevInput = document.querySelector(`.cipher-letter-input[data-index="${i - 1}"]`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        }
        // Met le focus sur le premier champ
        document.querySelector('.cipher-letter-input[data-index="0"]').focus();
    }

    decryptButton.addEventListener('click', () => {
        let userAnswer = '';
        const inputs = document.querySelectorAll('.cipher-letter-input');
        inputs.forEach(input => {
            userAnswer += input.value.toUpperCase(); // Convertit en majuscules pour la comparaison
        });

        // Supprime les espaces pour la comparaison si le message crypté en a
        const cleanedCorrectAnswer = correctCipherAnswer.replace(/\s/g, '');
        const cleanedUserAnswer = userAnswer.replace(/\s/g, '');


        if (cleanedUserAnswer === cleanedCorrectAnswer) {
            cipherFeedback.textContent = "Magnifique ! Vous avez déchiffré le message !";
            cipherFeedback.className = "feedback success";
            setTimeout(() => {
                secondPage.classList.add('hidden');
                finalPage.classList.remove('hidden');
            }, 1500);
        } else {
            cipherFeedback.textContent = "Ce n'est pas tout à fait ça. Continuez d'essayer !";
            cipherFeedback.className = "feedback error";
        }
    });
});
