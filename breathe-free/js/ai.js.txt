function hourlyStats(events, day) {
  const hours = Array(24).fill(0);
  events
    .filter(e => e.day === day)
    .forEach(e => hours[e.hour]++);
  return hours;
}

function highRiskHour(data) {
  const stats = hourlyStats(data.smokeEvents, data.day);
  const max = Math.max(...stats);
  if (max === 0) return null;
  return stats.indexOf(max);
}

function generateInsights(data) {
  const insights = [];

  const riskHour = highRiskHour(data);
  if (riskHour !== null) {
    insights.push(`⏰ High-risk hour: ${riskHour}:00`);
  }

  const last = data.history[data.history.length - 1];
  if (last && data.smokedToday < last.count) {
    insights.push("📉 Better than yesterday");
  }

  return insights;
}

function dailySummary(data) {
  if (data.smokedToday === 0) return "🔥 Smoke-free day";
  if (data.smokedToday <= 2) return "⚠️ Minor slips";
  return "🚨 Tough day — reset tomorrow";
}
