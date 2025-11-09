/* eslint-disable */
// @ts-nocheck

// Case 4: Reducer로 상태 관리하기
// - **문제**: 상태 업데이트 로직에 부수효과가 섞임
// - **해결**: Reducer를 순수 계산으로 작성

/**
 * 로깅하는거랑,
 * localStorage 에 setItem 하는건,, 어쩔 수 없는거 아닌가?
 * 그렇다고 reducer 로직안에 넣을 순 없잖아.
 */

type State = {
  id: number;
  cart: Array<{ quantity: number; id: number }>;
};

type Action = {
  type: "ADD_ITEM";
  payload: {
    id: number;
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return produce(state, (draft) => {
        const id = action.payload.id;
        const index = state.cart.findIndex((i) => i.id === id);
        if (index != -1) {
          state.cart[index].quantity += 1;
        } else {
          state.cart.push({ id, quantity: 1 });
        }
      });
  }
};

function ShoppingCart() {
  const [{ cart }, dispatch] = useReducer(reducer, { id: 0, cart: [] });

  const addItem = (item) => {
    console.log("Adding item:", item);
    localStorage.setItem("lastAdded", item.id);
    dispatch({ type: "ADD_ITEM", id: item.id });
  };
}
