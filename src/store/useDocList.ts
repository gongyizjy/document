import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { message, Modal } from "antd";
import { TreeItemData, getDocList, createDoc, delDoc } from "@/apis";
import processTreeData from "@/utils/processTreeData";
import updateTreeData from "@/utils/updateTreeData";

interface DocList {
  // 文档库列表数据
  docList: TreeItemData[];
  // 设置文档库列表数据
  setDocList: (docList: TreeItemData[]) => void;
  // 获取文档库列表数据
  fetchDocList: (callback?: (spaceId: string) => void) => void;
  // 更新文档库列表数据
  updateDocList: (newData: TreeItemData[], node: TreeItemData) => void;
  // 创建一级文档
  createRootDoc: (
    spaceId: string,
    successMsg?: string,
    failMsg?: string
  ) => void;
  // 删除文档数据
  deleteDoc: (blockId: string, successMsg?: string, failMsg?: string) => void;
}

const useDocListStore = create<DocList>((set) => ({
  docList: [],

  setDocList: (docList) => set({ docList }),

  fetchDocList: async (callback) => {
    const res = await getDocList();
    const processTreeDataRes = processTreeData(res.data);
    set({ docList: processTreeDataRes });
    callback?.(res.data[0].spaceId);
  },

  updateDocList: (newData, node) => {
    const processTreeDataRes = processTreeData(newData);
    set({
      docList: updateTreeData(
        useDocListStore.getState().docList,
        node.blockId,
        { hasChildren: true, isLeaf: false },
        processTreeDataRes
      ),
    });
  },

  createRootDoc: async (
    spaceId,
    successMsg = "创建成功",
    failMsg = "创建失败"
  ) => {
    try {
      const res = await createDoc({
        spaceId,
        blockId: uuid(),
        title: "未命名的文档",
      });

      const processTreeDataRes = processTreeData([res.data]);

      set({
        docList: [...useDocListStore.getState().docList, ...processTreeDataRes],
      });
      message.success(successMsg);
    } catch {
      message.error(failMsg);
    }
  },

  deleteDoc: async (blockId, successMsg = "删除成功", failMsg = "删除失败") => {
    try {
      Modal.confirm({
        title: "温馨提示",
        content: "删除后，下面的子文档也会被删除",
        onOk: async () => {
          await delDoc(blockId);
          const newDocList = useDocListStore
            .getState()
            .docList.filter((item) => item.blockId !== blockId);
          set({ docList: newDocList });
          message.success(successMsg);
        },
      });
    } catch {
      message.error(failMsg);
    }
  },
}));

export default useDocListStore;
