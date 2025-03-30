import { create } from "zustand";
import { message } from "antd";
import {
  TreeItemData,
  getSpaceList,
  pinSpace,
  deleteSpace as delSpace,
  createSpaceData,
  createSpace,
} from "@/apis";
import processTreeData from "@/utils/processTreeData";
import updateTreeData from "@/utils/updateTreeData";

interface SpaceList {
  spaceList: TreeItemData[];
  setSpaceList: (spaceList: TreeItemData[]) => void;
  pinSpaceList: TreeItemData[];
  setPinSpaceList: (pinSpaceList: TreeItemData[]) => void;
  createSpace: (data: createSpaceData) => void;
  fetchSpaceList: () => void;
  updateSpaceList: (newData: TreeItemData[], node: TreeItemData) => void;
  deleteSpace: (id: string) => void;
  pinSpace: (id: string) => void;
}

const useSpaceList = create<SpaceList>((set) => ({
  spaceList: [],
  setSpaceList: (spaceList) => set({ spaceList }),
  pinSpaceList: [],
  setPinSpaceList: (pinSpaceList) => set({ pinSpaceList }),

  fetchSpaceList: async () => {
    const res = await getSpaceList();
    // 过滤出所有的置顶空间
    const pinSpaceList = res.data.filter((item) => item.isPinned);
    set({ spaceList: res.data, pinSpaceList: pinSpaceList });
    // 还需要将空间中所有的置顶文档也添加到pinDocList中
  },
  createSpace: async (data: createSpaceData) => {
    try {
      const res = await createSpace(data);
      const newSpaceList = [...useSpaceList.getState().spaceList, res.data];
      set({ spaceList: newSpaceList });
      message.success("创建成功");
    } catch (error) {
      console.log(error);
      message.error("创建失败");
    }
  },
  updateSpaceList: (newData, node) => {
    const processTreeDataRes = processTreeData(newData);
    const updatedSpaceList = updateTreeData(
      useSpaceList.getState().spaceList,
      node.spaceId,
      { hasChildren: true, isLeaf: false },
      processTreeDataRes
    );
    const updatedPinSpaceList = updateTreeData(
      useSpaceList.getState().pinSpaceList,
      node.spaceId,
      { hasChildren: true, isLeaf: false },
      processTreeDataRes
    );
    set({ spaceList: updatedSpaceList, pinSpaceList: updatedPinSpaceList });
  },
  deleteSpace: async (id: string) => {
    try {
      await delSpace(id);
      const newSpaceList = useSpaceList.getState().spaceList.filter((space) => {
        return space.spaceId !== id;
      });
      set({ spaceList: newSpaceList });
      message.success("已删除");
    } catch (error) {
      console.log(error);
    }
  },
  pinSpace: async (id: string) => {
    try {
      let flag = false;
      await pinSpace(id);
      const newSpaceList = useSpaceList.getState().spaceList.map((space) => {
        if (space.spaceId === id) {
          flag = space.isPinned;
          if (!space.isPinned)
            set({
              pinSpaceList: [
                ...useSpaceList.getState().pinSpaceList,
                { ...space, isPinned: true },
              ],
            });
          else
            set({
              pinSpaceList: useSpaceList
                .getState()
                .pinSpaceList.filter((item) => item.spaceId !== id),
            });
          return { ...space, isPinned: !space.isPinned };
        } else {
          return space;
        }
      });

      set({ spaceList: newSpaceList });
      if (flag) message.success("已取消置顶");
      else message.success("已置顶");
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useSpaceList;
