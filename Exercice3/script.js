function nouvelleHeure() {
    const heureInput = document.getElementById("demande__heure").value;
    const minuteInput = document.getElementById("demande__minute").value;
    const secondeInput = document.getElementById("demande__seconde").value;

    let heure = parseInt(heureInput) || 0;
    let minute = parseInt(minuteInput) || 0;
    let seconde = parseInt(secondeInput) || 0;
    seconde += 1;

    if (seconde >= 60) {
        seconde = 0;
        minute += 1;
    }
    if (minute >= 60) {
        minute = 0;
        heure += 1;
    }
    if (heure >= 24) {
        heure = 0;
    }

    const affichage = `${heure}h ${minute}min ${seconde}sec`;
    document.querySelector(".AfficheNvHeure").textContent = affichage;
}