document.addEventListener("DOMContentLoaded", () => {
  if (typeof Tone === "undefined") {
    console.log("Tone.js non chargé");
    return;
  }

  let audioOK = false;

  // Synthétiseurs
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
    envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 }
  }).toDestination();
  fm.volume.value = -6;

  const membrane = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1 }
  }).toDestination();
  membrane.volume.value = -10;

  // Activer audio au premier clic
  async function activerAudio() {
    if (audioOK) return;
    try {
      await Tone.start();
      audioOK = true;
      console.log("🔊 Audio Tone.js activé");
    } catch (e) {
      console.log("Erreur audio:", e);
    }
  }

  // Écouter les clics pour activer l'audio
  document.body.addEventListener("click", activerAudio);
  document.body.addEventListener("touchstart", activerAudio);

  // GLITCH - Changement de caméra
  function sonGlitch() {
    if (!audioOK) return;
    noise.triggerAttackRelease("16n");
    setTimeout(() => synth.triggerAttackRelease("C2", "32n"), 20);
    setTimeout(() => synth.triggerAttackRelease("F#2", "32n"), 50);
    setTimeout(() => synth.triggerAttackRelease("A2", "32n"), 80);
    setTimeout(() => metal.triggerAttackRelease("32n"), 100);
  }

  // SONAR - Ping radar
  function sonSonar() {
    if (!audioOK) return;
    fm.triggerAttackRelease("C4", "8n");
    setTimeout(() => {
      fm.volume.value = -12;
      fm.triggerAttackRelease("C4", "16n");
      setTimeout(() => { fm.volume.value = -6; }, 200);
    }, 300);
  }

  // CLICK - Boutons filtre
  function sonClick() {
    if (!audioOK) return;
    synth.triggerAttackRelease("G5", "64n");
  }

  // TARGET LOCK - Clic sur cible
  function sonTargetLock() {
    if (!audioOK) return;
    fm.triggerAttackRelease("E4", "16n");
    setTimeout(() => fm.triggerAttackRelease("E4", "16n"), 120);
    setTimeout(() => fm.triggerAttackRelease("A4", "8n"), 240);
  }

  // SWITCH - Bouton changer caméra
  function sonSwitch() {
    if (!audioOK) return;
    synth.triggerAttackRelease("C5", "32n");
    setTimeout(() => synth.triggerAttackRelease("E5", "32n"), 60);
  }

  // REBOOT - Bouton redémarrer
  function sonReboot() {
    if (!audioOK) return;
    membrane.triggerAttackRelease("C2", "4n");
    setTimeout(() => noise.triggerAttackRelease("8n"), 100);
    setTimeout(() => synth.triggerAttackRelease("G3", "8n"), 300);
    setTimeout(() => synth.triggerAttackRelease("C4", "4n"), 500);
  }

  // LURE - Bouton leurre audio
  function sonLure() {
    if (!audioOK) return;
    const notes = ["C4", "E4", "G4", "C5"];
    notes.forEach((note, i) => {
      setTimeout(() => synth.triggerAttackRelease(note, "16n"), i * 100);
    });
  }

  // JAMMER - Bouton brouilleur
  function sonJammer() {
    if (!audioOK) return;
    noise.triggerAttackRelease("4n");
    metal.triggerAttackRelease("8n");
    setTimeout(() => noise.triggerAttackRelease("8n"), 200);
  }

  // Sonar automatique toutes les 12 secondes
  setInterval(() => {
    if (audioOK) sonSonar();
  }, 12000);

  // Exposer globalement
  window.playHudSound = (type) => {
    switch (type) {
      case "glitch": sonGlitch(); break;
      case "sonar": sonSonar(); break;
      case "click": sonClick(); break;
      case "targetLock": sonTargetLock(); break;
      case "switch": sonSwitch(); break;
      case "reboot": sonReboot(); break;
      case "lure": sonLure(); break;
      case "jammer": sonJammer(); break;
      default: console.log("Son inconnu:", type);
    }
  };

  console.log("Tone.js initialisé - Clique pour activer les sons");
});