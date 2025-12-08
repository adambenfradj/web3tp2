document.addEventListener("DOMContentLoaded", () => {
  // Récupérer le conteneur de la carte
  const mapContainer = document.getElementById("map");
  
  // Vérifier si le conteneur et MapLibre sont disponibles
  if (!mapContainer || !window.maplibregl) return;

  // ============================================
  // CRÉATION DE LA CARTE
  // ============================================

  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",  // Style de base
    center: [10.1658, 36.81897],  // Centre initial: Tunis
    zoom: 3,
    interactive: true,
    attributionControl: false  // Masquer l'attribution
  });

  // Désactiver la rotation de la carte
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  // ============================================
  // LOCALISATIONS DES CAMÉRAS
  // ============================================

  const cameraLocations = {
    "01": {
      lng: 10.1658,
      lat: 36.81897,
      name: "TUNIS",
      country: "Tunisie",
      flag: "🇹🇳",
      threat: 75
    },
    "02": {
      lng: -7.5898,
      lat: 33.5731,
      name: "CASABLANCA",
      country: "Maroc",
      flag: "🇲🇦",
      threat: 55
    },
    "03": {
      lng: 69.2075,
      lat: 34.5553,
      name: "KABUL",
      country: "Afghanistan",
      flag: "🇦🇫",
      threat: 95
    },
    "04": {
      lng: -71.2082,
      lat: 46.8139,
      name: "QUÉBEC",
      country: "Canada",
      flag: "🇨🇦",
      threat: 25
    },
    "05": {
      lng: 37.6173,
      lat: 55.7558,
      name: "MOSCOU",
      country: "Russie",
      flag: "🇷🇺",
      threat: 60
    }
  };

  // ============================================
  // CRÉATION DES MARQUEURS PERSONNALISÉS
  // ============================================

  // Fonction pour créer un élément de marqueur
  function createMarkerElement(isActive = false) {
    const el = document.createElement("div");
    el.className = "map-marker" + (isActive ? " active" : "");
    el.innerHTML = `
      <div class="marker-ping"></div>
      <div class="marker-dot"></div>
    `;
    return el;
  }

  // Styles CSS pour les marqueurs (injectés dynamiquement)
  const markerStyles = document.createElement("style");
  markerStyles.textContent = `
    /* Conteneur du marqueur */
    .map-marker {
      position: relative;
      width: 20px;
      height: 20px;
    }
    
    /* Point central du marqueur */
    .marker-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #00ff6a;
      border-radius: 50%;
      box-shadow: 0 0 10px #00ff6a;
    }
    
    /* Cercle de ping animé */
    .marker-ping {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid #00ff6a;
      border-radius: 50%;
      opacity: 0;
      animation: markerPing 2s ease-out infinite;
    }
    
    /* Marqueur actif - plus grand et plus lumineux */
    .map-marker.active .marker-dot {
      width: 12px;
      height: 12px;
      background: #00ff6a;
      box-shadow: 0 0 20px #00ff6a, 0 0 40px rgba(0, 255, 106, 0.5);
    }
    
    .map-marker.active .marker-ping {
      width: 30px;
      height: 30px;
      animation: markerPingActive 1.5s ease-out infinite;
    }
    
    /* Animations de ping */
    @keyframes markerPing {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    @keyframes markerPingActive {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(markerStyles);

  // ============================================
  // STOCKAGE DES MARQUEURS
  // ============================================

  const markers = {};

  // ============================================
  // AJOUT DES MARQUEURS SUR LA CARTE
  // ============================================

  map.on("load", () => {
    // Ajouter un marqueur pour chaque caméra
    Object.entries(cameraLocations).forEach(([id, loc]) => {
      // Créer l'élément du marqueur (premier actif)
      const el = createMarkerElement(id === "01");
      
      // Créer le marqueur MapLibre
      const marker = new maplibregl.Marker({
        element: el,
        anchor: "center"
      })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);

      // Stocker la référence
      markers[id] = { marker, element: el };
    });
  });

  // ============================================
  // MISE À JOUR DES COORDONNÉES AFFICHÉES
  // ============================================

  function updateCoordinates(lng, lat) {
    const coordsEl = document.getElementById("map-coords");
    if (coordsEl) {
      // Formater les coordonnées avec direction
      const latDir = lat >= 0 ? "N" : "S";
      const lngDir = lng >= 0 ? "E" : "W";
      coordsEl.textContent = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
    }
  }

  // ============================================
  // CHANGEMENT DE MARQUEUR ACTIF
  // ============================================

  function setActiveMarker(camId) {
    Object.entries(markers).forEach(([id, { element }]) => {
      if (id === camId) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }

  // ============================================
  // EXPOSER LES FONCTIONS GLOBALEMENT
  // ============================================

  // Carte accessible depuis d'autres scripts
  window.hudMap = map;
  
  // Localisations des caméras
  window.hudCamLocations = cameraLocations;
  
  // Fonction pour changer le marqueur actif
  window.setActiveMarker = setActiveMarker;
  
  // Fonction pour mettre à jour les coordonnées
  window.updateMapCoordinates = updateCoordinates;

  // ============================================
  // INITIALISATION
  // ============================================

  // Afficher les coordonnées initiales (Tunis)
  updateCoordinates(10.1658, 36.81897);
});