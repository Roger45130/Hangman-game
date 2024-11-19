// Liste des couleurs possibles pour le jeu
const couleurs = ["red", "green", "yellow", "blue", "orange", "purple"];

// Variables globales pour stocker la combinaison secrète, la tentative actuelle et le nombre d'essais
let combinaisonSecrete = []; // Stocke la combinaison générée aléatoirement
let tentative = []; // Stocke la tentative actuelle de l'utilisateur
let nombreEssais = 0; // Compte le nombre d'essais réalisés
const maxEssais = 12; // Nombre maximum d'essais autorisés

console.log(`${couleurs}`); // Affiche les couleurs disponibles pour debug

// Fonction pour générer une combinaison secrète de 4 couleurs aléatoires
function genererCombinaison() {
    combinaisonSecrete = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * couleurs.length); // Génère un index aléatoire
        combinaisonSecrete.push(couleurs[randomIndex]); // Ajoute une couleur aléatoire à la combinaison
    }
    afficherCombinaisonSecrete();
    console.log('Génère une combinaison secrète.');
}

// Fonction pour afficher la combinaison secrète (initialement cachée)
function afficherCombinaisonSecrete() {
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");
    combinaisonDiv.innerHTML = ""; // Réinitialise le contenu HTML
    combinaisonSecrete.forEach((couleur) => {
        const pion = document.createElement("div");
        pion.classList.add("couleur", couleur); // Ajoute les classes CSS nécessaires
        combinaisonDiv.appendChild(pion); // Ajoute le pion à la combinaison secrète
    });
    combinaisonDiv.style.visibility = "hidden"; // Cache la combinaison au début
}

// Fonction pour afficher le nombre de tentatives restantes
function afficherTentativesRestantes() {
    const tentativeRestantDiv = document.querySelector(".tentativeRestant");
    tentativeRestantDiv.textContent = `Tentatives restantes : ${maxEssais - nombreEssais}`;
}

// Fonction pour afficher les couleurs choisies par l'utilisateur dans la zone des tentatives
function afficherTentative() {
    const tableauJeu = document.querySelector(".gridZoneTentative");
    const ligneTentative = document.createElement("div");
    ligneTentative.classList.add("tentative-actuelle");

    // Ajouter chaque couleur sélectionnée à la ligne
    tentative.forEach((couleur) => {
        const pion = document.createElement("div");
        pion.classList.add("couleur", couleur); // Applique le style à chaque pion
        ligneTentative.appendChild(pion);
    });

    tableauJeu.appendChild(ligneTentative); // Ajoute la ligne au tableau de jeu
}

// Fonction pour afficher les résultats de la vérification (bien placé, mal placé, pas placé)
function afficherVerification(bienPlacer, malPlacer, pasPlacer) {
    const verificationZone = document.querySelector(".gridZoneVerification");
    const ligneVerification = document.createElement("div");
    ligneVerification.classList.add("resultat-actuelle");

    // Ajoute les pions correspondant aux couleurs bien placées
    for (let i = 0; i < bienPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("bienPlacer");
        ligneVerification.appendChild(pion);
    }

    // Ajoute les pions correspondant aux couleurs mal placées
    for (let i = 0; i < malPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("malPlacer");
        ligneVerification.appendChild(pion);
    }

    // Ajoute les pions correspondant aux couleurs non présentes dans la combinaison
    for (let i = 0; i < pasPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("pasPlacer");
        ligneVerification.appendChild(pion);
    }

    verificationZone.appendChild(ligneVerification); // Ajoute la ligne à la zone de vérification
}

// Fonction pour vérifier si la tentative correspond à la combinaison secrète
function verifierCombinaison() {
    let bienPlacer = 0; // Nombre de pions bien placés
    let malPlacer = 0; // Nombre de pions mal placés
    let pasPlacer = 0; // Nombre de pions non correspondants

    const copieCombinaisonSecrete = [...combinaisonSecrete]; // Copie de la combinaison pour manipulation
    const copieTentative = [...tentative]; // Copie de la tentative pour manipulation

    // Vérification des pions bien placés
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i] === copieCombinaisonSecrete[i]) {
            bienPlacer++; // La couleur et la position sont identiques
            copieCombinaisonSecrete[i] = null; // Retire l'élément vérifié
            copieTentative[i] = null; // Retire l'élément vérifié
        }
    }

    // Vérification des pions mal placés et pas placés
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i] !== null) { // Si la couleur n'a pas encore été vérifiée
            const index = copieCombinaisonSecrete.indexOf(copieTentative[i]); // Cherche la couleur dans la combinaison secrète
            if (index !== -1) {
                malPlacer++; // La couleur existe mais est mal placée
                copieCombinaisonSecrete[index] = null; // Retire l'élément trouvé
            } else {
                pasPlacer++; // La couleur n'existe pas dans la combinaison
            }
        }
    }

    // Affiche la tentative dans la zone de jeu
    afficherTentative();

    // Affiche les résultats dans la zone de vérification
    afficherVerification(bienPlacer, malPlacer, pasPlacer);

    // Vérifie si la partie est gagnée ou perdue
    if (bienPlacer === 4) {
        finDePartie(true); // Partie gagnée
    } else if (nombreEssais === maxEssais) {
        finDePartie(false); // Partie perdue
    }
}

// Fonction pour gérer la fin de partie
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

    // Proposer une nouvelle partie après une courte pause
    setTimeout(() => {
        if (confirm("Voulez-vous jouer une nouvelle partie ?")) {
            nouvellePartie(); // Réinitialise le jeu
        }
    }, 1000);
}

// Fonction pour réinitialiser le jeu
function nouvellePartie() {
    const tableauJeu = document.querySelector(".gridZoneTentative");
    const verificationZone = document.querySelector(".gridZoneVerification");
    const messageDiv = document.querySelector(".messageVictoireDefaite");

    tableauJeu.innerHTML = ""; // Vide la zone de tentatives
    verificationZone.innerHTML = ""; // Vide la zone de vérification
    messageDiv.textContent = ""; // Réinitialise le message

    nombreEssais = 0; // Réinitialise le nombre d'essais
    tentative = []; // Réinitialise la tentative

    genererCombinaison(); // Génère une nouvelle combinaison
    afficherTentativesRestantes(); // Met à jour le nombre de tentatives restantes
}

// Fonction pour gérer les clics sur la palette de couleurs
function initPaletteCouleur() {
    const paletteCouleur = document.querySelector(".paletteCouleur");
    paletteCouleur.addEventListener("click", (event) => {
        if (event.target.classList.contains("couleur")) {
            const couleurChoisie = event.target.classList[1]; // Récupère la couleur cliquée

            if (tentative.length < 4) {
                tentative.push(couleurChoisie); // Ajoute la couleur à la tentative
            }

            if (tentative.length === 4) {
                nombreEssais++; // Incrémente le compteur d'essais
                afficherTentativesRestantes();
                verifierCombinaison(); // Vérifie la tentative
                tentative = []; // Réinitialise la tentative
            }
        }
    });
}

// Fonction pour initialiser le jeu
function initJeu() {
    genererCombinaison(); // Génère la combinaison secrète
    afficherTentativesRestantes(); // Affiche le nombre d'essais restants
    initPaletteCouleur(); // Active les clics sur la palette
}

// Démarrage du jeu
initJeu();