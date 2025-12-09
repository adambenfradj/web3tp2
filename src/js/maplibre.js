// Carte avec MapLibre
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer || !window.maplibregl) return;

  // Créer la carte
  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [10.1658, 36.81897],
    zoom: 3,
    interactive: true,
    attributionControl: false
  });

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  // Localisations
  const cameraLocations = {
    "01": { lng: 10.1658, lat: 36.81897, name: "TUNIS", country: "Tunisie", flag: "🇹🇳" },
    "02": { lng: -7.5898, lat: 33.5731, name: "CASABLANCA", country: "Maroc", flag: "🇲🇦" },
    "03": { lng: 69.2075, lat: 34.5553, name: "KABUL", country: "Afghanistan", flag: "🇦🇫" },
    "04": { lng: -71.2082, lat: 46.8139, name: "QUÉBEC", country: "Canada", flag: "🇨🇦" },
    "05": { lng: 37.6173, lat: 55.7558, name: "MOSCOU", country: "Russie", flag: "🇷🇺" }
  };

  // Styles marqueurs
  const markerStyles = document.createElement("style");
  markerStyles.textContent = `
    .map-marker { position: relative; width: 20px; height: 20px; }
    .marker-dot { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: #00ff6a; border-radius: 50%; box-shadow: 0 0 10px #00ff6a; }
    .marker-ping { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border: 2px solid #00ff6a; border-radius: 50%; opacity: 0; animation: markerPing 2s ease-out infinite; }
    .map-marker.active .marker-dot { width: 12px; height: 12px; box-shadow: 0 0 20px #00ff6a, 0 0 40px rgba(0, 255, 106, 0.5); }
    .map-marker.active .marker-ping { width: 30px; height: 30px; animation: markerPingActive 1.5s ease-out infinite; }
    @keyframes markerPing { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; } 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } }
    @keyframes markerPingActive { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; } }
  `;
  document.head.appendChild(markerStyles);

  const markers = {};

  // Ajouter marqueurs
  map.on("load", () => {
    Object.entries(cameraLocations).forEach(([id, loc]) => {
      const el = document.createElement("div");
      el.className = "map-marker" + (id === "01" ? " active" : "");
      el.innerHTML = `<div class="marker-ping"></div><div class="marker-dot"></div>`;

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);

      markers[id] = { marker, element: el };
    });
  });

  // Mise à jour coordonnées
  function updateCoordinates(lng, lat) {
    const el = document.getElementById("map-coords");
    if (el) {
      const latDir = lat >= 0 ? "N" : "S";
      const lngDir = lng >= 0 ? "E" : "W";
      el.textContent = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
    }
  }

  // Changer marqueur actif
  function setActiveMarker(camId) {
    Object.entries(markers).forEach(([id, { element }]) => {
      element.classList.toggle("active", id === camId);
    });
  }

  // Exposer globalement
  window.hudMap = map;
  window.hudCamLocations = cameraLocations;
  window.setActiveMarker = setActiveMarker;
  window.updateMapCoordinates = updateCoordinates;

  updateCoordinates(10.1658, 36.81897);
});