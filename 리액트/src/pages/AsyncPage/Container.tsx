import { useSuspenseQuery } from "@tanstack/react-query";
import { apis } from "../../apis";

export default function Container() {
  const getUser = async (userId: number) => {
    const response = await apis.get(`/users/${userId}`);
    return response;
  };

  const getClass = async (classId: number) => {
    const response = await apis.get(`/classes/${classId}`);
    return response;
  };

  const userId = 1;
  const { data: userData } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  const { data: classData } = useSuspenseQuery({
    queryKey: ["class"],
    queryFn: () => getClass(userData.classId),
  });

  return (
    <div>
      <h3>user : {JSON.stringify(userData)}</h3>
      <h3>class : {JSON.stringify(classData)}</h3>
    </div>
  );
}
