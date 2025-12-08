document.addEventListener("DOMContentLoaded", () => {
  
  // Vérifier si Anime.js est disponible
  if (!window.anime) return;

  // ============================================
  // ANIMATIONS D'ENTRÉE - Au chargement de la page
  // ============================================

  // Animation de l'en-tête - glisse du haut
  anime({
    targets: ".hud-header",
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 800,
    easing: "easeOutExpo"
  });

  // Animation du panneau gauche - glisse de la gauche
  anime({
    targets: ".hud-left",
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    delay: 200,
    easing: "easeOutExpo"
  });

  // Animation du panneau central - zoom léger
  anime({
    targets: ".hud-center",
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 800,
    delay: 300,
    easing: "easeOutExpo"
  });

  // Animation du panneau droit - glisse de la droite
  anime({
    targets: ".hud-right",
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    delay: 400,
    easing: "easeOutExpo"
  });

  // Animation du pied de page - glisse du bas
  anime({
    targets: ".hud-footer",
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: 500,
    easing: "easeOutExpo"
  });

  // Animation des crochets aux coins de la vidéo
  anime({
    targets: ".corner-bracket",
    opacity: [0, 0.8],
    scale: [0.8, 1],
    delay: anime.stagger(100, { start: 600 }),
    duration: 500,
    easing: "easeOutBack"
  });

  // ============================================
  // ANIMATION CONTINUE DU LOGO
  // ============================================

  // Pulsation de la lueur autour du logo
  anime({
    targets: ".hud-logo",
    boxShadow: [
      "0 0 10px rgba(0, 255, 106, 0.3)",
      "0 0 25px rgba(0, 255, 106, 0.6)",
      "0 0 10px rgba(0, 255, 106, 0.3)"
    ],
    duration: 2000,
    loop: true,
    easing: "easeInOutSine"
  });

  // ============================================
  // ANIMATION AU SURVOL DES BOUTONS DE CAMÉRA
  // ============================================

  document.querySelectorAll(".cam-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      anime({
        targets: btn,
        scale: 1.02,
        duration: 200,
        easing: "easeOutQuad"
      });
    });

    btn.addEventListener("mouseleave", () => {
      anime({
        targets: btn,
        scale: 1,
        duration: 200,
        easing: "easeOutQuad"
      });
    });
  });

  // ============================================
  // PULSATION DES CARTES DE CIBLES ACTIVES
  // ============================================

  function pulseActiveTarget() {
    const activeCard = document.querySelector(".target-card.active");
    if (activeCard) {
      anime({
        targets: activeCard,
        boxShadow: [
          "0 0 15px rgba(0, 255, 106, 0.3)",
          "0 0 35px rgba(0, 255, 106, 0.5)",
          "0 0 15px rgba(0, 255, 106, 0.3)"
        ],
        duration: 2000,
        easing: "easeInOutSine"
      });
    }
  }

  // Pulser toutes les 2.5 secondes
  setInterval(pulseActiveTarget, 2500);

  // ============================================
  // ANIMATION DES NOUVEAUX LOGS
  // ============================================

  function animateNewLog() {
    const logs = document.getElementById("logs");
    if (!logs) return;

    // Messages de log aléatoires pour simuler l'activité
    const logLines = [
      "XK9#mZ2$vL8@nQ4!pR7",
      "DECRYPT: FAILED_AUTH_44X",
      "TRACE: NODE_192.168.X.X",
      "PING: 42ms >> OK",
      "SCAN: FREQUENCY_LOCKED",
      "DATA_STREAM: ACTIVE",
      "ENCRYPT: AES-256-GCM",
      "SIGNAL: INTERCEPTED_01",
      "HANDSHAKE: COMPLETE",
      "BUFFER: OVERFLOW_DETECTED"
    ];

    // Sélectionner un message aléatoire
    const randomLog = logLines[Math.floor(Math.random() * logLines.length)];
    const now = new Date();
    const time = now.toLocaleTimeString("fr-CA", { hour12: false });

    // Créer un nouvel élément de log
    const newLine = document.createElement("div");
    newLine.className = "log-line new";
    newLine.innerHTML = `<span class="log-time">${time}</span> ${randomLog}`;

    // Retirer la classe 'new' des lignes précédentes
    logs.querySelectorAll(".log-line.new").forEach(line => {
      line.classList.remove("new");
    });

    // Ajouter la nouvelle ligne
    logs.appendChild(newLine);

    // Garder seulement les 8 dernières lignes
    while (logs.children.length > 8) {
      logs.removeChild(logs.firstChild);
    }

    // Faire défiler vers le bas
    logs.scrollTop = logs.scrollHeight;

    // Animation d'entrée de la nouvelle ligne
    anime({
      targets: newLine,
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 400,
      easing: "easeOutQuad"
    });
  }

  // Ajouter un nouveau log toutes les 5-10 secondes
  setInterval(animateNewLog, 5000 + Math.random() * 5000);

  // ============================================
  // ANIMATION DU NIVEAU DE MENACE
  // ============================================

  function updateThreatMeter() {
    const fill = document.getElementById("threat-fill");
    const status = document.getElementById("threat-status");
    if (!fill || !status) return;

    // Niveaux de menace possibles
    const levels = [
      { width: "25%", text: "FAIBLE", color: "#00ff6a" },
      { width: "45%", text: "MODÉRÉ", color: "#6eea8c" },
      { width: "60%", text: "ÉLEVÉ", color: "#ffaa00" },
      { width: "75%", text: "HAUT", color: "#ff6600" },
      { width: "90%", text: "CRITIQUE", color: "#ff2257" }
    ];

    // Sélectionner un niveau aléatoire
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];

    // Animer la barre de progression
    anime({
      targets: fill,
      width: randomLevel.width,
      duration: 1000,
      easing: "easeOutQuad"
    });

    // Mettre à jour le texte et la couleur
    status.textContent = randomLevel.text;
    status.style.color = randomLevel.color;
  }

  // Mettre à jour le niveau de menace toutes les 8-15 secondes
  setInterval(updateThreatMeter, 8000 + Math.random() * 7000);

  // ============================================
  // ANIMATION DE LA LATENCE
  // ============================================

  function updateLatency() {
    const latencyEl = document.getElementById("latency");
    if (!latencyEl) return;

    // Générer une latence aléatoire entre 20 et 80ms
    const latency = Math.floor(Math.random() * 60) + 20;
    latencyEl.textContent = latency + "ms";

    // Changer la couleur selon la latence
    if (latency > 60) {
      latencyEl.style.color = "#ff2257";  // Rouge - mauvaise
    } else if (latency > 40) {
      latencyEl.style.color = "#ffaa00";  // Orange - moyenne
    } else {
      latencyEl.style.color = "#00ff6a";  // Vert - bonne
    }
  }

  // Mettre à jour la latence toutes les 2 secondes
  setInterval(updateLatency, 2000);

  // ============================================
  // ANIMATION DU NIVEAU DE MOUVEMENT
  // ============================================

  function updateMotionLevel() {
    const motionEl = document.getElementById("motion-level");
    if (!motionEl) return;

    // Niveaux possibles
    const levels = ["FAIBLE", "MOYEN", "ÉLEVÉ"];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    motionEl.textContent = randomLevel;

    // Couleur selon le niveau
    if (randomLevel === "ÉLEVÉ") {
      motionEl.style.color = "#ff2257";
    } else if (randomLevel === "MOYEN") {
      motionEl.style.color = "#ffaa00";
    } else {
      motionEl.style.color = "#00ff6a";
    }
  }

  // Mettre à jour le mouvement toutes les 4-7 secondes
  setInterval(updateMotionLevel, 4000 + Math.random() * 3000);

  // ============================================
  // ANIMATION DES CARTES DE CIBLES AU SURVOL
  // ============================================

  document.querySelectorAll(".target-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("active")) {
        anime({
          targets: card,
          scale: 1.05,
          duration: 200,
          easing: "easeOutQuad"
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("active")) {
        anime({
          targets: card,
          scale: 0.95,
          duration: 200,
          easing: "easeOutQuad"
        });
      }
    });
  });

  // ============================================
  // ANIMATION DES BOUTONS DU FOOTER
  // ============================================

  document.querySelectorAll(".hud-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      anime({
        targets: btn,
        scale: 1.05,
        duration: 150,
        easing: "easeOutQuad"
      });
    });

    btn.addEventListener("mouseleave", () => {
      anime({
        targets: btn,
        scale: 1,
        duration: 150,
        easing: "easeOutQuad"
      });
    });
  });

  // ============================================
  // ANIMATION DE L'EMPREINTE DIGITALE
  // ============================================

  // Faire pulser l'empreinte digitale périodiquement
  function pulseFingerprint() {
    anime({
      targets: ".fp-ring",
      strokeOpacity: [0.3, 1, 0.3],
      delay: anime.stagger(100),
      duration: 2000,
      easing: "easeInOutSine"
    });
  }

  // Pulser toutes les 4 secondes
  setInterval(pulseFingerprint, 4000);

});