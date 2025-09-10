import { useState, useEffect } from "react";

// 타입 정의
interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
}

interface PriceCalculation {
  price: number;
}

interface OrderData {
  productId: string;
  price: number;
  timestamp: number;
}

// Mock 함수들
async function fetchProduct(id: string): Promise<Product> {
  // Mock API 호출 - 1초 지연
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `Mock 상품 ${id}`,
        price: Math.floor(Math.random() * 100000) + 10000, // 10,000 ~ 110,000원
        stock: Math.floor(Math.random() * 20) + 1, // 1 ~ 20개
      });
    }, 1000);
  });
}

function calculatePrice(product: Product): PriceCalculation {
  // 기본 가격 계산 (추가 로직이 있다면 여기에)
  return {
    price: product.price,
  };
}

function validateStock(stock: number): boolean {
  // 재고가 0보다 큰지 확인
  return stock > 0;
}

function getDiscount(price: number): number {
  // 가격에 따른 할인율 적용
  if (price >= 100000) return Math.floor(price * 0.15); // 15% 할인
  if (price >= 50000) return Math.floor(price * 0.1); // 10% 할인
  if (price >= 20000) return Math.floor(price * 0.05); // 5% 할인
  return 0; // 할인 없음
}

async function submitOrder(orderData: OrderData): Promise<void> {
  // Mock 주문 제출 - 500ms 지연
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% 확률로 주문 실패 (Mock)
      if (Math.random() < 0.1) {
        reject(new Error("주문 처리 중 오류가 발생했습니다."));
        return;
      }

      console.log("주문 완료:", {
        ...orderData,
        orderId: `ORDER_${Date.now()}`,
        status: "completed",
      });
      resolve();
    }, 500);
  });
}

// Mock useNavigate hook (React Router의 useNavigate를 모방)
function useNavigate() {
  return (path: string) => {
    console.log(`네비게이션: ${path}로 이동`);
    // 실제로는 React Router의 navigate 함수가 호출됨
  };
}

export default function ProductPurchase({ id }: { id: string }) {
  const [data, setData] = useState<Product | null>(null);
  const [calc, setCalc] = useState<PriceCalculation>({ price: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id).then((d) => {
      setData(d);
      setCalc(calculatePrice(d));
    });
  }, [id]);

  const handleClick = () => {
    if (!data) return;

    const validation = validateStock(data.stock);
    if (!validation) {
      alert("재고 부족");
      return;
    }

    const discount = getDiscount(calc.price);
    const final = calc.price - discount;

    submitOrder({
      productId: id,
      price: final,
      timestamp: Date.now(),
    }).then(() => {
      navigate("/success");
    });
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{calc.price}원</p>
      <button onClick={handleClick}>구매</button>
    </div>
  );
}
