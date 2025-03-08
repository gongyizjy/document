import instance from "../config";

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  avatar?: string;
}
export default async function register(data: RegisterData) {
  return await instance.post("/api/user/register", data);
}
