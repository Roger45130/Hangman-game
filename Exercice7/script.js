function valider() {
    // Récupère l'élément input et la div de réponse
    const motDePasse = document.getElementById("input__motDePasse").value;
    const reponse = document.querySelector(".reponseVerifierMdP");

    // Initialise le compteur de sécurité
    let score = 0;

    // Critères de sécurité pour le mot de passe
    if (/[a-z]/.test(motDePasse)) score += 1;  // Contient des lettres minuscules
    if (/[A-Z]/.test(motDePasse)) score += 1;  // Contient des lettres majuscules
    if (/[0-9]/.test(motDePasse)) score += 1;  // Contient des chiffres
    if (/[^a-zA-Z0-9]/.test(motDePasse)) score += 1;  // Contient des caractères spéciaux

    // Réduit le score si la longueur est inférieure à 8 caractères
    if (motDePasse.length < 8) score -= 1;

    // Détermine le niveau de sécurité du mot de passe en fonction du score
    if (score <= 1) {
        // Niveau dangereux
        reponse.style.backgroundColor = 'red';
        reponse.style.color = 'white';
        reponse.style.fontWeight = 'bold';
        reponse.textContent = "Votre mot de passe n'est pas sécurisé. Veuillez le modifier. Merci.";
    } else if (score === 2) {
        // Niveau pas suffisamment sécurisé
        reponse.style.backgroundColor = 'orange';
        reponse.style.color = 'white';
        reponse.style.fontWeight = 'bold';
        reponse.textContent = "Votre mot de passe n'est pas suffisamment sécurisé. Veuillez le modifier pour le rendre plus sécurisé. Merci.";
    } else if (score === 3) {
        // Niveau moyen
        reponse.style.backgroundColor = 'royalblue';
        reponse.style.color = 'white';
        reponse.style.fontWeight = 'bold';
        reponse.textContent = "Votre mot de passe est moyennement sécurisé. Bravo !";
    } else if (score >= 4) {
        // Niveau très sécurisé
        reponse.style.backgroundColor = 'green';
        reponse.style.color = 'white';
        reponse.style.fontWeight = 'bold';
        reponse.textContent = "Votre mot de passe est sécurisé. Félicitation !";
    }
}
