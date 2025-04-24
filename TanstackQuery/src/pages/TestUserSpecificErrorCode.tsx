import { useQuery } from "@tanstack/react-query";

export default function TestUserSpecificErrorCode() {
  const { data } = useQuery({
    queryKey: ["user-specific-error-code"],
    queryFn: async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (Math.random() > 0.5) {
          if (Math.random() > 0.5) {
            throw new UserSpecificError(
              "User specific error code1",
              UserSpecificErrorCode.ERROR_CODE_01
            );
          } else {
            throw new UserSpecificError(
              "User specific error code2",
              UserSpecificErrorCode.ERROR_CODE_02
            );
          }
        }
        return true;
      } catch (error) {
        if (error instanceof UserSpecificError) {
          if (error.code === "ERROR_CODE_01") {
            return "error1";
          } else if (error.code === "ERROR_CODE_02") {
            return "error2";
          }
        }
      }
    },
  });

  return <div>{JSON.stringify(data)}</div>;
}

class UserSpecificError extends Error {
  code: UserSpecificErrorCode;
  constructor(message: string, code: UserSpecificErrorCode) {
    super(message);
    this.name = "UserSpecificError";
    this.code = code;
  }
}

enum UserSpecificErrorCode {
  ERROR_CODE_01 = "ERROR_CODE_01",
  ERROR_CODE_02 = "ERROR_CODE_02",
}
