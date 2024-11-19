// Liste des couleurs possibles pour le jeu
const couleurs = ["red", "green", "yellow", "blue", "orange", "purple"];

// Variables globales pour stocker la combinaison secrète, la tentative actuelle et le nombre d'essais
let combinaisonSecrete = [];
let tentative = [];
let nombreEssais = 0;
const maxEssais = 12; // Nombre maximum d'essais autorisés

console.log(`${couleurs}`);

// Fonction pour générer une combinaison secrète de 4 couleurs aléatoires
function genererCombinaison() {
    combinaisonSecrete = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * couleurs.length); // Génère un index aléatoire
        combinaisonSecrete.push(couleurs[randomIndex]); // Ajoute une couleur aléatoire à la combinaison secrète
    }
    afficherCombinaisonSecrete(); // Appelle la fonction pour afficher la combinaison (invisible par défaut)
    console.log('Génère une combinaison secrète.');
}

// Fonction pour afficher la combinaison secrète (initialement cachée)
function afficherCombinaisonSecrete() {
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");
    combinaisonDiv.innerHTML = ""; // Réinitialise le contenu HTML
    combinaisonSecrete.forEach((couleur) => {
        const pion = document.createElement("div"); // Crée un div pour chaque couleur
        pion.classList.add("couleur", couleur); // Ajoute les classes pour le style
        combinaisonDiv.appendChild(pion); // Ajoute le div à la combinaison secrète
        console.log(`Ajoute un pion de couleur : ${couleur}.`);
    });
    combinaisonDiv.style.visibility = "hidden"; // Cache la combinaison au début
}

// Fonction pour afficher les tentatives restantes
function afficherTentativesRestantes() {
    const tentativeRestantDiv = document.querySelector(".tentativeRestant");
    tentativeRestantDiv.textContent = `Tentatives restantes : ${maxEssais - nombreEssais}`; // Met à jour le texte
    console.log('Affiche le nombre de tentatives restantes.');
}

// Fonction pour afficher les pions de la tentative utilisateur
function afficherTentative() {
    const tableauJeu = document.querySelector(".gridZoneTentative");
    const ligneTentative = document.createElement("div"); // Crée une nouvelle ligne pour la tentative
    ligneTentative.classList.add("tentative-actuelle");

    // Ajoute chaque couleur de la tentative actuelle
    tentative.forEach((couleur) => {
        const pion = document.createElement("div"); // Crée un div pour chaque couleur choisie
        pion.classList.add("couleur", couleur); // Ajoute les classes pour le style
        ligneTentative.appendChild(pion); // Ajoute le div à la ligne
        console.log(`Ajoute un pion de couleur choisie : ${couleur}.`);
    });

    tableauJeu.appendChild(ligneTentative); // Ajoute la ligne au tableau de jeu
}

// Fonction pour afficher les résultats de la vérification dans la zone de vérification
function afficherVerification(bienPlacer, malPlacer, pasPlacer) {
    const verificationZone = document.querySelector(".gridZoneVerification");
    const ligneVerification = document.createElement("div"); // Crée une nouvelle ligne pour les résultats
    ligneVerification.classList.add("resultat-actuelle");

    // Ajoute les pions "Bien Placer"
    for (let i = 0; i < bienPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("bienPlacer");
        ligneVerification.appendChild(pion);
        console.log("Ajoute un pion 'Bien Placer'.");
    }

    // Ajoute les pions "Mal Placer"
    for (let i = 0; i < malPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("malPlacer");
        ligneVerification.appendChild(pion);
        console.log("Ajoute un pion 'Mal Placer'.");
    }

    // Ajoute les pions "Pas Placer"
    for (let i = 0; i < pasPlacer; i++) {
        const pion = document.createElement("div");
        pion.classList.add("pasPlacer");
        ligneVerification.appendChild(pion);
        console.log("Ajoute un pion 'Pas Placer'.");
    }

    verificationZone.appendChild(ligneVerification); // Ajoute la ligne au tableau de vérification
}

// Fonction pour vérifier la tentative utilisateur
function verifierCombinaison() {
    let bienPlacer = 0; // Compteur pour les couleurs bien placées
    let malPlacer = 0; // Compteur pour les couleurs mal placées
    let pasPlacer = 0; // Compteur pour les couleurs non placées

    const copieCombinaisonSecrete = [...combinaisonSecrete]; // Copie de la combinaison secrète
    const copieTentative = [...tentative]; // Copie de la tentative actuelle

    // Vérification des pions "Bien Placer"
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i] === copieCombinaisonSecrete[i]) {
            bienPlacer++;
            copieCombinaisonSecrete[i] = null; // Marque la position comme traitée
            copieTentative[i] = null; // Marque la position comme traitée
            console.log(`Couleur bien placée à l'index ${i}.`);
        }
    }

    // Vérification des pions "Mal Placer"
    for (let i = 0; i < 4; i++) {
        if (copieTentative[i]) { // Vérifie les positions restantes
            const index = copieCombinaisonSecrete.indexOf(copieTentative[i]);
            if (index !== -1) {
                malPlacer++;
                copieCombinaisonSecrete[index] = null; // Marque la position comme traitée
                console.log(`Couleur mal placée trouvée à l'index ${index}.`);
            }
        }
    }

    // Calcul des pions "Pas Placer"
    pasPlacer = 4 - (bienPlacer + malPlacer); // Les couleurs restantes
    console.log(`Couleurs non présentes : ${pasPlacer}.`);

    // Affiche la tentative de l'utilisateur
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

// Fonction pour gérer la fin de la partie
function finDePartie(gagne) {
    const messageDiv = document.querySelector(".messageVictoireDefaite");
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");

    combinaisonDiv.style.visibility = "visible"; // Affiche la combinaison secrète
    console.log("Affiche la combinaison secrète.");

    if (gagne) {
        messageDiv.textContent = `Félicitations ! Vous avez trouvé la combinaison en ${nombreEssais} tentative(s).`;
    } else {
        messageDiv.textContent = `Dommage ! Vous avez perdu. La combinaison secrète était : ${combinaisonSecrete.join(", ")}`;
    }

    // Propose une nouvelle partie
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

    tableauJeu.innerHTML = ""; // Réinitialise le tableau des tentatives
    verificationZone.innerHTML = ""; // Réinitialise la zone de vérification
    messageDiv.textContent = ""; // Réinitialise le message de victoire/défaite

    nombreEssais = 0;
    tentative = [];

    genererCombinaison(); // Génère une nouvelle combinaison
    afficherTentativesRestantes(); // Affiche les tentatives restantes
}

// Fonction pour gérer les clics sur la palette de couleurs
function initPaletteCouleur() {
    const paletteCouleur = document.querySelector(".paletteCouleur");
    paletteCouleur.addEventListener("click", (event) => {
        if (event.target.classList.contains("couleur")) {
            const couleurChoisie = event.target.classList[1]; // Récupère la couleur choisie

            if (tentative.length < 4) {
                tentative.push(couleurChoisie); // Ajoute la couleur à la tentative
            }

            if (tentative.length === 4) {
                nombreEssais++;
                afficherTentativesRestantes(); // Met à jour les tentatives restantes
                verifierCombinaison(); // Vérifie la combinaison
                tentative = []; // Réinitialise la tentative
            }
        }
    });
}

// Fonction pour initialiser le jeu
function initJeu() {
    genererCombinaison(); // Génère la combinaison secrète
    afficherTentativesRestantes(); // Affiche les tentatives restantes
    initPaletteCouleur(); // Initialise la gestion des clics sur les couleurs
}

// Démarrage du jeu
initJeu();