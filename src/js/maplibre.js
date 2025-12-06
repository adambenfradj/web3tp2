document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer || !window.maplibregl) return;

  // Création de la map
  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [15, 25], // centre approximatif du monde
    zoom: 1.7,
    interactive: true
  });

  // Empêcher la rotation 3D
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  // Localisations des 5 caméras
  const cameraLocations = {
    "01": { // Tunisie
      lng: 10.1658,
      lat: 36.81897
    },
    "02": { // Maroc
      lng: -7.5898,
      lat: 33.5731
    },
    "03": { // Afghanistan
      lng: 69.2075,
      lat: 34.5553
    },
    "04": { // Québec (ville de Québec)
      lng: -71.2082,
      lat: 46.8139
    },
    "05": { // Russie (Moscou)
      lng: 37.6173,
      lat: 55.7558
    }
  };

  // Exposer à vfx.js
  window.hudMap = map;
  window.hudCamLocations = cameraLocations;

  // Ajouter un marker vert pour chaque caméra
  Object.entries(cameraLocations).forEach(([id, loc]) => {
    new maplibregl.Marker({
      color: "#00ff6a"
    })
      .setLngLat([loc.lng, loc.lat])
      .setPopup(new maplibregl.Popup({ offset: 12 }).setText(`CMR-${id}`))
      .addTo(map);
  });
});
