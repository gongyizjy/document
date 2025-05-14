import instance from "../config";
import Response from "../tool";

export interface VersionContent {
  type: string;
  data: Uint8Array;
}
export default async function getVersionContent(
  versionId: string
): Promise<Response<VersionContent>> {
  return await instance.get(`/api/docVersion/${versionId}`);
}
