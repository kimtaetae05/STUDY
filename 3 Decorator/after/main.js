// [역할] 화면 이벤트와 핸들러를 연결 (시작점) + 감싸는 순서를 정하는 곳

// 이름표 → 감싸는 함수 (이름표는 ui.js의 readOptions()와 같아야 함)
const decorators = {
  log: withLog,
  auth: withAuth,
  guard: withGuard,
  loading: withLoading,
};

// 순서 = 이름표를 "바깥 → 안쪽" 순으로 나열한 배열 (맨 앞이 가장 먼저 실행됨)
// 새 순서가 필요하면 여기에 한 줄만 추가하면 됨
const orders = {
  A: ["log", "auth", "guard", "loading"],
  B: ["auth", "guard", "log", "loading"],
};

// pay를 안쪽부터 하나씩 감싸서 최종 핸들러를 만드는 코드
function buildHandler(order, opts) {
  let handler = pay;                          // 가장 안쪽 = 진짜 결제
  const names = [...orders[order]].reverse(); // 안쪽부터 감싸려고 뒤집음
  for (const name of names) {
    if (opts[name]) {                         // 켜진 기능만 감싸는 코드
      handler = decorators[name](handler);
    }
  }
  return handler;
}

// payBtn을 클릭하면 {}안의 이벤트를 실행
$("payBtn").addEventListener("click", () => {
  const opts = readOptions();                 // 켜진 기능
  const order = readOrder();                  // 선택된 순서 ("A" 또는 "B")
  const handler = buildHandler(order, opts);  // 감싸서 조립
  handler();                                  // 실행
});

$("clear").addEventListener("click", () => {
  $("log").innerHTML = "";
});
