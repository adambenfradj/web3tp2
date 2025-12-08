document.addEventListener("DOMContentLoaded", () => {
  // Récupérer le canvas du graphique
  const chartCanvas = document.getElementById("activityChart");
  
  // Vérifier si le canvas et Chart.js sont disponibles
  if (!chartCanvas || !window.Chart) return;

  const ctx = chartCanvas.getContext("2d");

  // ============================================
  // DONNÉES INITIALES
  // ============================================

  // Points de données de départ
  let dataPoints = [10, 18, 9, 22, 30, 18, 25, 15, 28, 20];
  
  // Générer les labels de temps (10 derniers points)
  let labels = [];
  const now = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15000);  // Toutes les 15 secondes
    labels.push(time.toLocaleTimeString("fr-CA", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit" 
    }));
  }

  // ============================================
  // CRÉATION DU DÉGRADÉ DE FOND
  // ============================================

  const gradient = ctx.createLinearGradient(0, 0, 0, 120);
  gradient.addColorStop(0, "rgba(0, 255, 106, 0.3)");   // Vert en haut
  gradient.addColorStop(1, "rgba(0, 255, 106, 0.02)"); // Transparent en bas

  // ============================================
  // CONFIGURATION DU GRAPHIQUE
  // ============================================

  const chart = new Chart(ctx, {
    type: "line",  // Type de graphique: ligne
    data: {
      labels: labels,
      datasets: [
        {
          label: "Activité",
          data: dataPoints,
          fill: true,               // Remplir sous la courbe
          tension: 0.4,             // Courbe lissée
          borderColor: "#00ff6a",   // Couleur de la ligne
          borderWidth: 2,
          backgroundColor: gradient, // Dégradé de fond
          pointRadius: 0,           // Pas de points visibles
          pointHoverRadius: 4,      // Points au survol
          pointHoverBackgroundColor: "#00ff6a",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      
      // Animation rapide
      animation: {
        duration: 500,
        easing: "easeOutQuad"
      },
      
      // Mode d'interaction
      interaction: {
        intersect: false,
        mode: "index"
      },
      
      // Configuration des plugins
      plugins: {
        legend: { display: false },  // Pas de légende
        
        // Tooltip personnalisé
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#6eea8c",
          bodyColor: "#00ff6a",
          borderColor: "#00ff6a",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return "Activité: " + context.parsed.y + "%";
            }
          }
        }
      },
      
      // Configuration des axes
      scales: {
        // Axe X (temps)
        x: {
          display: true,
          ticks: { 
            color: "#6eea8c", 
            font: { size: 7, family: "Share Tech Mono" },
            maxRotation: 0
          },
          grid: { display: false },
          border: { color: "rgba(0, 255, 106, 0.2)" }
        },
        
        // Axe Y (pourcentage)
        y: {
          min: 0,
          max: 40,
          ticks: { 
            color: "#6eea8c", 
            font: { size: 7, family: "Share Tech Mono" },
            stepSize: 10
          },
          grid: { 
            color: "rgba(0, 255, 106, 0.1)",
            lineWidth: 1
          },
          border: { color: "rgba(0, 255, 106, 0.2)" }
        }
      }
    }
  });

  // ============================================
  // MISE À JOUR EN TEMPS RÉEL
  // ============================================

  function updateChart() {
    const now = new Date();
    const newTime = now.toLocaleTimeString("fr-CA", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit" 
    });
    
    // Générer une nouvelle valeur basée sur la dernière
    const lastValue = dataPoints[dataPoints.length - 1];
    let newValue = lastValue + (Math.random() - 0.5) * 10;
    
    // Limiter entre 5 et 35
    newValue = Math.max(5, Math.min(35, newValue));

    // Retirer le premier élément et ajouter le nouveau
    labels.shift();
    labels.push(newTime);
    
    dataPoints.shift();
    dataPoints.push(Math.round(newValue));

    // Mettre à jour le graphique
    chart.data.labels = labels;
    chart.data.datasets[0].data = dataPoints;
    chart.update("none");  // Mise à jour sans animation
  }

  // Mettre à jour toutes les 3 secondes
  setInterval(updateChart, 3000);

  // ============================================
  // EXPOSER LE GRAPHIQUE GLOBALEMENT
  // ============================================

  // Permet aux autres scripts d'accéder au graphique
  window.hudActivityChart = chart;

  // Fonction pour simuler un pic d'activité
  window.triggerActivitySpike = () => {
    // Ajouter un pic soudain
    const spikeValue = 35 + Math.random() * 5;
    dataPoints[dataPoints.length - 1] = Math.round(spikeValue);
    chart.data.datasets[0].data = dataPoints;
    chart.update();
  };
});