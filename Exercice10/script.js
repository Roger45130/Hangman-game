const couleurs = ["red", "green", "yellow", "blue", "orange", "purple"];
let combinaisonSecrete = [];
let tentative = [];
let nombreEssais = 0;
const maxEssais = 12;

// Générer une combinaison secrète de 4 couleurs aléatoirement
function genererCombinaison() {
    combinaisonSecrete = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * couleurs.length);
        combinaisonSecrete.push(couleurs[randomIndex]);
    }
    afficherCombinaisonSecrete();
}

// Afficher la combinaison secrète (initialement invisible)
function afficherCombinaisonSecrete() {
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");
    combinaisonDiv.innerHTML = "";
    combinaisonSecrete.forEach((couleur) => {
        const pion = document.createElement("div");
        pion.classList.add("couleur", couleur);
        combinaisonDiv.appendChild(pion);
    });
    combinaisonDiv.style.visibility = "hidden"; // Masquer la combinaison au début
}

// Afficher les tentatives restantes
function afficherTentativesRestantes() {
    const tentativeRestantDiv = document.querySelector(".tentativeRestant");
    tentativeRestantDiv.textContent = `Tentatives restantes : ${maxEssais - nombreEssais}`;
}

// Afficher les pions de la tentative utilisateur
function afficherTentative() {
    const tableauJeu = document.querySelector(".gridZoneTentative");

    // Créer une ligne pour afficher la tentative
    const ligneTentative = document.createElement("div");
    ligneTentative.classList.add("tentative-actuelle");

    // Ajouter les pions choisis par l'utilisateur
    tentative.forEach((couleur) => {
        const pion = document.createElement("div");
        pion.classList.add("couleur", couleur);
        ligneTentative.appendChild(pion);
    });

    tableauJeu.appendChild(ligneTentative);
}

// Afficher les pions de vérification dans la zone dédiée
function afficherVerification(bienPlacer, malPlacer) {
    const verificationZone = document.querySelector(".gridZoneVerification");

    // Créer une ligne pour afficher les pions de vérification
    const ligneVerification = document.createElement("div");
    ligneVerification.classList.add("resultat-actuelle");

    // Ajouter les pions bien placés
    for (let i = 0; i < bienPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("bienPlacer");
        ligneVerification.appendChild(pion);
    }

    // Ajouter les pions mal placés
    for (let i = 0; i < malPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("malPlacer");
        ligneVerification.appendChild(pion);
    }

    verificationZone.appendChild(ligneVerification);
}

// Vérifier la tentative utilisateur
function verifierCombinaison() {
    let bienPlacer = 0;
    let malPlacer = 0;
    const copieCombinaisonSecrete = [...combinaisonSecrete];
    const copieTentative = [...tentative];

    // Vérification des pions bien placés
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i] === copieCombinaisonSecrete[i]) {
            bienPlacer++;
            copieCombinaisonSecrete[i] = null;
            copieTentative[i] = null;
        }
    }

    // Vérification des pions mal placés
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i]) {
            const index = copieCombinaisonSecrete.indexOf(copieTentative[i]);
            if (index !== -1) {
                malPlacer++;
                copieCombinaisonSecrete[index] = null;
            }
        }
    }

    // Afficher la tentative
    afficherTentative();

    // Afficher les résultats dans la zone de vérification
    afficherVerification(bienPlacer, malPlacer);

    // Vérifier si la partie est gagnée ou perdue
    if (bienPlacer === 4) {
        finDePartie(true);
    } else if (nombreEssais === maxEssais) {
        finDePartie(false);
    }
}

// Gestion de la fin de partie
function finDePartie(gagne) {
    const messageDiv = document.querySelector(".messageVictoireDefaite");
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");

    // Rendre la combinaison secrète visible
    combinaisonDiv.style.visibility = "visible";

    if (gagne) {
        messageDiv.textContent = `Félicitations ! Vous avez trouvé la combinaison en ${nombreEssais} tentative(s).`;
    } else {
        messageDiv.textContent = `Dommage ! Vous avez perdu. La combinaison secrète était : ${combinaisonSecrete.join(", ")}`;
    }

    // Proposer une nouvelle partie
    setTimeout(() => {
        if (confirm("Voulez-vous jouer une nouvelle partie ?")) {
            nouvellePartie();
        }
    }, 1000);
}

// Réinitialiser le jeu
function nouvellePartie() {
    const tableauJeu = document.querySelector(".gridZoneTentative");
    const verificationZone = document.querySelector(".gridZoneVerification");
    const messageDiv = document.querySelector(".messageVictoireDefaite");
    tableauJeu.innerHTML = "";
    verificationZone.innerHTML = "";
    messageDiv.textContent = "";
    nombreEssais = 0;
    tentative = [];
    genererCombinaison();
    afficherTentativesRestantes();
}

// Gestion des clics sur la palette de couleurs
function initPaletteCouleur() {
    const paletteCouleur = document.querySelector(".paletteCouleur");
    paletteCouleur.addEventListener("click", (event) => {
        if (event.target.classList.contains("couleur")) {
            const couleurChoisie = event.target.classList[1];
            // Comparer la couleur choisie avec chaque élément de la combinaison secrète
            combinaisonSecrete.forEach((couleur, index) => {
                if (couleurChoisie === couleur) {
                    console.log(`Couleur correcte trouvée à l'index ${index}`);
                }
            });

            if (tentative.length < 4) {
                tentative.push(couleurChoisie);
            }
            if (tentative.length === 4) {
                nombreEssais++;
                afficherTentativesRestantes();
                verifierCombinaison();
                tentative = [];
            }
        }
    });
}

// Initialiser le jeu
function initJeu() {
    genererCombinaison();
    afficherTentativesRestantes();
    initPaletteCouleur();
}

// Démarrage du jeu
initJeu();