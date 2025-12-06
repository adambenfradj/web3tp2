document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: [".hud-header", ".hud-left", ".hud-center", ".hud-right", ".hud-footer"],
    opacity: [0, 1],
    translateY: [-20, 0],
    delay: anime.stagger(120),
    duration: 900,
    easing: "easeOutQuad"
  });
});
