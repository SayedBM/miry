// === CONFIGURATION DE LA BOUTIQUE ===
const boutiqueConfig = {
  // 1. VACANCES ET FERMETURES
  estEnVacances: true,
  messageVacances:
    "We are closed today!,

  fermetureExceptionnelle: false,
  messageExceptionnel: "this morning we are closed.",

  // 2. HORAIRES (Format 24h : [Ouverture, Fermeture])
  // Note : 0 = Dimanche, 1 = Lundi, etc.
  horaires: {
    1: ["08:00", "19:00"], // Lundi
    2: ["08:00", "19:00"], // Mardi
    3: ["08:00", "19:00"], // Mercredi
    4: ["08:00", "19:00"], // Jeudi
    5: ["08:00", "19:00"], // Vendredi
    6: ["09:00", "17:00"], // Samedi
    0: null, // Dimanche (null = Fermé)
  },
};

// === LOGIQUE DU SYSTÈME ===
function updateBoutiqueStatus() {
  const now = new Date();
  const jourActuel = now.getDay();
  const heureActuelle = now.getHours() + now.getMinutes() / 60;

  const banner = document.getElementById("status-banner");
  const badge = document.getElementById("status-badge");
  const badgeText = document.getElementById("badge-text");

  // 1. Gestion des Vacances / Fermetures Exceptionnelles
  if (boutiqueConfig.estEnVacances || boutiqueConfig.fermetureExceptionnelle) {
    banner.style.display = "block";
    banner.innerText = boutiqueConfig.estEnVacances
      ? boutiqueConfig.messageVacances
      : boutiqueConfig.messageExceptionnel;
    badge.className = "status-badge closed";
    badgeText.innerText = "Boutique fermée";
    return;
  }

  // 2. Gestion des horaires normaux
  const plageHoraire = boutiqueConfig.horaires[jourActuel];

  if (!plageHoraire) {
    setClosed(badge, badgeText, "Fermé - Réouverture Lundi 08:00");
    return;
  }

  const [hOuv, mOuv] = plageHoraire[0].split(":").map(Number);
  const [hFer, mFer] = plageHoraire[1].split(":").map(Number);
  const debut = hOuv + mOuv / 60;
  const fin = hFer + mFer / 60;

  if (heureActuelle >= debut && heureActuelle < fin) {
    badge.className = "status-badge open";
    badgeText.innerText = "Ouvert actuellement";
  } else {
    let messageRelance = `Fermé - Ouvre à ${plageHoraire[0]}`;
    if (heureActuelle >= fin) {
      // Trouver le prochain jour d'ouverture
      messageRelance = "Fermé pour la journée";
    }
    setClosed(badge, badgeText, messageRelance);
  }
}

function setClosed(el, txtEl, msg) {
  el.className = "status-badge closed";
  txtEl.innerText = msg;
}

// Initialisation
document.addEventListener("DOMContentLoaded", updateBoutiqueStatus);
