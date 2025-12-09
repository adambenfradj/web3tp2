document.addEventListener("DOMContentLoaded", () => {
  if (!window.anime) return;

  // Animation d'entrée des panneaux
  anime({ targets: ".hud-header", opacity: [0, 1], translateY: [-30, 0], duration: 800, easing: "easeOutExpo" });
  anime({ targets: ".hud-left", opacity: [0, 1], translateX: [-50, 0], duration: 800, delay: 200, easing: "easeOutExpo" });
  anime({ targets: ".hud-center", opacity: [0, 1], scale: [0.95, 1], duration: 800, delay: 300, easing: "easeOutExpo" });
  anime({ targets: ".hud-right", opacity: [0, 1], translateX: [50, 0], duration: 800, delay: 400, easing: "easeOutExpo" });
  anime({ targets: ".hud-footer", opacity: [0, 1], translateY: [30, 0], duration: 800, delay: 500, easing: "easeOutExpo" });
  anime({ targets: ".corner-bracket", opacity: [0, 0.8], scale: [0.8, 1], delay: anime.stagger(100, { start: 600 }), duration: 500, easing: "easeOutBack" });

  // Pulsation du logo
  anime({
    targets: ".hud-logo",
    boxShadow: ["0 0 10px rgba(0, 255, 106, 0.3)", "0 0 25px rgba(0, 255, 106, 0.6)", "0 0 10px rgba(0, 255, 106, 0.3)"],
    duration: 2000,
    loop: true,
    easing: "easeInOutSine"
  });

  // Survol boutons caméra
  document.querySelectorAll(".cam-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => anime({ targets: btn, scale: 1.02, duration: 200, easing: "easeOutQuad" }));
    btn.addEventListener("mouseleave", () => anime({ targets: btn, scale: 1, duration: 200, easing: "easeOutQuad" }));
  });

  // Pulsation cible active
  setInterval(() => {
    const activeCard = document.querySelector(".target-card.active");
    if (activeCard) {
      anime({
        targets: activeCard,
        boxShadow: ["0 0 15px rgba(0, 255, 106, 0.3)", "0 0 35px rgba(0, 255, 106, 0.5)", "0 0 15px rgba(0, 255, 106, 0.3)"],
        duration: 2000,
        easing: "easeInOutSine"
      });
    }
  }, 2500);

  // Nouveaux logs
  const logLines = ["XK9#mZ2$vL8@nQ4!pR7", "DECRYPT: FAILED_AUTH_44X", "TRACE: NODE_192.168.X.X", "PING: 42ms >> OK", "SCAN: FREQUENCY_LOCKED"];
  
  setInterval(() => {
    const logs = document.getElementById("logs");
    if (!logs) return;

    const randomLog = logLines[Math.floor(Math.random() * logLines.length)];
    const time = new Date().toLocaleTimeString("fr-CA", { hour12: false });

    const newLine = document.createElement("div");
    newLine.className = "log-line new";
    newLine.innerHTML = `<span class="log-time">${time}</span> ${randomLog}`;

    logs.querySelectorAll(".log-line.new").forEach(line => line.classList.remove("new"));
    logs.appendChild(newLine);

    while (logs.children.length > 8) logs.removeChild(logs.firstChild);
    logs.scrollTop = logs.scrollHeight;

    anime({ targets: newLine, opacity: [0, 1], translateX: [-20, 0], duration: 400, easing: "easeOutQuad" });
  }, 5000 + Math.random() * 5000);

  // Mise à jour niveau de menace
  const levels = [
    { width: "25%", text: "FAIBLE", color: "#00ff6a" },
    { width: "45%", text: "MODÉRÉ", color: "#6eea8c" },
    { width: "60%", text: "ÉLEVÉ", color: "#ffaa00" },
    { width: "75%", text: "HAUT", color: "#ff6600" },
    { width: "90%", text: "CRITIQUE", color: "#ff2257" }
  ];

  setInterval(() => {
    const fill = document.getElementById("threat-fill");
    const status = document.getElementById("threat-status");
    if (!fill || !status) return;

    const level = levels[Math.floor(Math.random() * levels.length)];
    anime({ targets: fill, width: level.width, duration: 1000, easing: "easeOutQuad" });
    status.textContent = level.text;
    status.style.color = level.color;
  }, 8000 + Math.random() * 7000);

  // Mise à jour latence
  setInterval(() => {
    const el = document.getElementById("latency");
    if (!el) return;
    const latency = Math.floor(Math.random() * 60) + 20;
    el.textContent = latency + "ms";
    el.style.color = latency > 60 ? "#ff2257" : latency > 40 ? "#ffaa00" : "#00ff6a";
  }, 2000);

  // Mise à jour mouvement
  setInterval(() => {
    const el = document.getElementById("motion-level");
    if (!el) return;
    const levels = ["FAIBLE", "MOYEN", "ÉLEVÉ"];
    const level = levels[Math.floor(Math.random() * levels.length)];
    el.textContent = level;
    el.style.color = level === "ÉLEVÉ" ? "#ff2257" : level === "MOYEN" ? "#ffaa00" : "#00ff6a";
  }, 4000 + Math.random() * 3000);

  // Pulsation empreinte
  setInterval(() => {
    anime({ targets: ".fp-ring", strokeOpacity: [0.3, 1, 0.3], delay: anime.stagger(100), duration: 2000, easing: "easeInOutSine" });
  }, 4000);
});