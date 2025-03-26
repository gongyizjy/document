import instance from "../config";
import Response from "../tool";
import { TreeItemData } from "../space";

export interface CreateDocData {
  blockId: string;
  title: string;
  content?: string;
  spaceId: string;
  parentId?: string;
}

export default async function createDoc(
  data: CreateDocData
): Promise<Response<TreeItemData>> {
  const res = await instance.post("/api/doc", data);
  return res.data;
}
