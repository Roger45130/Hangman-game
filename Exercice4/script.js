document.querySelector('.btnRendreMonaie').addEventListener('click', rendreLaMonnaie);

function rendreLaMonnaie() {
    const montantFacture = parseFloat(document.getElementById('demande__montantFacture').value);
    const montantPayer = parseFloat(document.getElementById('demande__montantPayer').value);
    const montantRendre = montantPayer - montantFacture;

    if (isNaN(montantFacture) || isNaN(montantPayer) || montantRendre < 0) {
        alert("Veuillez entrer des montants valides, où le montant payé est supérieur ou égal au montant de la facture.");
        return;
    }

    let reste = montantRendre;

    const billets10 = Math.floor(reste / 10);
    reste %= 10;

    const billets5 = Math.floor(reste / 5);
    reste %= 5;

    const pieces1 = Math.floor(reste);

    const rendreMonaieDiv = document.querySelector('.rendreMonaie');
    rendreMonaieDiv.innerHTML = `
        <div class="monnaie-container">
            <img src="asset/image/billet10euros.png" alt="Billet de 10 euros" class="billet10e">
            <span class="monnaie-quantite">${billets10}</span>
        </div>
        <div class="monnaie-container">
            <img src="asset/image/billet5euros.png" alt="Billet de 5 euros" class="billet5e">
            <span class="monnaie-quantite">${billets5}</span>
        </div>
        <div class="monnaie-container">
            <img src="asset/image/piece1euro.png" alt="Pièce de 1 euro" class="piece1e">
            <span class="monnaie-quantite">${pieces1}</span>
        </div>
        
    `;
}