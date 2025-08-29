document.addEventListener('DOMContentLoaded', () => {
    const cipherContainer = document.getElementById('cipher-container'); // Nouveau conteneur principal
    const finalPage = document.getElementById('final-page');

    const cipherInputGrid = document.getElementById('cipher-input-grid');
    const decryptButton = document.getElementById('decrypt-button');
    const cipherFeedback = document.getElementById('cipher-feedback');

    // Message crypté de 22 lettres (sans espaces pour la comparaison)
    // "LA CONNAISSANCE EST POUVOIR" (22 caractères sans les espaces)
    const correctCipherAnswer = "LACONNAISSANCEESTPOUVOIR"; // Le message décrypté de 22 lettres
    const numCipherLetters = 22;

    // --- Logique du Message Crypté ---

    // Fonction pour générer les 22 champs de saisie
    function generateCipherInputs() {
        cipherInputGrid.innerHTML = ''; // S'assure que la grille est vide avant de générer
        for (let i = 0; i < numCipherLetters; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1; // Une seule lettre par case
            input.classList.add('cipher-letter-input');
            input.dataset.index = i; // Pour identifier la case
            cipherInputGrid.appendChild(input);

            // Gestion du focus automatique sur la prochaine case après saisie
            input.addEventListener('input', (event) => {
                if (event.target.value.length === 1) {
                    const nextInput = document.querySelector(`.cipher-letter-input[data-index="${i + 1}"]`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            // Gestion du retour arrière (backspace) pour remonter à la case précédente
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && event.target.value.length === 0) {
                    const prevInput = document.querySelector(`.cipher-letter-input[data-index="${i - 1}"]`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        }
        // Met le focus sur le premier champ au chargement de la page
        document.querySelector('.cipher-letter-input[data-index="0"]').focus();
    }

    // Génère les inputs dès que le DOM est chargé (puisque c'est la page principale maintenant)
    generateCipherInputs();

    // Logique de validation du message décrypté
    decryptButton.addEventListener('click', () => {
        let userAnswer = '';
        const inputs = document.querySelectorAll('.cipher-letter-input');
        inputs.forEach(input => {
            userAnswer += input.value.toUpperCase(); // Récupère et convertit en majuscules
        });

        // Compare la réponse de l'utilisateur (sans espaces) avec la réponse correcte
        if (userAnswer === correctCipherAnswer) {
            cipherFeedback.textContent = "Magnifique ! Vous avez déchiffré le message !";
            cipherFeedback.className = "feedback success";
            setTimeout(() => {
                cipherContainer.classList.add('hidden'); // Cache la page de décryptage
                finalPage.classList.remove('hidden');    // Affiche la page finale
            }, 1500);
        } else {
            cipherFeedback.textContent = "Ce n'est pas tout à fait ça. Continuez d'essayer !";
            cipherFeedback.className = "feedback error";
        }
    });
});
