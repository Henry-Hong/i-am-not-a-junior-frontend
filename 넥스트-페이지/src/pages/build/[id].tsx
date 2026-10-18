import { useState } from "react";

const fetchProduct = async (id: number) => {
  return {
    name: `name ${id}`,
    price: `price ${id * 1000}원`,
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false, // ✅ 나머지는 빌드 중에도 안 만들고, 요청 오면 404
  };
}

// pages/products/[id].tsx
export async function getStaticProps({ params }: { params: { id: number } }) {
  const product = await fetchProduct(params.id); // 빌드 시점에 데이터 가져옴
  return { props: { product } };
}

export default function ProductPage({
  product,
}: {
  product: { name: string; price: string };
}) {
  const [liked, setLiked] = useState(false); // ✅ 클라이언트에서 동적 상태 가능

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}원</p>
      <button onClick={() => setLiked(!liked)}>
        {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
      </button>
    </div>
  );
}
