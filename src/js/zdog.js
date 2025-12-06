document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("zdog-canvas");
  if (!canvas || !window.Zdog) return;

  const { Illustration, Anchor, Shape, Ellipse } = Zdog;

  const illo = new Illustration({
    element: canvas,
    dragRotate: true,
    resize: "fit"
  });

  // Anchor principal du logo
  const logoAnchor = new Anchor({
    addTo: illo,
    translate: { y: 4 },   // légèrement vers le bas pour éviter le clipping haut/bas
    scale: 1
  });

  let logoScale = 1.3;      // scale actuel
  let targetScale = 1.3;    // scale vers lequel on anime

  function clearLogo() {
    logoAnchor.children = [];
  }

  // ================== LOGOS SIMPLES PAR PAYS ==================

  function createTunisiaLogo() {
    clearLogo();

    // disque principal
    new Ellipse({
      addTo: logoAnchor,
      diameter: 90,
      stroke: 10,
      color: "#00ff6a"
    });

    // croissant simple
    new Ellipse({
      addTo: logoAnchor,
      diameter: 46,
      quarters: 2,
      stroke: 8,
      color: "#00ff6a",
      translate: { x: 7 }
    });

    // petite étoile
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0,  y: -10 },
        { x: 4,  y: 0 },
        { x: 12, y: 0 },
        { x: 5,  y: 6 },
        { x: 8,  y: 15 },
        { x: 0,  y: 9 },
        { x: -8, y: 15 },
        { x: -5, y: 6 },
        { x: -12,y: 0 },
        { x: -4, y: 0 }
      ],
      closed: true,
      stroke: 3,
      color: "#6eea8c",
      translate: { x: -12, y: 0 }
    });
  }

  // 02 – Maroc : étoile simple dans un cercle
  function createMoroccoLogo() {
    clearLogo();

    // cercle
    new Ellipse({
      addTo: logoAnchor,
      diameter: 80,
      stroke: 6,
      color: "#00ff6a"
    });

    // étoile
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0,   y: -24 },
        { x: 7,   y: -4 },
        { x: 24,  y: -4 },
        { x: 9,   y: 6 },
        { x: 14,  y: 22 },
        { x: 0,   y: 10 },
        { x: -14, y: 22 },
        { x: -9,  y: 6 },
        { x: -24, y: -4 },
        { x: -7,  y: -4 }
      ],
      closed: true,
      stroke: 7,
      color: "#6eea8c"
    });
  }

  // 03 – Afghanistan : viseur / crosshair (cible)
  function createAfghanistanLogo() {
    clearLogo();

    // cercle externe
    new Ellipse({
      addTo: logoAnchor,
      diameter: 80,
      stroke: 7,
      color: "#00ff6a"
    });

    // cercle interne
    new Ellipse({
      addTo: logoAnchor,
      diameter: 32,
      stroke: 6,
      color: "#6eea8c"
    });

    // ligne verticale
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -40 },
        { x: 0, y: -26 }
      ],
      closed: false,
      stroke: 5,
      color: "#00ff6a"
    });

    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: 26 },
        { x: 0, y: 40 }
      ],
      closed: false,
      stroke: 5,
      color: "#00ff6a"
    });

    // ligne horizontale
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: -40, y: 0 },
        { x: -26, y: 0 }
      ],
      closed: false,
      stroke: 5,
      color: "#00ff6a"
    });

    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 26, y: 0 },
        { x: 40, y: 0 }
      ],
      closed: false,
      stroke: 5,
      color: "#00ff6a"
    });
  }

  // 04 – Québec / Canada : feuille d’érable simplifiée
  function createQuebecLogo() {
    clearLogo();

    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0,   y: -26 },
        { x: 6,   y: -14 },
        { x: 14,  y: -18 },
        { x: 12,  y: -6 },
        { x: 24,  y: -2 },
        { x: 14,  y: 4 },
        { x: 18,  y: 14 },
        { x: 8,   y: 10 },
        { x: 0,   y: 20 },
        { x: -8,  y: 10 },
        { x: -18, y: 14 },
        { x: -14, y: 4 },
        { x: -24, y: -2 },
        { x: -12, y: -6 },
        { x: -14, y: -18 },
        { x: -6,  y: -14 }
      ],
      closed: true,
      stroke: 7,
      color: "#00ff6a"
    });

    // tige
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: 20 },
        { x: 0, y: 32 }
      ],
      closed: false,
      stroke: 6,
      color: "#6eea8c"
    });
  }

  // 05 – Russie : cercle + étoile
  function createRussiaLogo() {
    clearLogo();

    new Ellipse({
      addTo: logoAnchor,
      diameter: 80,
      stroke: 6,
      color: "#00ff6a"
    });

    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0,   y: -24 },
        { x: 7,   y: -4 },
        { x: 24,  y: -4 },
        { x: 9,   y: 6 },
        { x: 14,  y: 22 },
        { x: 0,   y: 10 },
        { x: -14, y: 22 },
        { x: -9,  y: 6 },
        { x: -24, y: -4 },
        { x: -7,  y: -4 }
      ],
      closed: true,
      stroke: 7,
      color: "#6eea8c"
    });
  }

  // ================== SWITCH PAR CAMÉRA ==================

  function setLogoForCamera(camId) {
    switch (camId) {
      case "01":
        createTunisiaLogo();
        break;
      case "02":
        createMoroccoLogo();
        break;
      case "03":
        createAfghanistanLogo();
        break;
      case "04":
        createQuebecLogo();
        break;
      case "05":
        createRussiaLogo();
        break;
      default:
        createTunisiaLogo();
        break;
    }

    // petite transition : on repart petit et on “pop” vers la taille normale
    logoScale = 0.4;
    targetScale = 1.3;
    illo.updateRenderGraph();
  }

  // exposé pour vfx.js
  window.setHudCountryLogo = setLogoForCamera;

  // logo au démarrage
  setLogoForCamera("01");

  // ================== ANIMATION GLOBALE ==================

  function animate() {
    // easing vers la taille cible
    logoScale += (targetScale - logoScale) * 0.15;
    logoAnchor.scale = logoScale;

    // rotation légère en continu
    logoAnchor.rotate.y += 0.01;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();
});
