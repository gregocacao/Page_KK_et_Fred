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
        <!-- Font pour le style manuscrit -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Marck+Script&display=swap" rel="stylesheet">

        <div class="container final-page" id="final-page">
            <style>
                /* Styles pour le corps de la page */
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background-color: white; /* Fond blanc pour la page finale */
                    padding: 2rem;
                    box-sizing: border-box;
                    font-family: 'Helvetica Neue', sans-serif;
                    overflow: auto; /* Permet le défilement si le contenu est trop grand */
                }

                /* Conteneur principal du parchemin */
                .parchment {
                    position: relative;
                    width: 100%;
                    max-width: 700px;
                    padding: 4rem 5rem;
                    color: #3d2b1f; /* Couleur de texte marron foncé */
                    background: #fdf5e6; /* Couleur de base du papier ancien */
                    box-shadow: 
                        inset 0 0 20px rgba(0,0,0,0.2), /* Ombre intérieure pour la profondeur */
                        0 15px 40px rgba(0,0,0,0.7); /* Ombre principale */
                    border-radius: 2px;
                    /* Cadre doré autour du parchemin */
                    border: 5px solid #a68b5a; 
                    outline: 2px solid #735e3a; /* Bordure intérieure plus foncée pour le contraste */
                    outline-offset: -10px; /* Décale l'outline vers l'intérieur */
                }

                /* Effet de bords brûlés/déchirés en haut et en bas - adapté pour s'intégrer avec le cadre */
                .parchment::before,
                .parchment::after {
                    content: '';
                    position: absolute;
                    left: 0; /* Aligné avec le bord du parchemin */
                    width: 100%;
                    height: 45px;
                    background-image:
                        radial-gradient(ellipse at 50% -60%, rgba(0,0,0,0.2) 15%, transparent 16%),
                        radial-gradient(ellipse at 50% 160%, rgba(0,0,0,0.2) 15%, transparent 16%),
                        linear-gradient(to right, #f4e9d3, #fdf5e6, #f4e9d3);
                    background-repeat: repeat-x;
                    background-size: 40px 40px, 40px 40px, 100% 100%;
                    z-index: 2;
                }

                .parchment::before {
                    top: -47px; /* Positionné au-dessus du cadre */
                    border-top-left-radius: 2px;
                    border-top-right-radius: 2px;
                }

                .parchment::after {
                    bottom: -47px; /* Positionné en dessous du cadre */
                    transform: rotate(180deg);
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                }

                /* Contenu textuel */
                .content {
                    font-family: 'Marck Script', cursive; /* Police manuscrite importée */
                    font-size: 1.7rem;
                    line-height: 1.6;
                    text-align: center;
                    text-shadow: 1px 1px 2px rgba(61, 43, 31, 0.2);
                    padding-top: 2rem; 
                }
                
                .main-text {
                    white-space: pre-line;
                    margin-bottom: 2rem;
                    font-weight: bold; 
                }

                /* Style pour la signature */
                .signature {
                    text-align: right;
                    margin-top: 2rem;
                    font-size: 1.8rem;
                    font-weight: bold; 
                }

                /* Sceau de cire */
                .wax-seal {
                    position: absolute;
                    bottom: 25px;
                    right: 40px;
                    width: 75px;
                    height: 75px;
                    background: #b22222; /* Rouge brique */
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #d24242;
                    font-family: 'Marck Script', cursive;
                    font-size: 3.5rem;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
                    box-shadow:
                        2px 2px 5px rgba(0,0,0,0.5), /* Ombre portée */
                        inset 1px 1px 4px rgba(255,255,255,0.3), /* Reflet interne */
                        inset -3px -3px 5px rgba(0,0,0,0.4); /* Ombre interne */
                    transform: rotate(12deg);
                    z-index: 3;
                    border: 2px solid #8f1c1c;
                }
                .wax-seal::before {
                     content: '';
                     position: absolute;
                     top: 5px; right: 5px; bottom: 5px; left: 5px;
                     border: 2px solid rgba(0,0,0,0.1);
                     border-radius: 50%;
                }

                /* Ajustements pour les petits écrans */
                @media (max-width: 600px) {
                    body {
                        padding: 1rem;
                    }
                    .parchment {
                        padding: 4rem 2rem;
                        border: 3px solid #a68b5a; /* Ajustement du cadre pour petits écrans */
                        outline-offset: -5px;
                    }
                    .content {
                        font-size: 1.4rem;
                        padding-top: 1.5rem; 
                    }
                    .wax-seal {
                        width: 60px;
                        height: 60px;
                        font-size: 2.5rem;
                        bottom: 15px;
                        right: 15px;
                    }
                }
            </style>

            <div class="parchment">
                <div class="content">
                    <p class="main-text">Félicitations d'être arrivé jusqu'ici !
  
  Pour la prochaine étape,
  Rendez vous, comme il y a 10 ans, sur la place du jeu que vous connaissez certainement, entre 9h et 17h30.
  
  Suivez l'étroit chemin qui vous mènera jusqu'à la porte de derrière de ce lieux de culte.
  Descendez quelques marches, puis un escalier monumental.
  
  Avant de franchir la grille, face au fleuve royal.
  
  Retournez vous !
  
  L'indice suivant est dans le schiste derrière les fougères.
  
  Bonne chance ...</p>
                    <p class="signature">Marco</p>
                </div>
                <div class="wax-seal">M</div>
            </div>
        </div>
    `;
}
    // Initial load: render the home page
    renderHomePage();
});
