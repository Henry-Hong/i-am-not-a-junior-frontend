/* eslint-disable */
// @ts-nocheck

// 💡 Case 2: 계산을 조합(Composition)하기
// - **문제**: 복잡한 비즈니스 로직을 한 번에 처리
// - **해결**: 작은 계산들을 조합

/**
 * 주문을 표시하는 컴포넌트
 * userId만 있으면 될 것 같고,
 * tsx를 return 해줘야할것 같음
 *
 * (data) userId
 * (calculation1) userId -> orders
 * (calculation2) orders -> tsx
 * (action) tsx return
 *
 * **select로 한 이유:**
 * 1. filtered / sorted 같은 중간 값보단, grouping 된 최종 결과만 관심이 있을 것 같았다.
 * 2. filter, sort는 무거운 작업이기에, memoization 해주면 좋겠다고 생각했음.
 * 3. 최종 리턴값인, "{data: orders}" 에만 집중해줬으면 했음.
 */

const groupBy = <T,>(
  items: T[],
  executor: (item: T) => string
): Record<string, T[]> => {
  const grouped = {};
  for (const item of items) {
    const key = executor(item);
    if (grouped[key] == null) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }
  return grouped;
};

const isNotCancelled = (status: "cancelled" | "ok" | "pending") =>
  status !== "cancelled";

const descendOrder = (dateA: Date, dateB: Date) => dateB - dateA;

function DisplayOrders({ userId }) {
  const { data: groupedOrder } = useSuspenseQuery({
    ...userOrdersOptions(userId),
    select: (orders) => {
      const filtered = data.filter((o) => isNotCancelled(o.status));
      const sorted = filtered.sort((a, b) => descendOrder(a.date, b.date));
      return groupBy(sorted, (order) => format(order.date, "yyyy-MM"));
    },
  });
}
