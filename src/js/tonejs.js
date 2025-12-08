document.addEventListener("DOMContentLoaded", () => {
  if (!window.Tone) return;

  // Audio activé ou non
  let audioOK = false;

  // ============================================
  // SYNTHÉTISEURS
  // ============================================

  const synth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 }
  }).toDestination();
  synth.volume.value = -5;

  const noise = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }
  }).toDestination();
  noise.volume.value = -8;

  const metal = new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.3, release: 0.2 },
    harmonicity: 5,
    modulationIndex: 20,
    resonance: 3000,
    octaves: 1.5
  }).toDestination();
  metal.volume.value = -12;

  const fm = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 10,
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 },
    modulation: { type: "square" },
    modulationEnvelope: { attack: 0.2, decay: 0.01, sustain: 1, release: 0.5 }
  }).toDestination();
  fm.volume.value = -6;

  const membrane = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1 }
  }).toDestination();
  membrane.volume.value = -10;

  // ============================================
  // ACTIVER L'AUDIO AU PREMIER CLIC
  // ============================================

  async function activerAudio() {
    if (audioOK) return;
    try {
      await Tone.start();
      audioOK = true;
      console.log("✅ Audio activé!");
    } catch (e) {
      console.log("Erreur audio:", e);
    }
  }

  // Activer au premier clic n'importe où
  document.body.addEventListener("click", activerAudio);
  document.body.addEventListener("touchstart", activerAudio);

  // ============================================
  // SONS
  // ============================================

  // Son de GLITCH (changement de caméra)
  function sonGlitch() {
    if (!audioOK) return;
    noise.triggerAttackRelease("16n");
    setTimeout(() => synth.triggerAttackRelease("C2", "32n"), 20);
    setTimeout(() => synth.triggerAttackRelease("F#2", "32n"), 50);
    setTimeout(() => synth.triggerAttackRelease("A2", "32n"), 80);
    setTimeout(() => metal.triggerAttackRelease("32n"), 100);
  }

  // Son de SONAR (ping radar)
  function sonSonar() {
    if (!audioOK) return;
    fm.triggerAttackRelease("C4", "8n");
    setTimeout(() => {
      fm.volume.value = -12;
      fm.triggerAttackRelease("C4", "16n");
      fm.volume.value = -6;
    }, 300);
  }

  // Son de CLIC
  function sonClic() {
    if (!audioOK) return;
    synth.triggerAttackRelease("G5", "64n");
  }

  // Son de VERROUILLAGE CIBLE
  function sonTarget() {
    if (!audioOK) return;
    fm.triggerAttackRelease("E4", "16n");
    setTimeout(() => fm.triggerAttackRelease("E4", "16n"), 120);
    setTimeout(() => fm.triggerAttackRelease("A4", "8n"), 240);
  }

  // Son de BROUILLEUR
  function sonJammer() {
    if (!audioOK) return;
    noise.triggerAttackRelease("4n");
    metal.triggerAttackRelease("8n");
    setTimeout(() => noise.triggerAttackRelease("8n"), 200);
  }

  // Son de REBOOT
  function sonReboot() {
    if (!audioOK) return;
    membrane.triggerAttackRelease("C2", "4n");
    setTimeout(() => noise.triggerAttackRelease("8n"), 100);
    setTimeout(() => synth.triggerAttackRelease("G3", "8n"), 300);
    setTimeout(() => synth.triggerAttackRelease("C4", "4n"), 500);
  }

  // Son de LEURRE
  function sonLure() {
    if (!audioOK) return;
    ["C4", "E4", "G4", "C5"].forEach((note, i) => {
      setTimeout(() => synth.triggerAttackRelease(note, "16n"), i * 100);
    });
  }

  // Son de SWITCH
  function sonSwitch() {
    if (!audioOK) return;
    synth.triggerAttackRelease("C5", "32n");
    setTimeout(() => synth.triggerAttackRelease("E5", "32n"), 60);
  }

  // Son de DATA
  function sonData() {
    if (!audioOK) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        synth.triggerAttackRelease(i % 2 === 0 ? "C5" : "G5", "64n");
      }, i * 50);
    }
  }

  // ============================================
  // ATTACHER AUX ÉLÉMENTS
  // ============================================

  // Boutons caméra - son de glitch
  document.querySelectorAll(".cam-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activerAudio();
      sonGlitch();
    });
  });

  // Cartes cibles - son de verrouillage
  document.querySelectorAll(".target-card").forEach(card => {
    card.addEventListener("click", () => {
      activerAudio();
      sonTarget();
    });
  });

  // Boutons de filtre vidéo - son de clic
  document.querySelectorAll(".feed-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activerAudio();
      sonClic();
    });
  });

  // Boutons du footer
  document.querySelectorAll(".hud-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activerAudio();
      const action = btn.dataset.action;
      
      if (action === "switch") sonSwitch();
      else if (action === "reboot") sonReboot();
      else if (action === "lure") sonLure();
      else if (action === "jammer") sonJammer();
    });
  });

  // ============================================
  // SONS D'AMBIANCE AUTOMATIQUES
  // ============================================

  // Sonar périodique
  setInterval(() => {
    if (audioOK) sonSonar();
  }, 12000);

  // Data périodique
  setInterval(() => {
    if (audioOK && Math.random() > 0.5) sonData();
  }, 18000);

  // ============================================
  // EXPOSER GLOBALEMENT
  // ============================================

  window.playHudSound = (type) => {
    activerAudio();
    if (type === "glitch") sonGlitch();
    else if (type === "sonar") sonSonar();
    else if (type === "click") sonClic();
    else if (type === "targetLock") sonTarget();
    else if (type === "jammer") sonJammer();
    else if (type === "reboot") sonReboot();
    else if (type === "lure") sonLure();
    else if (type === "switch") sonSwitch();
    else if (type === "data") sonData();
  };

});