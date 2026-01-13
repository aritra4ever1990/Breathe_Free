function getPhase(day) {
  if (day <= 7) return "Awareness Phase";
  if (day <= 14) return "Reduction Phase";
  if (day <= 21) return "Quit Phase";
  return "Smoke-Free Identity";
}

function dailyLimit(baseline, day) {
  const totalDays = 30;
  const reduction = baseline / totalDays;
  const limit = Math.round(baseline - reduction * (day - 1));
  return Math.max(limit, 0);
}
