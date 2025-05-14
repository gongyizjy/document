import { Invitaion } from "@/hooks/types";
import instance from "../config";
import Response from "../tool";

export default async function getPendingInvitation(): Promise<
  Response<Invitaion[]>
> {
  return await instance.get("/api/invitation");
}
