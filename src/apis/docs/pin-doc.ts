import instance from "../config";

export default async function pinDoc(blockId: string) {
  return await instance.put(`/api/doc/pin/${blockId}`);
}
