const { Product, Order } = require("./02-order");
const {
  RegularDiscount,
  GoldDiscount,
  VipDiscount,
  NoCoupon,
  Welcome10Coupon,
  Summer5000Coupon,
} = require("./02-strategies");
 
const coffee = new Product("바닐라라떼", 4500);
const cake = new Product("생크림케이크", 6000);
const cookie = new Product("초코칩쿠키", 3000);
 
// 손님 1: 일반 회원, 쿠폰 없음
const order1 = new Order(new RegularDiscount(), new NoCoupon());
order1.addItem(coffee, 2);
order1.addItem(cake, 1);
order1.printReceipt();
 
// 손님 2: 골드 회원, WELCOME10 쿠폰
const order2 = new Order(new GoldDiscount(), new Welcome10Coupon());
order2.addItem(coffee, 1);
order2.addItem(cookie, 3);
order2.printReceipt();
 
// 손님 3: VIP 회원, SUMMER5000 쿠폰
const order3 = new Order(new VipDiscount(), new Summer5000Coupon());
order3.addItem(cake, 2);
order3.printReceipt();
 
// --- Strategy 패턴의 진가: 실행 중에 전략 교체 ---
console.log("--- 전략 교체해보기 ---");
const order4 = new Order(new RegularDiscount(), new NoCoupon());
order4.addItem(cake, 1);
console.log("처음(할인 없음):", Math.round(order4.calculateFinalPrice()), "원");
 
order4.membershipStrategy = new VipDiscount(); // 실행 중에 전략 갈아끼우기
console.log("VIP로 승급 후:", Math.round(order4.calculateFinalPrice()), "원");
 
/**
 * 01-before.js와 비교하며 확인할 것:
 *
 * 1) 결과값이 01-before.js와 완전히 동일한가? (손님 3의 최종 결제금액이
 *    여전히 0원인가? — 이건 버그가 아니라 "같은 로직을 그대로 옮겼을 때
 *    같은 결과가 나와야 정상"이라는 걸 확인하는 것)
 *
 * 2) 새로운 회원 등급 "PLATINUM"을 추가하려면 몇 개의 파일/클래스를
 *    건드려야 하는가? (정답: 02-strategies.js에 클래스 하나만 추가.
 *    Order 클래스는 단 한 줄도 안 바뀐다 — OCP)
 *
 * 3) 각 전략을 Order 없이 독립적으로 테스트할 수 있는가?
 *    예: new VipDiscount().apply(12000) === 4600
 */
 