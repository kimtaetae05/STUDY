const LOW_BATTERY_THRESHOLD = 20;

class PercentDisplayObserver {
    update(subject) {
        document.getElementById('percent-display').textContent = subject.level + '%';
    }
}

class IconDisplayObserver {
    update(subject) {
        const fill = document.getElementById('icon-fill');
        fill.style.width = subject.level + '%';
        fill.classList.toggle('low', subject.level <= LOW_BATTERY_THRESHOLD);
    }
}

class StatusMessageObserver {
    update(subject) {
        const el = document.getElementById('status-message');
        if (subject.level >= 100) {
            el.textContent = '완충됐어요';
        } else if (subject.level <= LOW_BATTERY_THRESHOLD) {
            el.textContent = '⚠️ 배터리가 부족해요, 충전해주세요';
        } else {
            el.textContent = '정상 사용 중이에요';
        }
    }
}

