/**
 * Order는 이제 "회원 등급이 뭔지", "쿠폰이 뭔지" 전혀 몰라도 됨
 * 그냥 주어진 전략 객체 두 개(membershipStrategy, couponStrategy)를
 * 순서대로 호출할 뿐이다.
 *
 * before.js와 비교해보면:
 *   - calculateDiscount() 안의 if-else가 통째로 사라졌다.
 *   - customerType, couponCode 같은 "문자열"을 전혀 받지 않는다.
 *     대신 이미 완성된 전략 "객체"를 주입받는다 (의존성 주입).
 */

// 상품을 표시하는 클래스 (상품의 이름과 가격)
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// 장바구니 느낌 (상품이랑 상품의 개수를 받아서, 총 가격을 출력)
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
 
  getLineTotal() {
    return this.product.price * this.quantity;
  }
}
 
class Order {
  /**
   * @param {MembershipDiscountStrategy} membershipStrategy
   * @param {CouponStrategy} couponStrategy
   */
  constructor(membershipStrategy, couponStrategy) {
    this.items = [];
    this.membershipStrategy = membershipStrategy;
    this.couponStrategy = couponStrategy;
  }
 
  addItem(product, quantity) {
    this.items.push(new CartItem(product, quantity));
  }
 
  calculateSubtotal() {
    let sum = 0;
    for (const item of this.items) {
        sum = sum + item.getLineTotal();
    }
    return sum;
  }
  // 할인 전 총 가격 구하는 메서드
 
  calculateFinalPrice() {
    const subtotal = this.calculateSubtotal();
    const afterMembership = this.membershipStrategy.apply(subtotal);
    const afterCoupon = this.couponStrategy.apply(afterMembership);
    return afterCoupon;
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
    console.log(
      `회원 등급 전략: ${this.membershipStrategy.constructor.name}, 쿠폰 전략: ${this.couponStrategy.constructor.name}`
    );
    console.log(`최종 결제금액: ${Math.round(this.calculateFinalPrice()).toLocaleString()}원`);
    console.log("=============================\n");
  }
}
 
module.exports = { Product, CartItem, Order };