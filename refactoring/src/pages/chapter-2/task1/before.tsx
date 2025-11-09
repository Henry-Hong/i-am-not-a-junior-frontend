/* eslint-disable */
// @ts-nocheck

/**
 * ### Pattern: 계산 추출
 * - **문제**: 액션 함수 안에 비즈니스 로직이 섞여 있음
 * - **해결**: 순수 계산 로직을 별도 함수로 추출
 */

async function processOrder(orderId) {
  const order = await fetchOrder(orderId); // 액션

  // 계산 로직이 액션 안에 섞임
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }

  if (total > 100) {
    total = total * 0.9; // 10% 할인
  }

  await updateOrder(orderId, { total }); // 액션
}
