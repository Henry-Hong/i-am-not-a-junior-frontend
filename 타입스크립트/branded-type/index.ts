type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

const createUserId = (id: string): UserId => id as UserId;
const createProductId = (id: string): ProductId => id as ProductId;

const getUser = (id: UserId) => {
  /* ... */
};

const userId = createUserId("abc123");
const productId = createProductId("xyz789");

getUser(userId); // OK
getUser(productId); // ❌ 오류 발생 - 타입이 다름

// ---------------------

type Kilometer = Brand<number, "Kilometer">;
type Mile = Brand<number, "Mile">;

const convertToKilometers = (mile: Mile) => {
  return mile * 1.60934;
};

const convertToMiles = (kilometer: Kilometer) => {
  return kilometer / 1.60934;
};
