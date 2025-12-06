document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HORLOGE HUD
  // =========================
  function updateClock() {
    const el = document.getElementById("hud-clock");
    const now = new Date();
    if (el) {
      el.textContent = now.toLocaleTimeString("fr-CA", { hour12: false });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // =========================
  // SWITCH DE CAMÉRAS + GLITCH + MAP + LOGO ZDOG
  // =========================
  const videoEl    = document.getElementById("live-video");
  const camLabel   = document.getElementById("cam-label");
  const cameraFeed = document.querySelector(".hud-camera-feed");

  const hudMap          = window.hudMap || null;
  const hudCamLocations = window.hudCamLocations || {};

  if (videoEl && camLabel) {
    document.querySelectorAll(".cam-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cam = btn.dataset.cam; // "01", "02", etc.

        // Effet glitch visuel sur la vidéo
        if (cameraFeed) {
          cameraFeed.classList.add("glitch");
          setTimeout(() => {
            cameraFeed.classList.remove("glitch");
          }, 200);
        }

        // Changer la vidéo
        videoEl.pause();
        videoEl.src = `assets/video/cam${cam}.mp4`;
        videoEl.load();
        videoEl.play().catch(() => {});

        // Label CMR-0X
        camLabel.textContent = `CMR-${cam}`;

        // Déplacer la carte vers la localisation de cette caméra
        const loc = hudCamLocations[cam];
        if (hudMap && loc) {
          hudMap.flyTo({
            center: [loc.lng, loc.lat],
            zoom: 4.2,
            speed: 0.8,
            curve: 1.4,
            essential: true
          });
        }

        // Changer le logo ZDog associé au pays de la caméra
        if (window.setHudCountryLogo) {
          window.setHudCountryLogo(cam);
        }
      });
    });
  }
});
