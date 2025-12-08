document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // HORLOGE ET DATE EN TEMPS RÉEL
  // ============================================
  
  function updateClock() {
    const clockEl = document.getElementById("hud-clock");
    const dateEl = document.getElementById("hud-date");
    const timestampEl = document.getElementById("feed-timestamp");
    const now = new Date();
    
    // Mise à jour de l'horloge
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString("fr-CA", { hour12: false });
    }
    
    // Mise à jour de la date
    if (dateEl) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      dateEl.textContent = `${year}.${month}.${day}`;
    }
    
    // Mise à jour du timestamp sur la vidéo
    if (timestampEl) {
      const timeStr = now.toLocaleTimeString("fr-CA", { hour12: false });
      const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
      timestampEl.textContent = `${dateStr} // ${timeStr}`;
    }
  }
  
  // Initialiser et mettre à jour chaque seconde
  updateClock();
  setInterval(updateClock, 1000);

  // ============================================
  // RÉFÉRENCES AUX ÉLÉMENTS DU DOM
  // ============================================
  
  const videoEl = document.getElementById("live-video");
  const camLabel = document.getElementById("cam-label");
  const cameraFeed = document.querySelector(".hud-camera-feed");
  const hudMap = window.hudMap || null;
  const hudCamLocations = window.hudCamLocations || {};

  const dossierEl = document.getElementById("dossier-text");
  const gpsLatEl = document.getElementById("gps-lat");
  const gpsLngEl = document.getElementById("gps-lng");
  const countryEl = document.getElementById("country-label");
  const targetCards = document.querySelectorAll(".target-card");
  const camBtns = document.querySelectorAll(".cam-btn");
  const threatFill = document.getElementById("threat-fill");
  const threatStatus = document.getElementById("threat-status");

  // ============================================
  // MÉTADONNÉES DES CIBLES - MULTILINGUE
  // ============================================
  
  const targetMeta = {
    "01": {
      country: "Tunisie",
      city: "Tunis",
      flag: "🇹🇳",
      lat: "36.8189° N",
      lng: "10.1658° E",
      threat: 75,
      threatLevel: "ÉLEVÉ",
      threatColor: "#ff6600",
      // Texte en arabe pour la Tunisie
      dossier: `// [سري للغاية] الهدف: FOX-01
// إشارات مشفرة بين تونس وعقدة مجهولة
// اتصال عالي الخطورة - قائد خلية مشتبه به
// آخر موقع معروف: المدينة القديمة
// الحالة: نشط - مراقبة مستمرة`,
      dossierLang: "ar"
    },
    "02": {
      country: "Maroc",
      city: "Casablanca",
      flag: "🇲🇦",
      lat: "33.5731° N",
      lng: "7.5898° W",
      threat: 55,
      threatLevel: "MODÉRÉ",
      threatColor: "#ffaa00",
      // Texte en arabe pour le Maroc
      dossier: `// [مشفر] الهدف: GHOST-02
// حركة مشبوهة في منطقة الميناء
// حاويات شحن تحت المراقبة
// طريق محتمل لتهريب البيانات إلى أوروبا
// الحالة: متتبع - انتظار تأكيد`,
      dossierLang: "ar"
    },
    "03": {
      country: "Afghanistan",
      city: "Kabul",
      flag: "🇦🇫",
      lat: "34.5553° N",
      lng: "69.2075° E",
      threat: 95,
      threatLevel: "CRITIQUE",
      threatColor: "#ff2257",
      // Texte en dari/pashto
      dossier: `// [حیاتي] هدف: VIPER-03
// د ډرون فیډ سلا وړ وسله والی اسکورټ ښیې
// راډیو خبرې: عملیات کوډ «تور سهار»
// خطر کچه: خورا لوړه
// حالت: وسله وال - احتیاط`,
      dossierLang: "ar"
    },
    "04": {
      country: "Canada",
      city: "Québec",
      flag: "🇨🇦",
      lat: "46.8139° N",
      lng: "71.2082° W",
      threat: 25,
      threatLevel: "FAIBLE",
      threatColor: "#00ff6a",
      // Texte en français pour le Québec
      dossier: `// [SURVEILLANCE] SUJET: LYNX-04
// Activité détectée près d'une installation de recherche sécurisée
// Tentatives multiples de spoofing WiFi détectées
// Analyse des patterns de communication en cours
// Statut: Sous surveillance - Risque faible`,
      dossierLang: "fr"
    },
    "05": {
      country: "Russie",
      city: "Moscou",
      flag: "🇷🇺",
      lat: "55.7558° N",
      lng: "37.6173° E",
      threat: 60,
      threatLevel: "ÉLEVÉ",
      threatColor: "#ffaa00",
      // Texte en russe
      dossier: `// [НЕИЗВЕСТНО] СУБЪЕКТ: RAVEN-05
// Сигнал появляется только периодически
// Спутниковый след указывает на подземную сеть
// Шифрованные передачи каждые 6 часов
// Статус: Вне сети - Требуется расследование`,
      dossierLang: "ru"
    }
  };

  // ============================================
  // MISE À JOUR DE L'INTERFACE POUR UNE CIBLE
  // ============================================
  
  function setActiveTarget(camId) {
    // Mettre à jour les cartes de cibles
    targetCards.forEach((card) => {
      const isActive = card.dataset.cam === camId;
      card.classList.toggle("active", isActive);
    });

    // Mettre à jour les boutons de caméra
    camBtns.forEach((btn) => {
      const isActive = btn.dataset.cam === camId;
      btn.classList.toggle("active", isActive);
    });

    const meta = targetMeta[camId];
    if (meta) {
      // Mettre à jour le dossier avec texte multilingue
      if (dossierEl) {
        dossierEl.innerHTML = meta.dossier.replace(/\n/g, "<br>");
        // Ajuster la direction du texte selon la langue
        dossierEl.style.direction = meta.dossierLang === "ar" ? "rtl" : "ltr";
        dossierEl.style.textAlign = meta.dossierLang === "ar" ? "right" : "left";
        
        // Animation de fondu pour le changement
        dossierEl.style.opacity = "0";
        setTimeout(() => {
          dossierEl.style.opacity = "1";
          dossierEl.style.transition = "opacity 0.3s";
        }, 100);
      }

      // Mettre à jour les coordonnées GPS
      if (gpsLatEl) gpsLatEl.textContent = meta.lat;
      if (gpsLngEl) gpsLngEl.textContent = meta.lng;

      // Mettre à jour le label du pays
      if (countryEl) {
        countryEl.innerHTML = `
          <span class="country-flag">${meta.flag}</span>
          LOCALISATION: ${meta.country.toUpperCase()} / ${meta.city.toUpperCase()}
        `;
      }

      // Mettre à jour le niveau de menace
      if (threatFill) {
        threatFill.style.width = meta.threat + "%";
      }
      if (threatStatus) {
        threatStatus.textContent = meta.threatLevel;
        threatStatus.style.color = meta.threatColor;
      }

      // Mettre à jour les coordonnées de la carte
      if (window.updateMapCoordinates) {
        const loc = hudCamLocations[camId];
        if (loc) {
          window.updateMapCoordinates(loc.lng, loc.lat);
        }
      }
    }

    // Animer la carte de cible active
    if (window.anime) {
      anime({
        targets: `.target-card[data-cam="${camId}"]`,
        scale: [0.9, 1.02, 1],
        duration: 400,
        easing: "easeOutQuad"
      });
    }
  }

  // ============================================
  // GESTIONNAIRE DE CHANGEMENT DE CAMÉRA
  // ============================================
  
  function switchCamera(camId) {
    // Jouer le son de glitch
    if (window.playHudSound) {
      window.playHudSound("glitch");
    }

    // Effet de glitch visuel sur le flux vidéo
    if (cameraFeed) {
      cameraFeed.classList.add("glitch");
      setTimeout(() => {
        cameraFeed.classList.remove("glitch");
      }, 250);
    }

    // Changer la source vidéo
    if (videoEl) {
      videoEl.pause();
      videoEl.src = `assets/video/cam${camId}.mp4`;
      videoEl.load();
      videoEl.play().catch(() => {});
    }

    // Mettre à jour le label de caméra
    if (camLabel) {
      camLabel.textContent = `CMR-${camId}`;
    }

    // Déplacer la carte vers la nouvelle localisation
    const loc = hudCamLocations[camId];
    if (hudMap && loc) {
      hudMap.flyTo({
        center: [loc.lng, loc.lat],
        zoom: 4,
        speed: 0.6,
        curve: 1.5,
        essential: true
      });
    }

    // Mettre à jour le marqueur actif sur la carte
    if (window.setActiveMarker) {
      window.setActiveMarker(camId);
    }

    // Changer le logo ZDog selon le pays
    if (window.setHudCountryLogo) {
      window.setHudCountryLogo(camId);
    }

    // Mettre à jour l'interface des cibles
    setActiveTarget(camId);
  }

  // ============================================
  // ÉCOUTEURS D'ÉVÉNEMENTS - CAMÉRAS
  // ============================================

  // Boutons de caméra dans le panneau gauche
  camBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cam = btn.dataset.cam;
      switchCamera(cam);
    });
  });

  // Cartes de cibles cliquables
  targetCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cam = card.dataset.cam;
      switchCamera(cam);
    });
  });

  // ============================================
  // ACTIONS DES BOUTONS DU FOOTER
  // ============================================
  
  const alertOverlay = document.getElementById("alert-overlay");
  const alertText = document.getElementById("alert-text");
  const alertProgress = document.getElementById("alert-progress");

  // Fonction pour afficher une alerte avec barre de progression
  function showAlert(text, duration = 3000) {
    if (!alertOverlay) return;

    alertText.textContent = text;
    alertOverlay.classList.add("active");
    alertProgress.style.width = "0%";

    // Animer la barre de progression
    if (window.anime) {
      anime({
        targets: alertProgress,
        width: "100%",
        duration: duration,
        easing: "linear",
        complete: () => {
          alertOverlay.classList.remove("active");
        }
      });
    } else {
      setTimeout(() => {
        alertOverlay.classList.remove("active");
      }, duration);
    }
  }

  // Attacher les actions aux boutons du footer
  document.querySelectorAll(".hud-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;

      switch (action) {
        case "switch":
          // Passer à la caméra suivante
          const currentActive = document.querySelector(".cam-btn.active");
          const currentCam = currentActive ? currentActive.dataset.cam : "01";
          const nextCam = String((parseInt(currentCam) % 5) + 1).padStart(2, "0");
          switchCamera(nextCam);
          break;

        case "reboot":
          showAlert("REDÉMARRAGE DU SYSTÈME...", 4000);
          // Effet de glitch sur toute la page
          document.body.style.animation = "none";
          document.body.offsetHeight; // Forcer le reflow
          document.body.style.animation = "camGlitch 0.1s linear 10";
          setTimeout(() => {
            document.body.style.animation = "";
          }, 1000);
          break;

        case "lure":
          showAlert("LEURRE AUDIO ACTIVÉ", 2000);
          break;

        case "jammer":
          showAlert("⚠ BROUILLEUR ACTIVÉ - SIGNAL BLOQUÉ ⚠", 3000);
          // Effet de teinte rouge
          document.body.style.boxShadow = "inset 0 0 100px rgba(255, 34, 87, 0.3)";
          setTimeout(() => {
            document.body.style.boxShadow = "";
          }, 3000);
          break;
      }
    });
  });

  // ============================================
  // CONTRÔLES DES FILTRES VIDÉO
  // ============================================
  
  const btnNightVision = document.getElementById("btn-night-vision");
  const btnThermal = document.getElementById("btn-thermal");
  const btnNormal = document.getElementById("btn-normal");
  const feedBtns = document.querySelectorAll(".feed-btn");

  function setVideoFilter(type) {
    if (!videoEl) return;

    // Retirer la classe active de tous les boutons
    feedBtns.forEach(btn => btn.classList.remove("active"));

    // Appliquer le filtre approprié
    switch (type) {
      case "night":
        // Vision nocturne - teinte verte
        videoEl.style.filter = "grayscale(1) contrast(1.5) brightness(1.5) sepia(1) hue-rotate(70deg)";
        if (btnNightVision) btnNightVision.classList.add("active");
        break;
      case "thermal":
        // Thermique - couleurs inversées
        videoEl.style.filter = "grayscale(1) contrast(2) brightness(0.8) invert(1) hue-rotate(180deg)";
        if (btnThermal) btnThermal.classList.add("active");
        break;
      default:
        // Normal - noir et blanc avec léger contraste
        videoEl.style.filter = "grayscale(1) contrast(1.3) brightness(1.1)";
        if (btnNormal) btnNormal.classList.add("active");
    }
    
    // Jouer un son de clic
    if (window.playHudSound) {
      window.playHudSound("click");
    }
  }

  // Attacher les événements aux boutons de filtre
  if (btnNightVision) {
    btnNightVision.addEventListener("click", () => setVideoFilter("night"));
  }
  if (btnThermal) {
    btnThermal.addEventListener("click", () => setVideoFilter("thermal"));
  }
  if (btnNormal) {
    btnNormal.addEventListener("click", () => setVideoFilter("normal"));
  }

  // ============================================
  // ÉTAT INITIAL
  // ============================================
  
  setActiveTarget("01");

  // ============================================
  // EFFET DE GLITCH ALÉATOIRE
  // ============================================
  
  function randomGlitch() {
    // 30% de chance de déclencher un glitch
    if (Math.random() > 0.7 && cameraFeed) {
      cameraFeed.classList.add("glitch");
      
      // Jouer le son de glitch
      if (window.playHudSound) {
        window.playHudSound("interference");
      }
      
      setTimeout(() => {
        cameraFeed.classList.remove("glitch");
      }, 100);
    }
    // Prochain glitch dans 15-45 secondes
    setTimeout(randomGlitch, 15000 + Math.random() * 30000);
  }
  
  // Démarrer les glitchs aléatoires après 20 secondes
  setTimeout(randomGlitch, 20000);

  // ============================================
  // RACCOURCIS CLAVIER
  // ============================================
  
  document.addEventListener("keydown", (e) => {
    // Touches 1-5 pour changer de caméra
    if (e.key >= "1" && e.key <= "5") {
      const camId = e.key.padStart(2, "0");
      switchCamera(camId);
    }
    
    // Barre d'espace pour passer à la caméra suivante
    if (e.key === " " && e.target.tagName !== "INPUT") {
      e.preventDefault();
      const currentActive = document.querySelector(".cam-btn.active");
      const currentCam = currentActive ? currentActive.dataset.cam : "01";
      const nextCam = String((parseInt(currentCam) % 5) + 1).padStart(2, "0");
      switchCamera(nextCam);
    }
    
    // Touche N pour vision nocturne
    if (e.key === "n" || e.key === "N") {
      setVideoFilter("night");
    }
    
    // Touche T pour thermique
    if (e.key === "t" || e.key === "T") {
      setVideoFilter("thermal");
    }
    
    // Touche V pour vidéo normale
    if (e.key === "v" || e.key === "V") {
      setVideoFilter("normal");
    }
  });

});