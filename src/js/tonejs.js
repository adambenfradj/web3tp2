document.addEventListener("DOMContentLoaded", () => {
  if (!window.Tone) return;

  const synth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.2, release: 0.2 }
  }).toDestination();

  async function playSound(type) {
    await Tone.start();
    if (type === "switch") {
      synth.triggerAttackRelease("A4", "16n");
    } else if (type === "reboot") {
      synth.triggerAttackRelease("F3", "8n");
    } else if (type === "lure") {
      synth.triggerAttackRelease("C5", "8n");
    } else if (type === "jammer") {
      synth.triggerAttackRelease("D#4", "4n");
    }
  }

  document.querySelectorAll(".hud-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.sound;
      playSound(type);

      anime({
        targets: btn,
        scale: [1, 1.05, 1],
        duration: 160,
        easing: "easeOutQuad"
      });
    });
  });
});
