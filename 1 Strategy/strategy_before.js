/**
 * ============================================
 * 미니 프로젝트: 온라인 쇼핑몰 "간단 주문 시스템"
 * ============================================
 *
 * 클로드가 만들어준 코드 (전략 패턴을 적용할 수 있도록 코딩해줌)
 *
 * 실제 서비스에서 있을 법한 요소들을 조금 섞었습니다:
 * - 상품(Product)과 장바구니(CartItem)
 * - 회원 등급(customerType)에 따른 할인
 * - 쿠폰 코드에 따른 추가 할인
 * - 영수증 출력
 */
 
// ---------- 상품 ----------
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
 
// ---------- 장바구니 항목 ----------
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
 
  getLineTotal() {
    return this.product.price * this.quantity;
  }
}

// ---------- 주문 ----------
class Order {
  /**
   * @param {string} customerType - "REGULAR" | "SILVER" | "GOLD" | "VIP"
   * @param {string|null} couponCode - "WELCOME10" | "SUMMER5000" | null
   */
  constructor(customerType, couponCode = null) {
    this.items = [];
    this.customerType = customerType;
    this.couponCode = couponCode;
  }
 
  addItem(product, quantity) {
    this.items.push(new CartItem(product, quantity));
  }
 
  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getLineTotal(), 0);
  }
 
  calculateDiscount(subtotal) {
    let discounted = subtotal;
 
    // --- 1) 회원 등급별 할인 ---
    if (this.customerType === "REGULAR") {
      // 할인 없음
    } else if (this.customerType === "SILVER") {
      discounted = discounted * 0.95; // 5% 할인
    } else if (this.customerType === "GOLD") {
      discounted = discounted * 0.9; // 10% 할인
    } else if (this.customerType === "VIP") {
      discounted = discounted * 0.8 - 5000; // 20% 할인 + 5000원 추가 차감
      if (discounted < 0) discounted = 0;
    }
 
    // --- 2) 쿠폰 코드별 추가 할인 ---
    if (this.couponCode === "WELCOME10") {
      discounted = discounted * 0.9; // 추가 10% 할인
    } else if (this.couponCode === "SUMMER5000") {
      discounted = discounted - 5000;
      if (discounted < 0) discounted = 0;
    }
    // 쿠폰 종류가 늘어날 때마다 여기도 계속 늘어난다...
 
    return discounted;
  }
 
  calculateFinalPrice() {
    const subtotal = this.calculateSubtotal();
    return this.calculateDiscount(subtotal);
  }
 
  printReceipt() {
    console.log("========== 영수증 ==========");
    for (const item of this.items) {
      console.log(
        `${item.product.name} x ${item.quantity} = ${item.getLineTotal().toLocaleString()}원`
      );
    }
    console.log("-----------------------------");
    console.log(`상품 합계: ${this.calculateSubtotal().toLocaleString()}원`);
    console.log(`회원 등급: ${this.customerType}${this.couponCode ? `, 쿠폰: ${this.couponCode}` : ""}`);
    console.log(`최종 결제금액: ${Math.round(this.calculateFinalPrice()).toLocaleString()}원`);
    console.log("=============================\n");
  }
}

// ---------- 실행: 작은 "가게"를 시뮬레이션 ----------
const coffee = new Product("바닐라라떼", 4500);
const cake = new Product("생크림케이크", 6000);
const cookie = new Product("초코칩쿠키", 3000);
 
// 손님 1: 일반 회원, 쿠폰 없음
const order1 = new Order("REGULAR");
order1.addItem(coffee, 2);
order1.addItem(cake, 1);
order1.printReceipt();
 
// 손님 2: 골드 회원, WELCOME10 쿠폰
const order2 = new Order("GOLD", "WELCOME10");
order2.addItem(coffee, 1);
order2.addItem(cookie, 3);
order2.printReceipt();
 
// 손님 3: VIP 회원, SUMMER5000 쿠폰
const order3 = new Order("VIP", "SUMMER5000");
order3.addItem(cake, 2);
order3.printReceipt();
 