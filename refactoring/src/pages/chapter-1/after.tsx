import { useState, useEffect } from "react";

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

function getDiscountedPrice(price: number): number {
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

const useProductQuery = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const isLoading = product == null;
  useEffect(() => {
    fetchProduct(productId).then((d) => {
      setProduct(d);
    });
  }, [productId]);

  return { data: product, isLoading };
};

type ProductPurchaseProps = {
  productId: string;
  onSuccessSubmitOrder: () => void;
};

export default function ProductPurchase({
  productId,
  onSuccessSubmitOrder,
}: ProductPurchaseProps) {
  const { data: product, isLoading } = useProductQuery({ productId });
  const calculatedProduct = product ? calculatePrice(product) : null;

  const handlePurchaseButtonClick = () => {
    if (product == null || calculatedProduct == null) return; // FIXME: undefined 처리가 좀 더럽긴 하다 ㅠ

    const isValidStock = validateStock(product.stock);
    if (!isValidStock) {
      alert("재고 부족");
      return;
    }

    const discountedPrice = getDiscountedPrice(calculatedProduct.price);
    const finalPrice = calculatedProduct.price - discountedPrice;
    submitOrder({
      productId,
      price: finalPrice,
      timestamp: Date.now(),
    }).then(() => {
      onSuccessSubmitOrder();
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* FIXME: undefined 처리가 좀 더럽긴 하다 ㅠ */}
      <h1>{product?.title ?? ""}</h1>
      <p>{calculatedProduct?.price ?? 0}원</p>
      <button onClick={handlePurchaseButtonClick}>구매</button>
    </div>
  );
}

/**
 * 잘한점
 * 1. useProductQuery로 외부로 뺀것.
 * 2. data -> product 로 네이밍 변경한것 (되게 보편적인 이름 제거)
 *
 * 개선할점
 * 1. Suspense 활용하자 -> data null 처리가 굉장히 쉬움, loading 처리도 외부에 위임가능
 * 2. 한번만 사용되는 값이면, 인라인 처리하기. -> 따로 선언 하지말기
 * - isValidStock -> validateStock()
 * - onClick={handlePurchaseButtonClick} -> onClick={() => { bla bla.. }}
 */
