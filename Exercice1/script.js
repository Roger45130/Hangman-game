document.addEventListener('DOMContentLoaded', () => {
    const genreSelect = document.getElementById('sex__person');
    const ageInput = document.getElementById('age__person');
    const responseIRSMessage = document.getElementById('responseIRSmessage');

    function checkImposabilite() {
        const genre = genreSelect.value;
        const age = parseInt(ageInput.value);

        if (isNaN(age)) {
            responseIRSMessage.value = "Veuillez entrer un âge valide";
            return;
        }

        if ((genre === "Homme" && age > 20) ||
            (genre === "Femme" && age >= 18 && age <= 35)) {
            responseIRSMessage.value = "Vous êtes imposable";
        } else {
            responseIRSMessage.value = "Vous n'êtes pas imposable";
        }
    }

    genreSelect.addEventListener('change', checkImposabilite);
    ageInput.addEventListener('input', checkImposabilite);
});