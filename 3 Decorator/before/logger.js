// [역할] 화면 오른쪽 로그 패널에 한 줄씩 출력
// type: "info" | "ok" | "warn"

function writeLog(text, type = "info") {
  const li = document.createElement("li");
  const time = new Date().toLocaleTimeString("ko-KR", { hour12: false });
  li.innerHTML = `<span class="time">${time}</span><span class="${type}"></span>`;
  li.querySelector("." + type).textContent = text;

  const logEl = $("log");
  logEl.appendChild(li);
  logEl.scrollTop = logEl.scrollHeight;

  // 출력되는 부분
  // 로그가 쌓이면 최신이 보이도록 하는 거
}
