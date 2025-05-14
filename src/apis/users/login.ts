import instance from "../config";
import Response from "../tool";

export interface UserInfo {
  id: number
  username: string;
  email: string;
  avatar: string;
  defaultSpaceId?: string;
}

export interface LoginData {
  username: string;
  password: string;
  captcha: string;
}

export default async function login(
  data: LoginData
): Promise<Response<UserInfo>> {
  return await instance.post("/api/user/login", data);
}
