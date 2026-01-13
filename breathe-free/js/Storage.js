function defaultData() {
  return {
    day: 1,
    smokedToday: 0,
    smokeEvents: [],
    passedCravings: 0,
    streak: 0,
    lastStreakDate: null
  };
}

function loadData() {
  return JSON.parse(localStorage.getItem("quitData")) || defaultData();
}

function saveData(data) {
  localStorage.setItem("quitData", JSON.stringify(data));
}
