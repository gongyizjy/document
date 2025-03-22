import instance from "../config";

interface createSpaceData {
  spaceId: string;
  name: string;
  description: string;
  cover: string;
  emoji: string;
}

export default async function createSpace (data: createSpaceData) {
  return instance.post("/api/space", data);
};
