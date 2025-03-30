import instance from "../config";
import Response from "../tool";
import { TreeItemData } from "../space";

export default async function getPinDocList(): Promise<
  Response<TreeItemData[]>
> {
  return await instance.get("/api/doc/pinned");
}
