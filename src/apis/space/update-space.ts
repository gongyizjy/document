import instance from "../config";

interface updateSpaceData {
  name: string;
  description: string;
  cover: string;
  emoji: string;
}

export default async function updateSpace(spaceId: string, data: updateSpaceData) {
  return await instance.put(`/api/space/${spaceId}`, {
    data
  });
}