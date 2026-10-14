const battery = new BatteryMonitor(50);

const percentObserver = new PercentDisplayObserver();
const iconObserver = new IconDisplayObserver();
const statusObserver = new StatusMessageObserver();

battery.attach(percentObserver);
battery.attach(iconObserver);
battery.attach(statusObserver);

battery.notify();

document.getElementById('charge-btn').addEventListener('click', () => battery.charge(10));
document.getElementById('use-btn').addEventListener('click', () => battery.use(10));
