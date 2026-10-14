/**
 * 2단계: Strategy 패턴 적용
 *
 * 01-before.js를 보면 할인 로직이 "성격이 다른 두 종류"로 섞여 있었다.
 *   1) 회원 등급 할인 (REGULAR / SILVER / GOLD / VIP)
 *   2) 쿠폰 할인 (WELCOME10 / SUMMER5000 / 없음)
 *
 * 이 두 종류는 서로 독립적으로 조합될 수 있으므로,
 * 전략 "패밀리"를 두 개로 나눈다.
 *
 * 규칙: 모든 전략은 apply(amount) 메서드를 가진다.
 *   입력: 할인 전 금액 → 출력: 할인 적용 후 금액
 */
 
// ============================================
// 1) 회원 등급 할인 전략
// ============================================
 
class MembershipDiscountStrategy {
  /** @param {number} amount @returns {number} */
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
 
// ============================================
// 2) 쿠폰 할인 전략
// ============================================
 
class CouponStrategy {
  /** @param {number} amount @returns {number} */
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
 
module.exports = {
  MembershipDiscountStrategy,
  RegularDiscount,
  SilverDiscount,
  GoldDiscount,
  VipDiscount,
  CouponStrategy,
  NoCoupon,
  Welcome10Coupon,
  Summer5000Coupon,
}; 
// Node.js의 모듈 시스템에서 '이 파일에 있는 것들 중에서 밖으로 내보낼 것들'을 지정하는 문법
// 총 9개의 클래스를 하나의 객체로 묶어서 내보낸다는 의미 