document.addEventListener("DOMContentLoaded", () => {
  // Récupérer le canvas
  const canvas = document.getElementById("zdog-canvas");
  
  // Vérifier si le canvas et Zdog sont disponibles
  if (!canvas || !window.Zdog) return;

  // Extraire les composants Zdog
  const { Illustration, Anchor, Shape, Ellipse } = Zdog;

  // ============================================
  // CRÉATION DE L'ILLUSTRATION
  // ============================================

  const illo = new Illustration({
    element: canvas,
    dragRotate: true,  // Permettre la rotation par glissement
    resize: true       // Adapter à la taille
  });

  // Point d'ancrage principal pour le logo
  const logoAnchor = new Anchor({
    addTo: illo,
    translate: { y: 0 },
    scale: 1
  });

  // Variables d'animation
  let logoScale = 1.3;
  let targetScale = 1.3;
  let autoRotate = true;

  // ============================================
  // FONCTION DE NETTOYAGE
  // ============================================

  // Vider les enfants du logo
  function clearLogo() {
    logoAnchor.children = [];
  }

  // ============================================
  // LOGO TUNISIE - Croissant et Étoile
  // ============================================

  function createTunisiaLogo() {
    clearLogo();

    // Anneau extérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 85,
      stroke: 8,
      color: "#00ff6a"
    });

    // Anneau décoratif intérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 70,
      stroke: 2,
      color: "#6eea8c"
    });

    // Croissant de lune
    new Ellipse({
      addTo: logoAnchor,
      diameter: 40,
      quarters: 2,  // Demi-cercle
      stroke: 10,
      color: "#00ff6a",
      translate: { x: 8 },
      rotate: { z: Math.PI * 0.1 }
    });

    // Étoile à 5 branches
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -12 },
        { x: 3, y: -4 },
        { x: 11, y: -4 },
        { x: 5, y: 2 },
        { x: 7, y: 10 },
        { x: 0, y: 5 },
        { x: -7, y: 10 },
        { x: -5, y: 2 },
        { x: -11, y: -4 },
        { x: -3, y: -4 }
      ],
      closed: true,
      stroke: 4,
      fill: true,
      color: "#6eea8c",
      translate: { x: -10, y: 0 }
    });
  }

  // ============================================
  // LOGO MAROC - Étoile dans un Cercle
  // ============================================

  function createMoroccoLogo() {
    clearLogo();

    // Cadre hexagonal extérieur
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -42 },
        { x: 36, y: -21 },
        { x: 36, y: 21 },
        { x: 0, y: 42 },
        { x: -36, y: 21 },
        { x: -36, y: -21 }
      ],
      closed: true,
      stroke: 6,
      color: "#00ff6a"
    });

    // Cercle intérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 55,
      stroke: 3,
      color: "#6eea8c"
    });

    // Étoile à 5 branches (pentagramme)
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -26 },
        { x: 6, y: -8 },
        { x: 25, y: -8 },
        { x: 10, y: 4 },
        { x: 15, y: 22 },
        { x: 0, y: 11 },
        { x: -15, y: 22 },
        { x: -10, y: 4 },
        { x: -25, y: -8 },
        { x: -6, y: -8 }
      ],
      closed: true,
      stroke: 5,
      color: "#00ff6a"
    });
  }

  // ============================================
  // LOGO AFGHANISTAN - Réticule Militaire
  // ============================================

  function createAfghanistanLogo() {
    clearLogo();

    // Anneau de ciblage extérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 80,
      stroke: 6,
      color: "#00ff6a"
    });

    // Anneau central
    new Ellipse({
      addTo: logoAnchor,
      diameter: 55,
      stroke: 3,
      color: "#6eea8c"
    });

    // Cible intérieure (rouge danger)
    new Ellipse({
      addTo: logoAnchor,
      diameter: 25,
      stroke: 5,
      color: "#ff2257"
    });

    // Point central
    new Shape({
      addTo: logoAnchor,
      stroke: 8,
      color: "#ff2257"
    });

    // Propriétés des lignes du réticule
    const lineProps = {
      stroke: 4,
      color: "#00ff6a"
    };

    // Ligne du haut
    new Shape({
      addTo: logoAnchor,
      path: [{ x: 0, y: -40 }, { x: 0, y: -18 }],
      ...lineProps
    });

    // Ligne du bas
    new Shape({
      addTo: logoAnchor,
      path: [{ x: 0, y: 18 }, { x: 0, y: 40 }],
      ...lineProps
    });

    // Ligne de gauche
    new Shape({
      addTo: logoAnchor,
      path: [{ x: -40, y: 0 }, { x: -18, y: 0 }],
      ...lineProps
    });

    // Ligne de droite
    new Shape({
      addTo: logoAnchor,
      path: [{ x: 18, y: 0 }, { x: 40, y: 0 }],
      ...lineProps
    });

    // Marques aux coins
    const corners = [
      { x: -28, y: -28 },
      { x: 28, y: -28 },
      { x: -28, y: 28 },
      { x: 28, y: 28 }
    ];

    corners.forEach(c => {
      new Shape({
        addTo: logoAnchor,
        stroke: 3,
        color: "#6eea8c",
        translate: c
      });
    });
  }

  // ============================================
  // LOGO QUÉBEC/CANADA - Feuille d'Érable
  // ============================================

  function createQuebecLogo() {
    clearLogo();

    // Cercle extérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 80,
      stroke: 5,
      color: "#00ff6a"
    });

    // Feuille d'érable stylisée
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -30 },
        { x: 4, y: -22 },
        { x: 12, y: -26 },
        { x: 10, y: -16 },
        { x: 22, y: -14 },
        { x: 16, y: -6 },
        { x: 28, y: -2 },
        { x: 18, y: 4 },
        { x: 22, y: 14 },
        { x: 12, y: 10 },
        { x: 8, y: 20 },
        { x: 2, y: 14 },
        { x: 0, y: 22 },
        { x: -2, y: 14 },
        { x: -8, y: 20 },
        { x: -12, y: 10 },
        { x: -22, y: 14 },
        { x: -18, y: 4 },
        { x: -28, y: -2 },
        { x: -16, y: -6 },
        { x: -22, y: -14 },
        { x: -10, y: -16 },
        { x: -12, y: -26 },
        { x: -4, y: -22 }
      ],
      closed: true,
      stroke: 5,
      color: "#00ff6a",
      fill: false
    });

    // Tige de la feuille
    new Shape({
      addTo: logoAnchor,
      path: [{ x: 0, y: 22 }, { x: 0, y: 34 }],
      stroke: 5,
      color: "#6eea8c"
    });

    // Touches de fleur de lys (Québec)
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -38 },
        { x: -4, y: -44 },
        { x: 0, y: -42 },
        { x: 4, y: -44 }
      ],
      closed: false,
      stroke: 3,
      color: "#6eea8c"
    });
  }

  // ============================================
  // LOGO RUSSIE - Étoile avec Cercle
  // ============================================

  function createRussiaLogo() {
    clearLogo();

    // Double anneau extérieur
    new Ellipse({
      addTo: logoAnchor,
      diameter: 82,
      stroke: 5,
      color: "#00ff6a"
    });

    new Ellipse({
      addTo: logoAnchor,
      diameter: 72,
      stroke: 2,
      color: "#6eea8c"
    });

    // Étoile style soviétique
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -28 },
        { x: 8, y: -9 },
        { x: 27, y: -9 },
        { x: 13, y: 4 },
        { x: 17, y: 23 },
        { x: 0, y: 12 },
        { x: -17, y: 23 },
        { x: -13, y: 4 },
        { x: -27, y: -9 },
        { x: -8, y: -9 }
      ],
      closed: true,
      stroke: 6,
      color: "#ff2257"
    });

    // Contour intérieur de l'étoile
    new Shape({
      addTo: logoAnchor,
      path: [
        { x: 0, y: -18 },
        { x: 5, y: -6 },
        { x: 17, y: -6 },
        { x: 8, y: 2 },
        { x: 11, y: 14 },
        { x: 0, y: 8 },
        { x: -11, y: 14 },
        { x: -8, y: 2 },
        { x: -17, y: -6 },
        { x: -5, y: -6 }
      ],
      closed: true,
      stroke: 2,
      color: "#00ff6a"
    });

    // Lignes décoratives autour
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const x1 = Math.cos(angle) * 38;
      const y1 = Math.sin(angle) * 38;
      const x2 = Math.cos(angle) * 34;
      const y2 = Math.sin(angle) * 34;

      new Shape({
        addTo: logoAnchor,
        path: [{ x: x1, y: y1 }, { x: x2, y: y2 }],
        stroke: 2,
        color: "#6eea8c"
      });
    }
  }

  // ============================================
  // SÉLECTION DU LOGO SELON LA CAMÉRA
  // ============================================

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

    // Animation de pop
    logoScale = 0.3;
    targetScale = 1.3;
    
    // Rotation éclair lors du changement
    if (window.anime) {
      anime({
        targets: logoAnchor.rotate,
        y: [logoAnchor.rotate.y, logoAnchor.rotate.y + Math.PI * 2],
        duration: 800,
        easing: "easeOutQuad"
      });
    }

    illo.updateRenderGraph();
  }

  // ============================================
  // EXPOSER LA FONCTION GLOBALEMENT
  // ============================================

  window.setHudCountryLogo = setLogoForCamera;

  // ============================================
  // INITIALISATION
  // ============================================

  setLogoForCamera("01");

  // ============================================
  // BOUCLE D'ANIMATION
  // ============================================

  function animate() {
    // Transition douce vers l'échelle cible
    logoScale += (targetScale - logoScale) * 0.12;
    logoAnchor.scale = logoScale;

    // Rotation continue automatique
    if (autoRotate) {
      logoAnchor.rotate.y += 0.008;
    }

    // Légère oscillation
    logoAnchor.rotate.x = Math.sin(Date.now() * 0.001) * 0.1;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();

  // ============================================
  // CONTRÔLE PAR INTERACTION
  // ============================================

  // Pause de la rotation automatique lors du glissement
  canvas.addEventListener("mousedown", () => { autoRotate = false; });
  canvas.addEventListener("mouseup", () => { autoRotate = true; });
  canvas.addEventListener("touchstart", () => { autoRotate = false; });
  canvas.addEventListener("touchend", () => { autoRotate = true; });
});