document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("zdog-canvas");
  if (!canvas) {
    console.log("Canvas zdog non trouvé");
    return;
  }
  
  if (typeof Zdog === "undefined") {
    console.log("Zdog non chargé");
    return;
  }

  const { Illustration, Anchor, Shape, Ellipse } = Zdog;

  const illo = new Illustration({ 
    element: canvas, 
    dragRotate: true, 
    resize: true 
  });
  
  const logoAnchor = new Anchor({ 
    addTo: illo, 
    scale: 1.3 
  });

  let autoRotate = true;

  
  function clearLogo() { 
    logoAnchor.children.forEach(child => child.remove());
    logoAnchor.children = []; 
  }

  // Tunisie - Croissant et étoile
  function createTunisiaLogo() {
    clearLogo();
    new Ellipse({ addTo: logoAnchor, diameter: 85, stroke: 8, color: "#00ff6a" });
    new Ellipse({ addTo: logoAnchor, diameter: 70, stroke: 2, color: "#6eea8c" });
    new Ellipse({ addTo: logoAnchor, diameter: 40, quarters: 2, stroke: 10, color: "#00ff6a", translate: { x: 8 }, rotate: { z: Math.PI * 0.1 } });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -12 }, { x: 3, y: -4 }, { x: 11, y: -4 }, { x: 5, y: 2 }, { x: 7, y: 10 }, { x: 0, y: 5 }, { x: -7, y: 10 }, { x: -5, y: 2 }, { x: -11, y: -4 }, { x: -3, y: -4 }], closed: true, stroke: 4, fill: true, color: "#6eea8c", translate: { x: -10 } });
  }

  // Maroc - Étoile
  function createMoroccoLogo() {
    clearLogo();
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -42 }, { x: 36, y: -21 }, { x: 36, y: 21 }, { x: 0, y: 42 }, { x: -36, y: 21 }, { x: -36, y: -21 }], closed: true, stroke: 6, color: "#00ff6a" });
    new Ellipse({ addTo: logoAnchor, diameter: 55, stroke: 3, color: "#6eea8c" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -26 }, { x: 6, y: -8 }, { x: 25, y: -8 }, { x: 10, y: 4 }, { x: 15, y: 22 }, { x: 0, y: 11 }, { x: -15, y: 22 }, { x: -10, y: 4 }, { x: -25, y: -8 }, { x: -6, y: -8 }], closed: true, stroke: 5, color: "#00ff6a" });
  }

  // Afghanistan - Réticule
  function createAfghanistanLogo() {
    clearLogo();
    new Ellipse({ addTo: logoAnchor, diameter: 80, stroke: 6, color: "#00ff6a" });
    new Ellipse({ addTo: logoAnchor, diameter: 55, stroke: 3, color: "#6eea8c" });
    new Ellipse({ addTo: logoAnchor, diameter: 25, stroke: 5, color: "#ff2257" });
    new Shape({ addTo: logoAnchor, stroke: 8, color: "#ff2257" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -40 }, { x: 0, y: -18 }], stroke: 4, color: "#00ff6a" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: 18 }, { x: 0, y: 40 }], stroke: 4, color: "#00ff6a" });
    new Shape({ addTo: logoAnchor, path: [{ x: -40, y: 0 }, { x: -18, y: 0 }], stroke: 4, color: "#00ff6a" });
    new Shape({ addTo: logoAnchor, path: [{ x: 18, y: 0 }, { x: 40, y: 0 }], stroke: 4, color: "#00ff6a" });
  }

  // Québec - Feuille d'érable
  function createQuebecLogo() {
    clearLogo();
    new Ellipse({ addTo: logoAnchor, diameter: 80, stroke: 5, color: "#00ff6a" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -30 }, { x: 4, y: -22 }, { x: 12, y: -26 }, { x: 10, y: -16 }, { x: 22, y: -14 }, { x: 16, y: -6 }, { x: 28, y: -2 }, { x: 18, y: 4 }, { x: 22, y: 14 }, { x: 12, y: 10 }, { x: 8, y: 20 }, { x: 2, y: 14 }, { x: 0, y: 22 }, { x: -2, y: 14 }, { x: -8, y: 20 }, { x: -12, y: 10 }, { x: -22, y: 14 }, { x: -18, y: 4 }, { x: -28, y: -2 }, { x: -16, y: -6 }, { x: -22, y: -14 }, { x: -10, y: -16 }, { x: -12, y: -26 }, { x: -4, y: -22 }], closed: true, stroke: 5, color: "#00ff6a" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: 22 }, { x: 0, y: 34 }], stroke: 5, color: "#6eea8c" });
  }

  // Russie - Étoile
  function createRussiaLogo() {
    clearLogo();
    new Ellipse({ addTo: logoAnchor, diameter: 82, stroke: 5, color: "#00ff6a" });
    new Ellipse({ addTo: logoAnchor, diameter: 72, stroke: 2, color: "#6eea8c" });
    new Shape({ addTo: logoAnchor, path: [{ x: 0, y: -28 }, { x: 8, y: -9 }, { x: 27, y: -9 }, { x: 13, y: 4 }, { x: 17, y: 23 }, { x: 0, y: 12 }, { x: -17, y: 23 }, { x: -13, y: 4 }, { x: -27, y: -9 }, { x: -8, y: -9 }], closed: true, stroke: 6, color: "#ff2257" });
  }

  // Sélection du logo selon la caméra
  function setLogoForCamera(camId) {
    switch (camId) {
      case "01": createTunisiaLogo(); break;
      case "02": createMoroccoLogo(); break;
      case "03": createAfghanistanLogo(); break;
      case "04": createQuebecLogo(); break;
      case "05": createRussiaLogo(); break;
      default: createTunisiaLogo();
    }
    illo.updateRenderGraph();
  }

  // Exposer globalement
  window.setHudCountryLogo = setLogoForCamera;

  // Initialiser avec Tunisie
  setLogoForCamera("01");

  // Animation
  function animate() {
    if (autoRotate) {
      logoAnchor.rotate.y += 0.008;
    }
    logoAnchor.rotate.x = Math.sin(Date.now() * 0.001) * 0.1;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }
  animate();

  // Pause rotation au drag
  canvas.addEventListener("mousedown", () => { autoRotate = false; });
  canvas.addEventListener("mouseup", () => { autoRotate = true; });
  canvas.addEventListener("touchstart", () => { autoRotate = false; });
  canvas.addEventListener("touchend", () => { autoRotate = true; });

  console.log("ZDog initialisé");
});