class BatteryMonitor {
    constructor(startLevel) {
        this.level = startLevel;
        this.observers = [];
    }

    attach(observer) {
        if (this.observers.includes(observer)) {
            return console.log('Subject: Observer has been attached already.');
        }
        this.observers.push(observer);
        console.log('Subject: Attached an observer.');
    }

    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            return console.log('Subject: Non existent observer.');
        }
        this.observers.splice(index, 1);
        console.log('Subject: Detached an observer.');
    }

    notify() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    charge(amount) {
        this.level = Math.min(100, this.level + amount);
        this.notify();
    }

    use(amount) {
        this.level = Math.max(0, this.level - amount);
        this.notify();
    }
}