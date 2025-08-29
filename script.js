document.addEventListener('DOMContentLoaded', () => {
    const rebusInput = document.getElementById('rebus-input');
    const submitButton = document.getElementById('submit-button');
    const feedback = document.getElementById('feedback');
    const rebusContainer = document.getElementById('rebus-container');
    const secondPage = document.getElementById('second-page');

    const correctAnswer = "chatpot"; // La réponse correcte au rébus

    submitButton.addEventListener('click', () => {
        const userAnswer = rebusInput.value.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            feedback.textContent = "Correct ! Félicitations !";
            feedback.className = "feedback success";
            setTimeout(() => {
                rebusContainer.classList.add('hidden');
                secondPage.classList.remove('hidden');
            }, 1500); // Délai avant d'afficher la seconde page
        } else {
            feedback.textContent = "Incorrect. Réessayez !";
            feedback.className = "feedback error";
        }
    });

    // Permettre l'envoi avec la touche Entrée
    rebusInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });
});
