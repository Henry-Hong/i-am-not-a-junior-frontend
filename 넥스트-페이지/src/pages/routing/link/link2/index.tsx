import { GetServerSideProps } from "next";

type PageProps = {
  pageProp: string;
};

// prefetch 한다고 해서 getServerSideProps를 미리 수행하진 않는다.
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 3000));
  return {
    props: {
      pageProp: "hello world",
    },
  };
};

export default function Link2({ pageProp }: PageProps) {
  return <div>link2 {pageProp}</div>;
}
