// [역할] 진짜 하고 싶은 일 (핵심 로직)
// 데코레이터가 감싸게 될 "본체"예요. 리팩터링할 때 이 파일은 건드리지 않는 게 목표입니다.

async function pay() {
  await sleep(1200);
  writeLog("결제가 완료됐어요", "ok");
}

// async가 붙은 함수는 내부에 await를 사용할 수 있음(Promise와 관련)