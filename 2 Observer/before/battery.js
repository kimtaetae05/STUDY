class BatteryMonitor {
  constructor(startLevel) {
    this.level = startLevel;
  }

  charge(amount) {
    this.level = Math.min(100, this.level + amount);

    updatePercentDisplay(this.level);
    updateIconDisplay(this.level);
    updateStatusMessage(this.level);
  }

  use(amount) {
    this.level = Math.max(0, this.level - amount);

    updatePercentDisplay(this.level);
    updateIconDisplay(this.level);
    updateStatusMessage(this.level);
  }
}

// Math.min(a, b) => a와 b 중 작은 값을 반환
// Math.max(a, b) => a와 b 중 큰 값을 반환

// 위의 코드에서는 배터리 잔량이 0 ~100 사이여야 해서, 100이라는 상한과 0이라는 하한을 코드에 넣음