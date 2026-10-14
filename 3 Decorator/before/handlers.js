// [역할] 클릭 핸들러 (부가 기능 + 핵심 로직을 if로 엮은 곳)
// 이 파일이 데코레이터 적용 전의 문제를 가장 잘 보여줘요.

const state = {
  lastClickAt: 0, // 중복 클릭 방지용
};

// ---------- 순서 A: 로그 → 로그인 → 중복방지 → 로딩 ----------
async function handleClickA(opts) {
  if (opts.log) {
    writeLog("[LOG] 결제 버튼 클릭");
  }

  if (opts.auth && !isLoggedIn()) {
    writeLog("로그인이 필요해요", "warn");
    return;
  }

  if (opts.guard) {
    const now = Date.now();
    if (now - state.lastClickAt < 1500) {
      writeLog("중복 클릭을 막았어요", "warn");
      return;
    }
    state.lastClickAt = now;
  }

  if (opts.loading) setLoading(true);
  try {
    await pay();
  } finally {
    if (opts.loading) setLoading(false);
  }
}

// ---------- 순서 B: 로그인 → 중복방지 → 로그 → 로딩 ----------
// handleClickA와 거의 같은 코드인데, 블록 위치만 다르다.
async function handleClickB(opts) {
  if (opts.auth && !isLoggedIn()) {
    writeLog("로그인이 필요해요", "warn");
    return;
  }

  if (opts.guard) {
    const now = Date.now();
    if (now - state.lastClickAt < 1500) {
      writeLog("중복 클릭을 막았어요", "warn");
      return;
    }
    state.lastClickAt = now;
  }

  if (opts.log) {
    writeLog("[LOG] 결제 버튼 클릭");
  }

  if (opts.loading) setLoading(true);
  try {
    await pay();
  } finally {
    if (opts.loading) setLoading(false);
  }
}
