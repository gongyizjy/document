import instance from "../config";

export default async function getSpaceDetail(spaceId: string) {
  return await instance.post(`/api/spaces/${spaceId}`);
}