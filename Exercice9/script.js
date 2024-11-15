const mots = [
    "hongroyassions", "impressionnera", "matérialiserai", "resquillerions", "régulariseriez",
    "radioscopaient", "madrigaliserai", "chaparderaient", "déglutinations", "subcarpatiques",
    "instituassions", "accessoiristes", "réimprimassent", "caramélisèrent", "désorientaient",
    "hermaphrodites", "dénationalisés", "parangonnerait", "bredouillasses", "dévisageraient",
    "africaniseriez", "ceinturassions", "rétrocéderions", "libéralisasses", "brouettassions",
    "paupériserions", "insensibiliser", "réverbérassiez", "instaureraient", "volatilisables",
    "spiritualisera", "subventionnera", "entre-dévorées", "transfigurâmes", "débecquetasses",
    "dégurgiterions", "tourniquassent", "blackbouleront", "chaperonnerais", "somnambuliques",
    "déniaiseraient", "schématisation", "matriculassiez", "sérodiagnostic", "désolidarisent",
    "émancipatrices", "nucléariserais", "toussoteraient", "carrossassions", "treillissaient",
    "alphabétisâmes", "conceptualisât", "désensablerait", "économisassent", "glandouillions",
    "reprogrammâmes", "réescompterait", "circonvolution", "fanfrelucheras", "syndicaliseras",
    "sautilleraient", "magnétosphères", "escarrifieriez", "questionnerait", "temporisations",
    "dégingandasses", "proverbialisât", "emballotterons", "réactualisions", "fossilisassent",
    "entraccordâtes", "séditieusement", "répercuterions", "monumentalités", "décomplexerons",
    "totalisassions", "idiotifiassent", "bergeronnettes", "défavorisèrent", "défraîchissent",
    "tenailleraient", "surdéterminant", "renouvelleront", "patelineraient", "rectifiassions",
    "éclabousseriez", "manoeuvrerions", "supplémenterai", "entartrassions", "radioguidaient",
    "pseudarthroses", "trigonocéphale", "titularisèrent", "banqueroutiers", "ratiocinations",
    "tuberculineras", "défranciserais", "réchampissions", "paillassonnons", "monopolisateur",
    "hydrominérales", "malencontreuse", "échelonnassiez", "enchatonnement", "dialectalisées",
    "claironnassent", "divertissement", "dépucellerions", "partitionnâmes", "convainquirent",
    "personnifieras", "transocéaniens", "augmenteraient", "alanguissaient", "dialectalisent",
    "calligraphient", "emmouscaillant", "ressuscitaient", "désurchauffant", "relationnelles",
    "annexionnistes", "réhabilitèrent", "sablonneraient", "déconnectèrent", "embéguinassiez",
    "désadaptassent", "reconsolideras", "contredisaient", "boustifailliez", "soliloquerions",
    "désinfecterons", "aguerrissement", "renforceraient", "brigandassions", "dévalorisation",
    "désinculperiez", "brocanteraient", "déharnacheront", "démaigriraient", "dépoudrassions",
    "essoucheraient", "embarrasseriez", "bondonneraient", "réunifiassions", "transplantasse",
    "hyperémotivité", "effaroucherais", "empoisonneuses", "tambourinerait", "bourlinguerons"
];

let motADeviner = "";
let motAffiche = [];
let erreurs = 0;
const maxErreurs = 9;
const lettresUtilisees = [];

function choisirMot() {
    motADeviner = mots[Math.floor(Math.random() * mots.length)];
    motAffiche = Array(motADeviner.length).fill("_");
    document.querySelector(".trouverMot").innerHTML = motAffiche.join(" ");
}

function afficherMot() {
    document.querySelector(".trouverMot").innerHTML = motAffiche.join(" ");
}

function initializeButtons() {
    const buttons = document.querySelectorAll('.gridButtonLettre button');
    buttons.forEach(button => {
        button.innerText = button.innerText.toLowerCase();
        button.addEventListener('click', () => {
            button.disabled = true;
            console.log(`Bouton "${button.innerText}" utilisé et désactivé.`);
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeButtons);

function afficherLettresUtilisees() {
    document.querySelector(".utiliser").innerHTML = lettresUtilisees.join(" ; ");
}

function valider(button) {
    const lettre = button.innerText;
    if (lettresUtilisees.includes(lettre)) return;

    // La push()méthode des Arrayinstances ajoute les éléments spécifiés à la fin d'un tableau et renvoie la nouvelle longueur du tableau.
    lettresUtilisees.push(lettre);
    afficherLettresUtilisees();

    if (motADeviner.includes(lettre)) {
        for (let i = 0; i < motADeviner.length; i++) {
            if (motADeviner[i] === lettre) {
                motAffiche[i] = lettre;
            }
        }
        afficherMot();

        if (!motAffiche.includes("_")) {
            document.querySelector(".motTrouver").innerText = `Félicitations, vous avez trouvé le mot : ${motADeviner}`;
        }
    } else {
        erreurs++;
        if (erreurs <= maxErreurs) {
            document.querySelector(".imagePendu").innerHTML = `<img src="Assets/images/penduError${erreurs}.png" alt="Erreur ${erreurs}">`;
        }

        if (erreurs === maxErreurs) {
            document.querySelector(".motTrouver").innerText = `Désolé, vous avez perdu ! Le mot était : ${motADeviner}`;
        }
    }
}

choisirMot();