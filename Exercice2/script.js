function calcul() {
    // Récupérer le nombre de photocopies demandées
    const nbPhotocopies = parseInt(document.getElementById("nombres__photocopie").value);

    // Vérifier si le nombre de photocopies est valide
    if (isNaN(nbPhotocopies) || nbPhotocopies <= 0) {
        alert("Veuillez entrer un nombre valide de photocopies.");
        return;
    }

    // Calculer le montant à payer en fonction des tarifs
    let montant = 0;

    if (nbPhotocopies <= 10) {
        montant = nbPhotocopies * 0.10;
    } else if (nbPhotocopies <= 30) {
        montant = (10 * 0.10) + ((nbPhotocopies - 10) * 0.09);
    } else {
        montant = (10 * 0.10) + (20 * 0.09) + ((nbPhotocopies - 30) * 0.08);
    }

    // Afficher le montant à payer dans le champ de résultat
    document.getElementById("montant__payer").value = montant.toFixed(2);
}
