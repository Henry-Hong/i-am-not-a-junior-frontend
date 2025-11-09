/* eslint-disable */
// @ts-nocheck

// 💡 Case 2: 계산을 조합(Composition)하기
// - **문제**: 복잡한 비즈니스 로직을 한 번에 처리
// - **해결**: 작은 계산들을 조합

// ❌ Before: 변환 로직이 액션에 섞임
function DisplayOrders({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/orders/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // 복잡한 변환이 액션 콜백 안에
        const filtered = data.filter((o) => o.status !== "cancelled");
        const sorted = filtered.sort((a, b) => b.date - a.date);
        const grouped = {};
        for (const order of sorted) {
          const month = order.date.substring(0, 7);
          if (!grouped[month]) grouped[month] = [];
          grouped[month].push(order);
        }
        setOrders(grouped);
      });
  }, [userId]);
}
