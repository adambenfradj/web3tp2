document.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById("activityChart");
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15"],
      datasets: [
        {
          label: "Activity",
          data: [10, 18, 9, 22, 30, 18],
          fill: true,
          tension: 0.4,
          borderColor: "#00ff6a",
          backgroundColor: "rgba(0, 255, 106, 0.16)",
          pointRadius: 2,
          pointBackgroundColor: "#e5ffe9",
          pointBorderWidth: 0
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: "#6eea8c", font: { size: 9 } },
          grid: { display: false }
        },
        y: {
          min: 0,
          max: 32,
          ticks: { color: "#6eea8c", font: { size: 9 } },
          grid: { color: "#0f1a15" }
        }
      }
    }
  });
});
