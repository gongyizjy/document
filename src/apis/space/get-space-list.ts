import instance from "../config";
import Response from "../tool";

export interface TreeItemData {
  key: string;
  title: string;
  spaceId: string;
  name: string;
  description?: string;
  cover: string;
  emoji: string;
  hasChildren: boolean;
  children: TreeItemData[];
  blockId: string;
  isOwner: boolean;
  accessLevel: "read" | "write" | "admin";
  type: number;
  parentId?: string;
  isLeaf?: boolean;
}

export default async function getSpaceList(): Promise<
  Response<TreeItemData[]>
> {
  return await instance.get("/api/space");
}
