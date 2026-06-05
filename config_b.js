// === CONFIGURATION DE LA BOUTIQUE (CHARGÉE DEPUIS JSON) ===
let boutiqueConfig = {
  estEnVacances: false,
  messageVacances: "on est fermé",
  fermetureExceptionnelle: true,
  messageExceptionnel: "we are enjoing our vocation I hope you so ! we can meet 12 Mai 2026 ",
  horaires: {},
};

// Fonction pour charger la configuration
async function loadBoutiqueConfig() {
  try {
    const response = await fetch("config.json?v=" + new Date().getTime());
    const data = await response.json();
    boutiqueConfig = data;
    console.log("Configuration chargée :", boutiqueConfig);

    // Déclencher les mises à jour d'affichage
    if (typeof updateStatus === "function") {
      updateStatus();
    }
    if (typeof updateBoutiqueStatus === "function") {
      updateBoutiqueStatus();
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la config :", error);
  }
}

// === LOGIQUE DU SYSTÈME (Conserve pour compatibilité) ===
function updateBoutiqueStatus() {
  const banner = document.getElementById("status-banner");
  if (!banner) return;

  // Gestion des Vacances / Fermetures Exceptionnelles
  if (boutiqueConfig.estEnVacances || boutiqueConfig.fermetureExceptionnelle) {
    banner.style.display = "block";
    banner.innerText = boutiqueConfig.estEnVacances
      ? boutiqueConfig.messageVacances
      : boutiqueConfig.messageExceptionnel;
  } else {
    banner.style.display = "none";
  }
}

// Initialisation
document.addEventListener("DOMContentLoaded", loadBoutiqueConfig);
