import instance from "../config";

export interface CreateDocData {
  blockId: string;
  title: string;
  content?: string;
  spaceId: string
  parentId?: string;
}


export default async function createDoc (data: CreateDocData)  {
  const res = await instance.post("/api/doc", data);
  return res.data;
};