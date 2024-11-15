function valider() {
    // Récupération des éléments d'entrée
    const age = parseInt(document.getElementById('input__ageConducteur').value);
    const anneePermis = parseInt(document.getElementById('input__anneePermis').value);
    const fidelite = parseInt(document.getElementById('input__fidelite').value);
    const nbrAccident = parseInt(document.getElementById('input__nbrAccident').value);
    const reponseAssurance = document.querySelector('.reponseAssurance');

    // Calcul des années de permis
    const anneeActuelle = new Date().getFullYear();
    const anneeExperiencePermis = anneeActuelle - anneePermis;

    // Réinitialisation de la réponse
    reponseAssurance.innerHTML = '';
    reponseAssurance.style.backgroundColor = '';
    reponseAssurance.style.color = 'white';
    reponseAssurance.style.fontWeight = 'bold';

    // Conditions pour l'évaluation du tarif
    if (nbrAccident > 3) {
        // Cas de refus pour plus de 3 accidents
        reponseAssurance.innerHTML = "Votre dossier ne peut être accepté par notre compagnie d'Assurance, désolé.";
        reponseAssurance.style.backgroundColor = 'rgb(148, 78, 112)';
    } else if (age < 25 && anneeExperiencePermis < 2) {
        // Moins de 25 ans et permis depuis moins de 2 ans
        if (nbrAccident === 0) {
            reponseAssurance.innerHTML = "Tarif de Niveau 1";
            reponseAssurance.style.backgroundColor = 'red';
        } else {
            reponseAssurance.innerHTML = "Votre dossier ne peut être accepté par notre compagnie d'Assurance, désolé.";
            reponseAssurance.style.backgroundColor = 'rgb(148, 78, 112)';
        }
    } else if ((age < 25 && anneeExperiencePermis >= 2) || (age >= 25 && anneeExperiencePermis < 2)) {
        // Moins de 25 ans avec plus de 2 ans de permis OU plus de 25 ans avec moins de 2 ans de permis
        if (nbrAccident === 0) {
            reponseAssurance.innerHTML = "Tarif de Niveau 2";
            reponseAssurance.style.backgroundColor = 'orange';
        } else if (nbrAccident === 1) {
            reponseAssurance.innerHTML = "Tarif de Niveau 1";
            reponseAssurance.style.backgroundColor = 'red';
        } else {
            reponseAssurance.innerHTML = "Votre dossier ne peut être accepté par notre compagnie d'Assurance, désolé.";
            reponseAssurance.style.backgroundColor = 'rgb(148, 78, 112)';
        }
    } else if (age >= 25 && anneeExperiencePermis >= 2) {
        // Plus de 25 ans et permis depuis plus de 2 ans
        if (nbrAccident === 0) {
            reponseAssurance.innerHTML = "Tarif de Niveau 3";
            reponseAssurance.style.backgroundColor = 'green';
        } else if (nbrAccident === 1) {
            reponseAssurance.innerHTML = "Tarif de Niveau 2";
            reponseAssurance.style.backgroundColor = 'orange';
        } else if (nbrAccident === 2) {
            reponseAssurance.innerHTML = "Tarif de Niveau 1";
            reponseAssurance.style.backgroundColor = 'red';
        } else {
            reponseAssurance.innerHTML = "Votre dossier ne peut être accepté par notre compagnie d'Assurance, désolé.";
            reponseAssurance.style.backgroundColor = 'rgb(148, 78, 112)';
        }
    }

    // Bonus fidélité
    if (fidelite > 1 && nbrAccident <= 1 && anneeExperiencePermis >= 2) {
        reponseAssurance.innerHTML = "Tarif de Niveau 4";
        reponseAssurance.style.backgroundColor = 'royalblue';
    }
};