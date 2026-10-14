class MembershipDiscountStrategy {
  apply(amount) {
    throw new Error("apply()는 하위 클래스에서 구현해야 합니다.");
  }
}

class RegularDiscount extends MembershipDiscountStrategy {
  apply(amount) {
    return amount; // 할인 없음
  }
}

class SilverDiscount extends MembershipDiscountStrategy {
  apply(amount) {
    return amount * 0.95; // 5% 할인
  }
}

class GoldDiscount extends MembershipDiscountStrategy {
  apply(amount) {
    return amount * 0.9; // 10% 할인
  }
}

class VipDiscount extends MembershipDiscountStrategy {
  apply(amount) {
    return Math.max(0, amount * 0.8 - 5000); // 20% 할인 + 5000원 추가 차감
  }
}

class CouponStrategy {
  apply(amount) {
    throw new Error("apply()는 하위 클래스에서 구현해야 합니다.");
  }
}

class NoCoupon extends CouponStrategy {
  apply(amount) {
    return amount; // 쿠폰 없음
  }
}

class Welcome10Coupon extends CouponStrategy {
  apply(amount) {
    return amount * 0.9; // 10% 추가 할인
  }
}

class Summer5000Coupon extends CouponStrategy {
  apply(amount) {
    return Math.max(0, amount - 5000); // 5000원 추가 차감
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

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
