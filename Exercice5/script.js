document.getElementById("input__email").addEventListener("keyup", function() {
    const email = this.value;
    const verificationDiv = document.querySelector(".verification");

    // Vérifie que l'email contient un "@" et un "." après le "@"
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex > 0 && dotIndex > atIndex + 1) {
        verificationDiv.textContent = "Adresse email valide";
        verificationDiv.style.color = "green";
    } else {
        verificationDiv.textContent = "Adresse email invalide";
        verificationDiv.style.color = "red";
    }
});
