import instance from "../config";

export default async function pinDoc(spaceId: string) {
  return await instance.put(`/api/doc/pin/${spaceId}`);
}
