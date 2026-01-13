let data = loadData();
let cravingInterval;
let cravingSeconds = 300;

/* ---------- Date & Time ---------- */
function renderDateTime() {
  const now = new Date();
  currentDate.innerText = now.toDateString();
  currentTime.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(renderDateTime, 60000);

/* ---------- Smoke Logging ---------- */
function logSmoke() {
  data.smokedToday++;
  data.smokeEvents.push({ timestamp: new Date().toISOString() });
  saveData(data);
  vibrate();
  render();
}

/* ---------- Craving Timer ---------- */
function startCraving() {
  cravingSeconds = 300;
  aiTool.innerText = getCravingTool();

  cravingInterval = setInterval(() => {
    cravingSeconds--;
    updateTimer();

    if (cravingSeconds <= 0) {
      clearInterval(cravingInterval);
      data.passedCravings++;
      saveData(data);
      vibrate();
      render();
    }
  }, 1000);
}

function stopCraving() {
  clearInterval(cravingInterval);
  cravingSeconds = 300;
  updateTimer();
}

function updateTimer() {
  timerDisplay.innerText =
    `0${Math.floor(cravingSeconds / 60)}:${String(cravingSeconds % 60).padStart(2,"0")}`;
}

/* ---------- AI Tools ---------- */
function getCravingTool() {
  const tools = [
    "Drink a full glass of water slowly",
    "Delay 10 minutes – cravings peak then fade",
    "Cold water on face",
    "5 deep breaths: in 4s, out 6s",
    "Walk for 2 minutes",
    "Chew cloves or fennel seeds"
  ];
  return tools[Math.floor(Math.random() * tools.length)];
}

/* ---------- AI Reflection ---------- */
function renderReflection() {
  aiReflection.innerText =
    `🧠 Today you avoided ${data.passedCravings} cravings. Your brain is rewiring.`;
}

/* ---------- Streak ---------- */
function updateStreak() {
  const today = new Date().toDateString();
  if (data.lastStreakDate === today) return;

  if (data.smokedToday <= 15) data.streak++;
  else data.streak = 0;

  data.lastStreakDate = today;
  saveData(data);
}

/* ---------- Danger Zone Clock ---------- */
function renderIntensityClock() {
  const ctx = intensityClock.getContext("2d");
  ctx.clearRect(0,0,240,240);

  const hours = new Array(24).fill(0);
  data.smokeEvents.forEach(e => hours[new Date(e.timestamp).getHours()]++);

  const max = Math.max(...hours,1);
  hours.forEach((c,h)=>{
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,80,80,${c/max})`;
    ctx.lineWidth = 12;
    ctx.arc(120,120,100,(h/24)*Math.PI*2,((h+1)/24)*Math.PI*2);
    ctx.stroke();
  });
}

/* ---------- Haptic ---------- */
function vibrate() {
  if (navigator.vibrate) navigator.vibrate(50);
}

/* ---------- Render ---------- */
function render() {
  renderDateTime();
  updateStreak();
  streakCount.innerText = data.streak;
  renderIntensityClock();
  renderReflection();
}

render();
