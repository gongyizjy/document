import instance from "../config";
export interface LoginData {
  username: string;
  password: string;
  captcha: string;
}

export default async function login(data:LoginData) {
  return await instance.post("/api/user/login", data)
}