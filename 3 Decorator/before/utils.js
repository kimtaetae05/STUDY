// [역할] 어디서나 쓰는 작은 도구

// 모든 코드에서 document.getElementById(id) 대신 $("...")를 이용하여 요소를 찾을 수 있음
// (여기서 미리 선언했기에 가능)
const $ = (id) => document.getElementById(id);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// 정해진 시간만큼 기다리기
// 1000ms = 1초
// ms초 후에 resolve를 실행하는 코드
// sleep(1200) 이런 식으로 쓰임
// resolve: Promise가 잘 지켜졌다고 알리는 함수. -> 호출되면, await 부분이 다시 실행됨

