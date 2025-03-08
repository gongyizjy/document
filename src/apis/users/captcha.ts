import instance from "../config";

export default async function captcha(): Promise<string> {
  return await instance.get("/captcha");
}