function verifierRazAutomatique() {
    const maintenant = new Date();
    // Génère une clé unique pour le mois (ex: "2026-9")
    const moisActuel = `${maintenant.getFullYear()}-${maintenant.getMonth() + 1}`;
    const dernierMois = localStorage.getItem("dernierMoisEnregistre");

    // Si le mois enregistré est différent du mois actuel, on efface le tableau
    if (dernierMois && dernierMois !== moisActuel) {
        localStorage.removeItem("listeDepenses");
    }

    // On met à jour le mois courant en mémoire
    localStorage.setItem("dernierMoisEnregistre", moisActuel);
}

function chargerDonnees() {
    // Exécute la vérification du mois avant d'afficher quoi que ce soit
    verifierRazAutomatique();

    const depenses = JSON.parse(localStorage.getItem("listeDepenses")) || [];
    const corpsTableau = document.getElementById("corpsTableau");
    const totalElement = document.getElementById("totalMontant");

    corpsTableau.innerHTML = "";
    let total = 0;

    depenses.forEach(dep => {
        total += dep.montant;

        const ligne = document.createElement("tr");
        ligne.innerHTML = `
            <td>${dep.date}</td>
            <td>${dep.type}</td>
            <td>${dep.montant} €</td>
        `;
        corpsTableau.appendChild(ligne);
    });

    totalElement.innerText = `${total.toFixed(2)} €`;
}

function resetAdmin() {
    const motDePasseCorrect = "Fortune"; // Modifie ton mot de passe ici
    const saisie = prompt("Entrez le mot de passe administrateur :");
    const message = document.getElementById("adminMessage");

    if (saisie === null) return; // Annulation

    if (saisie === motDePasseCorrect) {
        localStorage.removeItem("listeDepenses");
        message.style.color = "#28a745";
        message.innerText = "✔ Tableau réinitialisé avec succès !";
        chargerDonnees();
    } else {
        message.style.color = "#dc3545";
        message.innerText = "❌ Mot de passe incorrect !";
    }
}

// Lancement au chargement de la page
chargerDonnees();