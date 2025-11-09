/* eslint-disable */
// @ts-nocheck

// Case 4: Reducer로 상태 관리하기
// - **문제**: 상태 업데이트 로직에 부수효과가 섞임
// - **해결**: Reducer를 순수 계산으로 작성

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // 상태 업데이트에 부수효과가 섞임
    console.log("Adding item:", item); // 액션!
    localStorage.setItem("lastAdded", item.id); // 액션!

    setCart((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };
}
