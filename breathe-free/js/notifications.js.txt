async function enableNotifications() {
  if (!("Notification" in window)) {
    alert("Notifications not supported");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    data.notificationsEnabled = true;
    saveData(data);

    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification("Breathe Free", {
        body: "Alerts enabled. You've got this 💪",
        icon: "/icon.png"
      });
    });
  }
}

function notifyHighRisk(data) {
  if (!data.notificationsEnabled) return;

  const riskHour = highRiskHour(data);
  const currentHour = new Date().getHours();

  if (riskHour === currentHour) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification("High-Risk Window", {
        body: "This hour is risky. Pause. Breathe. Delay 10 minutes.",
        vibrate: [100, 50, 100]
      });
    });
  }
}
