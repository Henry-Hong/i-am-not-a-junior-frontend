// 1번 -> satisfies
const METADATA_QUERIES = {
  "/menu": {},
  "/cart": {},
  "/detail": {},
  "/order-complete": {},
} satisfies Record<PATHS, any>;

type PATHS = "/menu" | "/detail" | "/cart" | "/order-complete";

// vs

// 2번 -> as const / keyof typeof
const METADATA_QUERIES2 = {
  "/menu": {},
  "/cart": {},
  "/detail": {},
  "/order-complete": {},
} as const;

type PATHS2 = keyof typeof METADATA_QUERIES2;

/**
 * 1번과 2번은 둘다 single source of truth를 활용하고 있고,
 * 누락의 위험이 적다
 *
 * 그런데,
 * 2번이 더 좋은 이유는, 자동으로 keyof typeof 로 PATH를 뽑아낸다.
 * 따라서 새로생긴 path가 많아 질수록 2번 방법이 좋다.
 */
