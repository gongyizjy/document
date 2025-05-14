import instance from "../config";
import Response from "../tool";

export interface VersionInfo {
  blockId: string;
  versionId: string;
  username: string;
  createdAt: string;
  description: string;
}

export default async function getVersion(
  blockId: string
): Promise<Response<VersionInfo[]>> {
  return await instance.get("/api/docVersion", { params: { blockId } });
}
