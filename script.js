
let dernierMontant = 0;
let dernierType = "";

function faireRetrait() {
    const input = document.getElementById("valeurInput").value;
    const affichage = document.getElementById("result");

    if (input === "") return;

    const nombre = parseFloat(input);
    dernierMontant = Number((nombre * 1.28036 + 7.1264).toFixed(2));
    dernierType = "Retrait";

    affichage.innerText = `Tu as dépensé : ${dernierMontant} $`;
    document.getElementById("saveBtn").style.display = "block";
}

function byCard(){
    const input = document.getElementById("valeurInput").value;
    const affichage = document.getElementById("result")

    if(input === ""){
        affichage.innerText ="Nothing happened";
        return;
    }
    const nombre = parseFloat(input);
    const resultatFinal = true;

    if(resultatFinal){
        affichage.innerText = `Tu ne connais pas encore le calcul à faire zebi`
    }
}


function sauvegarderSpent() {
    const messageElement = document.getElementById("saveMessage");

    // Vérification du mois avant d'ajouter la dépense
    const maintenant = new Date();
    const moisActuel = `${maintenant.getFullYear()}-${maintenant.getMonth() + 1}`;
    const dernierMois = localStorage.getItem("dernierMoisEnregistre");

    if (dernierMois && dernierMois !== moisActuel) {
        localStorage.removeItem("listeDepenses");
    }
    localStorage.setItem("dernierMoisEnregistre", moisActuel);

    // Enregistrement classique de la dépense
    let depenses = JSON.parse(localStorage.getItem("listeDepenses")) || [];

    const nouvelleDepense = {
        date: maintenant.toLocaleDateString("fr-FR"),
        type: dernierType,
        montant: dernierMontant
    };
    depenses.push(nouvelleDepense);

    localStorage.setItem("listeDepenses", JSON.stringify(depenses));

    messageElement.style.color = "#28a745";
    messageElement.innerText = "✔ Dépense ajoutée au tableau !";
}