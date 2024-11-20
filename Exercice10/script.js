// Liste des couleurs possibles pour le jeu
const couleurs = ["red", "green", "yellow", "blue", "orange", "purple", "brown"];

// Variables globales pour stocker la combinaison secrète, la tentative actuelle et le nombre d'essais
let combinaisonSecrete = []; // Stocke la combinaison générée aléatoirement
let tentative = []; // Stocke les choix de couleurs de l'utilisateur
let nombreEssais = 0; // Compte le nombre d'essais réalisés
const maxEssais = 12; // Nombre maximum d'essais autorisés

console.log("Couleurs disponibles :", couleurs); // Affiche les couleurs disponibles

// Fonction pour générer une combinaison secrète de 4 couleurs aléatoires
function genererCombinaison() {
    combinaisonSecrete = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * couleurs.length); // Génère un index aléatoire
        combinaisonSecrete.push(couleurs[randomIndex]); // Ajoute une couleur aléatoire à la combinaison
    }
    afficherCombinaisonSecrete();
    console.log("Combinaison secrète générée :", combinaisonSecrete); // Affiche la combinaison secrète
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
    console.log("Affichage de la combinaison secrète masquée."); // Affiche que la combinaison secrète est masquer
}

// Fonction pour afficher le nombre de tentatives restantes
function afficherTentativesRestantes() {
    const tentativeRestantDiv = document.querySelector(".tentativeRestant");
    tentativeRestantDiv.textContent = `Tentatives restantes : ${maxEssais - nombreEssais}`;
    console.log("Tentatives restantes :", maxEssais - nombreEssais); // Affiche le nombre de tentative restante
}

// Fonction pour afficher les choix de l'utilisateur dans la zone des tentatives
function afficherTentative() {
    const tableauJeu = document.querySelector(".gridZoneTentative");
    const ligneTentative = document.createElement("div");
    ligneTentative.classList.add("tentative-actuelle");

    // Ajouter chaque couleur choisie à la ligne
    tentative.forEach((couleur) => {
        const pion = document.createElement("div");
        pion.classList.add("couleur", couleur); // Applique le style à chaque pion
        ligneTentative.appendChild(pion);
    });

    tableauJeu.appendChild(ligneTentative); // Ajoute la ligne au tableau de jeu
    console.log("Affichage de la tentative utilisateur :", tentative); // Affiche le nombre de fois que l'utilisateur a sélectionner une couleur
}

// Fonction pour effectuer le contrôle détaillé des pions
function verifierChoixUtilisateur() {
    const verificationZone = document.querySelector(".gridZoneVerification");
    const ligneVerification = document.createElement("div");
    ligneVerification.classList.add("resultat-actuelle");

    const copieCombinaisonSecrete = [...combinaisonSecrete]; // Copie de la combinaison pour manipulation
    let pionsPlacees = []; // Liste des pions placés (bien/mal/pas)

    console.log("Début de la vérification de la tentative :", tentative);

    // Comparaison des choix de l'utilisateur à la combinaison secrète
    tentative.forEach((couleurUtilisateur, indexUtilisateur) => {
        if (copieCombinaisonSecrete[indexUtilisateur] === couleurUtilisateur) {
            // La couleur est à la bonne position
            pionsPlacees.push("bienPlacer");
            copieCombinaisonSecrete[indexUtilisateur] = null; // Marque comme utilisée
            console.log(`Position ${indexUtilisateur + 1}: Bien placée (${couleurUtilisateur}).`);
        } else {
            const autreIndex = copieCombinaisonSecrete.indexOf(couleurUtilisateur);
            if (autreIndex !== -1) {
                // La couleur est présente mais mal placée
                pionsPlacees.push("malPlacer");
                copieCombinaisonSecrete[autreIndex] = null; // Marque comme utilisée
                console.log(`Position ${indexUtilisateur + 1}: Mal placée (${couleurUtilisateur}).`);
            } else {
                // La couleur n'existe pas dans la combinaison
                pionsPlacees.push("pasPlacer");
                console.log(`Position ${indexUtilisateur + 1}: Pas placée (${couleurUtilisateur}).`);
            }
        }
    });

    // Ajout des pions dans la zone de vérification
    pionsPlacees.forEach((typePion) => {
        const pion = document.createElement("div");
        pion.classList.add(typePion); // Ajoute la classe correspondante
        ligneVerification.appendChild(pion); // Ajoute le pion dans la ligne
    });

    verificationZone.appendChild(ligneVerification); // Ajoute la ligne à la zone de vérification
    console.log("Affichage des résultats de la vérification :", pionsPlacees);

    // Vérification du statut de la partie (gagnée/perdue)
    if (pionsPlacees.filter((pion) => pion === "bienPlacer").length === 4) {
        finDePartie(true); // Victoire
    } else if (nombreEssais === maxEssais) {
        finDePartie(false); // Défaite
    }
}

// Fonction pour gérer la fin de partie
function finDePartie(gagne) {
    const messageDiv = document.querySelector(".messageVictoireDefaite");
    const combinaisonDiv = document.querySelector(".CombinaisonSecrete");

    // Rendre la combinaison secrète visible
    combinaisonDiv.style.visibility = "visible";
    console.log("Affichage de la combinaison secrète :", combinaisonSecrete);

    if (gagne) {
        messageDiv.textContent = `Félicitations ! Vous avez trouvé la combinaison en ${nombreEssais} tentative(s).`;
        console.log("Victoire de l'utilisateur.");
    } else {
        messageDiv.textContent = `Désolé, vous avez perdu. La combinaison secrète était : ${combinaisonSecrete.join(", ")}.`;
        console.log("Défaite de l'utilisateur.");
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
    console.log("Réinitialisation complète du jeu.");
}

// Fonction pour gérer les clics sur la palette de couleurs
function initPaletteCouleur() {
    const paletteCouleur = document.querySelector(".paletteCouleur");
    paletteCouleur.addEventListener("click", (event) => {
        if (event.target.classList.contains("couleur")) {
            const couleurChoisie = event.target.classList[1]; // Récupère la couleur cliquée
            console.log("Couleur choisie :", couleurChoisie);

            if (tentative.length < 4) {
                tentative.push(couleurChoisie); // Ajoute la couleur à la tentative
                console.log("Ajout de la couleur à la tentative :", tentative);
            }

            if (tentative.length === 4) {
                nombreEssais++; // Incrémente le compteur d'essais
                afficherTentativesRestantes();
                afficherTentative(); // Affiche la tentative dans le tableau
                verifierChoixUtilisateur(); // Vérifie les choix et place les pions
                tentative = []; // Réinitialise la tentative pour la prochaine
                console.log("Fin de la tentative, réinitialisation pour la suivante.");
            }
        }
    });
}

// Fonction pour initialiser le jeu
function initJeu() {
    genererCombinaison(); // Génère la combinaison secrète
    afficherTentativesRestantes(); // Affiche le nombre d'essais restants
    initPaletteCouleur(); // Active les clics sur la palette
    console.log("Jeu initialisé."); // Affiche lorsque le jeu a était initialisé
}

// Démarrage du jeu
initJeu();