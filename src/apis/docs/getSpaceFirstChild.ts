import instance from "../config";
import Response from "../tool";
import { TreeItemData } from "../space";

export default async function getSpaceFirstChild(
  spaceId: string
): Promise<Response<TreeItemData>> {
  return await instance.get(`/api/doc`,{
    params: {
      spaceId,
    }
  });
}
