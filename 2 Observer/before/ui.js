const LOW_BATTERY_THRESHOLD = 20; // 고정값

function updatePercentDisplay(level) {
  document.getElementById('percent-display').textContent = level + '%';
}

function updateIconDisplay(level) {
  const fill = document.getElementById('icon-fill');
  fill.style.width = level + '%'; // fill의 너비 값을 level의 크기로 바꾸는 코드
  fill.classList.toggle('low', level <= LOW_BATTERY_THRESHOLD);
}

function updateStatusMessage(level) {
  const el = document.getElementById('status-message');
  if (level === 100) {
    el.textContent = '완충됐어요';
  }
  else if (level <= LOW_BATTERY_THRESHOLD) {
    el.textContent = '⚠️ 배터리가 부족해요, 충전해주세요';
  }
  else {
    el.textContent = '정상 사용 중이에요';
  }
}

// 요소.textContent : 글자 바꾸기
// 9번 - 퍼센트 붙이는 이유 : 단위