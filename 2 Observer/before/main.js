const battery = new BatteryMonitor(50);

// 초기 화면 상태
updatePercentDisplay(battery.level);
updateIconDisplay(battery.level);
updateStatusMessage(battery.level);

document.getElementById('charge-btn').addEventListener('click', () => battery.charge(10));
document.getElementById('use-btn').addEventListener('click', () => battery.use(10));
