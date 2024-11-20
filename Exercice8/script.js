// Création d'un tableau pour stocker les objets, leurs images et descriptions
const objets = [
    { nom: "chaise", image: "Assets/Images/image-juste-prix/chaise.png", description: "Magnifique chaise de bureau dont l'assise est très confortable et chose exceptionnelle, elle est équipée d'accoudoirs ergonomiques." },
    { nom: "costume-haloween", image: "Assets/Images/image-juste-prix/costume-haloween.png", description: "Costume de super-héroïne pour femme. Mesdames, vous ressemblerez à une femme vampire." },
    { nom: "grill", image: "Assets/Images/image-juste-prix/grill.png", description: "Barbecue fermé par un couvercle en inox laminé noir avec petite tablette et cheminée pour l'extraction des fumées avec un thermostat pour suivre la température de cuisson." },
    { nom: "guitare", image: "Assets/Images/image-juste-prix/guitare.png", description: "Guitare acoustique pour adulte, idéale pour apprendre à jouer vos morceaux préférés." },
    { nom: "sac-a-main", image: "Assets/Images/image-juste-prix/sac-a-main.png", description: "Sac à main avec une tapisserie style Louis Vuitton." }
];

let prixAleatoire = Math.floor(Math.random() * 100) + 1; 
let tentatives = 10;

// Générer un objet aléatoire
let objetAleatoire = objets[Math.floor(Math.random() * objets.length)];
document.querySelector(".objetArticle").innerHTML = `<img src="${objetAleatoire.image}" alt="${objetAleatoire.nom}" class="imageObjet">`;
document.querySelector(".descriptionArticle").innerText = objetAleatoire.description;

// Fonction de validation du prix proposé
function valider(button) {
    const inputPrix = document.getElementById("input__prixProposer").value;
    const reponseDiv = document.querySelector(".reponsePriceIsRight");

    if (tentatives > 0) {
        if (inputPrix == prixAleatoire) {
            // Victoire
            reponseDiv.innerHTML = `<p>Félicitations ! Vous avez trouvé le prix exact de ${prixAleatoire} euros <i class="fa-solid fa-check"></i> !</p>`;
            button.disabled = true; // Désactiver le bouton après victoire
            document.querySelector(".btnRejouer").disabled = false; // Activer le bouton "REJOUER"
        } else if (inputPrix > prixAleatoire) {
            tentatives--;
            reponseDiv.innerHTML = `<p>Le prix proposé est trop élevé ! Tentatives restantes : ${tentatives}</p>`;
        } else {
            tentatives--;
            reponseDiv.innerHTML = `<p>Le prix proposé est trop bas ! Tentatives restantes : ${tentatives}</p>`;
        }

        // Vérification de l'échec
        if (tentatives === 0 && inputPrix != prixAleatoire) {
            reponseDiv.innerHTML = `<p>Vous avez épuisé toutes vos tentatives. Le prix exact était ${prixAleatoire} euros. Bonne chance pour la prochaine fois ! <i class="fa-regular fa-face-sad-tear"></i></p>`;
            button.disabled = true; // Désactiver le bouton après échec
            document.querySelector(".btnRejouer").disabled = false; // Activer le bouton "REJOUER"
        }
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    tentatives = 10;
    prixAleatoire = Math.floor(Math.random() * 100) + 1;
    objetAleatoire = objets[Math.floor(Math.random() * objets.length)];
    
    // Réinitialiser l'affichage
    document.querySelector(".objetArticle").innerHTML = `<img src="${objetAleatoire.image}" alt="${objetAleatoire.nom}" class="imageObjet">`;
    document.querySelector(".descriptionArticle").innerText = objetAleatoire.description;
    document.querySelector(".reponsePriceIsRight").innerHTML = "";
    document.getElementById("input__prixProposer").value = "";
    
    // Réactiver le bouton "VALIDER LE PRIX"
    document.querySelector(".btnValiderPrix").disabled = false;
    // Désactiver le bouton "REJOUER"
    document.querySelector(".btnRejouer").disabled = true;
}

// Initialisation
window.onload = () => {
    // Désactiver le bouton "REJOUER" au démarrage
    document.querySelector(".btnRejouer").disabled = true;
    
    // Ajouter l'événement de clic pour le bouton "REJOUER"
    document.querySelector(".btnRejouer").addEventListener("click", resetGame);
};