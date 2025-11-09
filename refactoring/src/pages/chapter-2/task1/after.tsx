/* eslint-disable */
// @ts-nocheck

/**
 * ### Pattern: 계산 추출
 * - **문제**: 액션 함수 안에 비즈니스 로직이 섞여 있음
 * - **해결**: 순수 계산 로직을 별도 함수로 추출
 */

/**
 * 주문을 처리하는 메서드
 * 주문 id만 있으면 될 것 같기는함.
 * (data) orderId
 * (calculation1) orderId -> order
 * (calculation2) order -> totalOrder
 * (calculation3) totalOrder -> updateOrder
 * (action) 주문 id를 바탕으로 주문 API를 쏘는게 목표
 */

const sumBy = <T,>(items: T[], executor: (item: T) => number): number =>
  items.reduce((acc, item) => acc + executor(item), 0);

const discount = ({
  condition,
  rate,
  amount,
}: {
  condition: boolean;
  rate: number;
  amount: number;
}): number => (condition ? amount * (1 - rate / 100) : amount);

async function processOrder(orderId) {
  const { items } = await fetchOrder(orderId);

  const totalPrice = sumBy(items, (item) => item.price * item.quantity);

  await updateOrder(orderId, {
    total: discount({
      condition: totalPrice > 100,
      amount: totalPrice,
      rate: 10,
    }),
  });
}
