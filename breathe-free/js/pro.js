function renderHourlyHeatmap(data) {
  if (!data.isPro) return;
  const stats = hourlyStats(data.smokeEvents);
  const el = document.getElementById("hourlyHeatmap");
  el.innerHTML = "";
  stats.forEach((c, h) => {
    const d = document.createElement("div");
    d.className = "hour";
    d.style.background = c === 0 ? "#3BB6A4" : c < 3 ? "#E9A23B" : "#D64545";
    d.textContent = h;
    el.appendChild(d);
  });
}
