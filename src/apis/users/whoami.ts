import instance from "../config";

export default async function whoami() {
  return await instance.get("/user/whoami");
}
