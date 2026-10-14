// [역할] 화면 이벤트와 핸들러를 연결 (시작점)

// payBtn을 클릭하면 {}안의 이벤트를 실행
$("payBtn").addEventListener("click", () => {
  const opts = readOptions();   // 화면에서 사용자가 설정한 옵션을 opts에 넣음
  const order = readOrder();   // 실행 순서를 order에 넣음 (어떤 순서로 기능을 실행할 것인지)

  // "순서가 늘어날 때"마다 여기도 분기가 늘어난다.
  if (order === "A") handleClickA(opts);
  else handleClickB(opts);
});

// clear을 클릭하면 {}안의 이벤트를 실행
$("clear").addEventListener("click", () => {
  $("log").innerHTML = ""; // 화면의 로그영역 안에 있는 내용을 전부 지우기
});
