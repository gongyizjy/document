import instance from "../config";

interface PermisionParams {
  type: "doc" | "space";
  targetId: string;
}

export default async function getPermision({
  type,
  targetId,
}: PermisionParams) {
  return await instance.get("/api/permission", {
    params: {
      type,
      targetId,
    },
  });
}
