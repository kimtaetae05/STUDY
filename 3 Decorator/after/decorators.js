// [역할] 부가 기능을 "감싸는 함수"로 만든 파일 (handlers.js를 대체)

// 모든 데코레이터는 같은 모양이에요.
//   - 다음 함수(next)를 받는다
//   - 같은 모양의 새 함수를 돌려준다 (그 안에서 자기 일을 하고, 필요하면 next를 부른다)
// 모양이 같기 때문에 어떤 순서로든 겹쳐서 감쌀 수 있어요.

// ---------- 로그 ----------
function withLog(next) {
  return async function () {
    writeLog("[LOG] 결제 버튼 클릭");
    return next();           // 막지 않고 다음으로 넘김
  };
}

// ---------- 로그인 체크 ----------
function withAuth(next) {
  return async function () {
    if (!isLoggedIn()) {
      writeLog("로그인이 필요해요", "warn");
      return;                // next를 부르지 않음 = 여기서 막힘
    }
    return next();
  };
}

// ---------- 중복 클릭 방지 ----------

// 마지막 통과 시각은 함수 "밖"에 두기
// (클릭할 때마다 새로 감싸도 기억이 사라지지 않게 하기 위함)
const guardState = { lastClickAt: 0 };

function withGuard(next) {
  return async function () {
    const now = Date.now();
    if (now - guardState.lastClickAt < 1500) {
      writeLog("중복 클릭을 막았어요", "warn");
      return;
    }
    guardState.lastClickAt = now;
    return next();
  };
}

// ---------- 로딩 표시 ----------
function withLoading(next) {
  return async function () {
    setLoading(true);
    try {
      return await next();   // 결제가 끝날 때까지 기다림
    } finally {
      setLoading(false);     // 성공이든 실패든 반드시 원래대로
    }
  };
}
