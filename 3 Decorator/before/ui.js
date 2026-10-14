// [역할] 화면(DOM)에서 값을 읽거나, 버튼 모양을 바꾸는 일

// 버튼을 로딩 모양으로 바꾸는 코드
function setLoading(on) {
  $("payBtn").classList.toggle("loading", on);
  $("payLabel").textContent = on ? "결제 중..." : "결제하기";
}

// 지금 로그인 상태인지 확인하는 코드
// (체크박스가 체크가 되어있는지 아닌지에 따라, T or F 반환)
function isLoggedIn() {
  return $("loggedIn").checked;
}

// 켜진 기능이 무엇인ㄱ지 확인하는 코드
// (체크박스가 체크가 되어있는지 아닌지에 따라, T or F 반환)
function readOptions() {
  return {
    log: $("optLog").checked,
    auth: $("optAuth").checked,
    guard: $("optGuard").checked,
    loading: $("optLoading").checked,
  };
}

// 어떤 순서가 선택되었는지 확인하는 코드
// (감싸는 순서가 A인지, B인지)
function readOrder() {
  return document.querySelector('input[name="order"]:checked').value;
}