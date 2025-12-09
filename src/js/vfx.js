// Effets visuels et logique principale
document.addEventListener("DOMContentLoaded", () => {

  // Horloge temps réel
  function updateClock() {
    const clockEl = document.getElementById("hud-clock");
    const dateEl = document.getElementById("hud-date");
    const timestampEl = document.getElementById("feed-timestamp");
    const now = new Date();

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString("fr-CA", { hour12: false });
    }
    
    if (dateEl) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      dateEl.textContent = `${year}.${month}.${day}`;
    }
    
    if (timestampEl) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const time = now.toLocaleTimeString("fr-CA", { hour12: false });
      timestampEl.textContent = `${year}.${month}.${day} // ${time}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Références DOM
  const videoEl = document.getElementById("live-video");
  const camLabel = document.getElementById("cam-label");
  const cameraFeed = document.querySelector(".hud-camera-feed");
  const dossierEl = document.getElementById("dossier-text");
  const gpsLatEl = document.getElementById("gps-lat");
  const gpsLngEl = document.getElementById("gps-lng");
  const countryEl = document.getElementById("country-label");
  const targetCards = document.querySelectorAll(".target-card");
  const camBtns = document.querySelectorAll(".cam-btn");
  const threatFill = document.getElementById("threat-fill");
  const threatStatus = document.getElementById("threat-status");

  // Métadonnées des cibles
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
      dossier: `// [سري للغاية] الهدف: FOX-01<br>// إشارات مشفرة بين تونس وعقدة مجهولة<br>// اتصال عالي الخطورة - قائد خلية مشتبه به<br>// الحالة: نشط - مراقبة مستمرة`,
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
      dossier: `// [مشفر] الهدف: GHOST-02<br>// حركة مشبوهة في منطقة الميناء<br>// حاويات شحن تحت المراقبة<br>// الحالة: متتبع - انتظار تأكيد`,
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
      dossier: `// [حیاتي] هدف: VIPER-03<br>// د ډرون فیډ سلا وړ وسله والی اسکورټ<br>// خطر کچه: خورا لوړه<br>// حالت: وسله وال - احتیاط`,
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
      dossier: `// [SURVEILLANCE] SUJET: LYNX-04<br>// Activité détectée près installation sécurisée<br>// Tentatives de spoofing WiFi détectées<br>// Statut: Sous surveillance - Risque faible`,
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
      dossier: `// [НЕИЗВЕСТНО] СУБЪЕКТ: RAVEN-05<br>// Сигнал появляется периодически<br>// Шифрованные передачи каждые 6 часов<br>// Статус: Вне сети - Требуется расследование`,
      dossierLang: "ru"
    }
  };

  // Localisations des caméras
  const camLocations = {
    "01": { lng: 10.1658, lat: 36.81897 },
    "02": { lng: -7.5898, lat: 33.5731 },
    "03": { lng: 69.2075, lat: 34.5553 },
    "04": { lng: -71.2082, lat: 46.8139 },
    "05": { lng: 37.6173, lat: 55.7558 }
  };

  // Mettre à jour l'interface pour une cible
  function setActiveTarget(camId) {
    // Mettre à jour les cartes de cibles
    targetCards.forEach(card => {
      card.classList.toggle("active", card.dataset.cam === camId);
    });

    // Mettre à jour les boutons de caméra
    camBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cam === camId);
    });

    const meta = targetMeta[camId];
    if (meta) {
      // Dossier
      if (dossierEl) {
        dossierEl.innerHTML = meta.dossier;
        dossierEl.style.direction = meta.dossierLang === "ar" ? "rtl" : "ltr";
        dossierEl.style.textAlign = meta.dossierLang === "ar" ? "right" : "left";
      }

      // GPS
      if (gpsLatEl) gpsLatEl.textContent = meta.lat;
      if (gpsLngEl) gpsLngEl.textContent = meta.lng;

      // Pays
      if (countryEl) {
        countryEl.innerHTML = `<span class="country-flag">${meta.flag}</span> LOCALISATION: ${meta.country.toUpperCase()} / ${meta.city.toUpperCase()}`;
      }

      // Menace
      if (threatFill) threatFill.style.width = meta.threat + "%";
      if (threatStatus) {
        threatStatus.textContent = meta.threatLevel;
        threatStatus.style.color = meta.threatColor;
      }

      // Coordonnées carte
      if (window.updateMapCoordinates) {
        const loc = camLocations[camId];
        if (loc) window.updateMapCoordinates(loc.lng, loc.lat);
      }
    }
  }

  // Changer de caméra - SON: glitch
  function switchCamera(camId) {
    // Son de glitch
    if (window.playHudSound) {
      window.playHudSound("glitch");
    }

    // Effet glitch visuel
    if (cameraFeed) {
      cameraFeed.classList.add("glitch");
      setTimeout(() => cameraFeed.classList.remove("glitch"), 250);
    }

    // Changer la vidéo
    if (videoEl) {
      videoEl.pause();
      videoEl.src = `assets/video/cam${camId}.mp4`;
      videoEl.load();
      videoEl.play().catch(() => {});
    }

    // Label caméra
    if (camLabel) {
      camLabel.textContent = `CMR-${camId}`;
    }

    // Déplacer la carte
    if (window.hudMap) {
      const loc = camLocations[camId];
      if (loc) {
        window.hudMap.flyTo({
          center: [loc.lng, loc.lat],
          zoom: 4,
          speed: 0.6
        });
      }
    }

    // Marqueur actif
    if (window.setActiveMarker) {
      window.setActiveMarker(camId);
    }

    // Logo ZDog
    if (window.setHudCountryLogo) {
      window.setHudCountryLogo(camId);
    }

    // Interface cible
    setActiveTarget(camId);
  }

  // Écouteurs boutons caméra - SON: glitch
  camBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const cam = btn.dataset.cam;
      switchCamera(cam);
    });
  });

  // Écouteurs cartes cibles - SON: targetLock
  targetCards.forEach(card => {
    card.addEventListener("click", () => {
      const cam = card.dataset.cam;
      if (window.playHudSound) window.playHudSound("targetLock");
      switchCamera(cam);
    });
  });

  // Overlay d'alerte
  const alertOverlay = document.getElementById("alert-overlay");
  const alertText = document.getElementById("alert-text");
  const alertProgress = document.getElementById("alert-progress");

  function showAlert(text, duration = 3000) {
    if (!alertOverlay) return;
    alertText.textContent = text;
    alertOverlay.classList.add("active");
    alertProgress.style.width = "0%";

    let start = Date.now();
    function updateProgress() {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      alertProgress.style.width = percent + "%";
      
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        alertOverlay.classList.remove("active");
      }
    }
    updateProgress();
  }

  // Boutons footer
  document.querySelectorAll(".hud-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;

      switch (action) {
        case "switch":
          // SON: switch
          if (window.playHudSound) window.playHudSound("switch");
          const current = document.querySelector(".cam-btn.active");
          const currentCam = current ? current.dataset.cam : "01";
          const nextCam = String((parseInt(currentCam) % 5) + 1).padStart(2, "0");
          switchCamera(nextCam);
          break;

        case "reboot":
          // SON: reboot
          if (window.playHudSound) window.playHudSound("reboot");
          showAlert("REDÉMARRAGE DU SYSTÈME...", 4000);
          break;

        case "lure":
          // SON: lure
          if (window.playHudSound) window.playHudSound("lure");
          showAlert("LEURRE AUDIO ACTIVÉ", 2000);
          break;

        case "jammer":
          // SON: jammer
          if (window.playHudSound) window.playHudSound("jammer");
          showAlert("⚠ BROUILLEUR ACTIVÉ ⚠", 3000);
          document.body.style.boxShadow = "inset 0 0 100px rgba(255, 34, 87, 0.3)";
          setTimeout(() => document.body.style.boxShadow = "", 3000);
          break;
      }
    });
  });

  // Boutons filtres vidéo - SON: click
  const btnNightVision = document.getElementById("btn-night-vision");
  const btnThermal = document.getElementById("btn-thermal");
  const btnNormal = document.getElementById("btn-normal");
  const feedBtns = document.querySelectorAll(".feed-btn");

  function setVideoFilter(type) {
    if (!videoEl) return;

    // Son de clic
    if (window.playHudSound) window.playHudSound("click");

    // Retirer active de tous
    feedBtns.forEach(btn => btn.classList.remove("active"));

    switch (type) {
      case "night":
        videoEl.style.filter = "grayscale(1) contrast(1.5) brightness(1.5) sepia(1) hue-rotate(70deg)";
        if (btnNightVision) btnNightVision.classList.add("active");
        break;
      case "thermal":
        videoEl.style.filter = "grayscale(1) contrast(2) brightness(0.8) invert(1) hue-rotate(180deg)";
        if (btnThermal) btnThermal.classList.add("active");
        break;
      default:
        videoEl.style.filter = "grayscale(1) contrast(1.3) brightness(1.1)";
        if (btnNormal) btnNormal.classList.add("active");
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

  // État initial
  setActiveTarget("01");

  // Glitch aléatoire - SON: glitch (léger)
  function randomGlitch() {
    if (Math.random() > 0.7 && cameraFeed) {
      cameraFeed.classList.add("glitch");
      setTimeout(() => cameraFeed.classList.remove("glitch"), 100);
    }
    setTimeout(randomGlitch, 15000 + Math.random() * 30000);
  }
  setTimeout(randomGlitch, 20000);

  // Raccourcis clavier
  document.addEventListener("keydown", (e) => {
    // 1-5: Changer de caméra
    if (e.key >= "1" && e.key <= "5") {
      switchCamera(e.key.padStart(2, "0"));
    }
    
    // Espace: Caméra suivante
    if (e.key === " " && e.target.tagName !== "INPUT") {
      e.preventDefault();
      const current = document.querySelector(".cam-btn.active");
      const currentCam = current ? current.dataset.cam : "01";
      const nextCam = String((parseInt(currentCam) % 5) + 1).padStart(2, "0");
      switchCamera(nextCam);
    }
    
    // N: Vision nocturne
    if (e.key === "n" || e.key === "N") {
      setVideoFilter("night");
    }
    
    // T: Thermique
    if (e.key === "t" || e.key === "T") {
      setVideoFilter("thermal");
    }
    
    // V: Normal
    if (e.key === "v" || e.key === "V") {
      setVideoFilter("normal");
    }
  });

  console.log("VFX initialisé");
});