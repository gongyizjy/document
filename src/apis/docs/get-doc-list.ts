import instance from "../config";
import Response from "../tool";
import { TreeItemData } from "../space";

const getDocList = (): Promise<Response<TreeItemData[]>> => {
  return instance.get("/api/doc/list");
};

export default getDocList;
