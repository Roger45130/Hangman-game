// Création d'un tableau pour stocker les objets, leurs images et descriptions
const objets = [
    { nom: "chaise", image: "Assets/Images/image-juste-prix/chaise.png", description: "Magnifique chaise de bureau dont l'assise est très confortable et chose exeptionnel elle est équiper d'accoudoire ergodinamique." },
    { nom: "costume-haloween", image: "Assets/Images/image-juste-prix/costume-haloween.png", description: "Costume de super-héroïne pour femme, mesdame vous ressemblerez à une femme vampire." },
    { nom: "grill", image: "Assets/Images/image-juste-prix/grill.png", description: "Barbecue fermé par un couvercle en inox laminé noir avec petite tablette et cheminée pour l'extraction des fumées avec un termosta pour faire le suivie de la température de cuisson." },
    { nom: "guitare", image: "Assets/Images/image-juste-prix/guitare.png", description: "Guitare acoustique pour adulte idéale pour apprendre a jouer vos morceaux préférés." },
    { nom: "sac-a-main", image: "Assets/Images/image-juste-prix/sac-a-main.png", description: "Sac-à-main avec une tapisserie style Louis Vuitton." }
];

let prixAleatoire = Math.floor(Math.random() * 100) + 1; 
let tentatives = 10;

const objetAleatoire = objets[Math.floor(Math.random() * objets.length)];

document.querySelector(".objetArticle").innerHTML = `<img src="${objetAleatoire.image}" alt="${objetAleatoire.nom}" class="imageObjet">`;
document.querySelector(".descriptionArticle").innerText = objetAleatoire.description;

function valider(button) {
    const inputPrix = document.getElementById("input__prixProposer").value;
    const reponseDiv = document.querySelector(".reponsePriceIsRight");

    if (tentatives > 0) {
        if (inputPrix == prixAleatoire) {
            // Victoire
            reponseDiv.innerHTML = `<p>Félicitations ! Vous avez trouvé le prix exact de ${prixAleatoire} euros <i class="fa-solid fa-check"></i> !</p>`;
            button.disabled = true; // Désactiver le bouton après victoire
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
        }
    }
};