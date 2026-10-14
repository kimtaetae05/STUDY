// [역할] 화면(DOM)에서 값을 읽거나, 버튼 모양을 바꾸는 일

function setLoading(on) {
  $("payBtn").classList.toggle("loading", on);
  $("payLabel").textContent = on ? "결제 중..." : "결제하기";
}

function isLoggedIn() {
  return $("loggedIn").checked;
}

function readOptions() {
  return {
    log: $("optLog").checked,
    auth: $("optAuth").checked,
    guard: $("optGuard").checked,
    loading: $("optLoading").checked,
  };
}

function readOrder() {
  return document.querySelector('input[name="order"]:checked').value;
}
