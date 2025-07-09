/**
 * enum의 장점
 * 1. 객체의 이름을 알아내는 reverse mapping이 가능. -> 근데 이것도 enum 멤버의 값이 number 일때만 가능해서, 제약이 큼.
 * 2. symbol로 처리되어서 refactoring 이 간편하다 -> 이것도 객체 const 로 충분히 가능
 * 3. 값과 타입을 동시에 생성하는 문법 -> typeof를 쓰지 않아도 됨.
 * --------------------
 * enum의 단점
 * 1. intellisense 가 불가능하다
 * 2. treeshaking에 불리하다 등등
 */

// 0. How enum actually transpile to?
enum UserRole {
  ADMIN = 1,
  MODERATOR = 2,
  USER = 3,
}

// var UserRole;
// (function (UserRole) {
//     UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
//     UserRole[UserRole["MODERATOR"] = 2] = "MODERATOR";
//     UserRole[UserRole["USER"] = 3] = "USER";
// })(UserRole || (UserRole = {}));

// 1번 - reverse mapping 가능
enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

const statusCode: StatusCode = StatusCode.OK; // 200
const statusCodeName = StatusCode[statusCode]; // OK

const StatusCode2 = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

type StatusCode2ValueType = (typeof StatusCode2)[keyof typeof StatusCode2];

const statusCode2: StatusCode2ValueType = StatusCode2.OK;
const statusCodeName2 = StatusCode2[statusCode2]; // OK? Nope. error shows up.

// 2번은 알아서 보쇼

// 3번 - typeof 없이 가능
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const direction: Direction = Direction.Up; // direction은 1,2,3,4 모두 가질 수 있음

const Direction2 = {
  Up: 1,
  Down: 2,
  Left: 3,
  Right: 4,
} as const;

const direction2: (typeof Direction2)[keyof typeof Direction2] = Direction2.Up; // typeof 너무 귀찮은것.
