import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { message, Modal } from "antd";
import {
  TreeItemData,
  getDocList,
  createDoc,
  delDoc,
  updateDoc,
  collectDoc as collectedDoc,
  pinDoc as pinedDoc,
  getPinDocList,
} from "@/apis";
import processTreeData from "@/utils/processTreeData";
import updateTreeData from "@/utils/updateTreeData";
import useSpaceList from "./useSpaceList";
import useDocLib from "./docLib";

interface DocList {
  // 文档库列表数据
  docList: TreeItemData[];
  // 设置文档库列表数据
  setDocList: (docList: TreeItemData[]) => void;
  // 置顶文档数据
  pinDocList: TreeItemData[];
  // 设置置顶文档数据
  setPinDocList: (pinDocList: TreeItemData[]) => void;
  // 获取置顶文档列表数据
  fetchPinDocList: () => void;
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
  deleteDoc: (
    node: TreeItemData,
    successMsg?: string,
    failMsg?: string
  ) => void;
  // 重命名文档
  renameDoc: (node: TreeItemData, title: string) => void;
  // 收藏文档
  collectDoc: (node: TreeItemData) => void;
  // 置顶文档
  pinDoc: (blockId: TreeItemData) => void;
  // 修改emoji
  changeEmoji: (node: TreeItemData, emoji: string) => void;
}

const useDocListStore = create<DocList>((set) => ({
  docList: [],
  pinDocList: [],

  setDocList: (docList) => set({ docList }),

  setPinDocList: (pinDocList) => set({ pinDocList }),

  fetchDocList: async (callback) => {
    const res = await getDocList();
    const processTreeDataRes = processTreeData(res.data);
    set({ docList: processTreeDataRes });
    callback?.(res.data[0].spaceId);
  },
  fetchPinDocList: async () => {
    const res = await getPinDocList();
    const processTreeDataRes = processTreeData(res.data);
    set({ pinDocList: processTreeDataRes });
  },

  updateDocList: (newData, node) => {
    const processTreeDataRes = processTreeData(newData);
    const updatedDocList = updateTreeData(
      useDocListStore.getState().docList,
      node.blockId,
      { hasChildren: true, isLeaf: false },
      processTreeDataRes
    );
    const updatedPinDocList = updateTreeData(
      useDocListStore.getState().pinDocList,
      node.blockId,
      { hasChildren: true, isLeaf: false },
      processTreeDataRes
    );
    set({ docList: updatedDocList, pinDocList: updatedPinDocList });
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

  deleteDoc: async (node, successMsg = "删除成功", failMsg = "删除失败") => {
    try {
      const updateItem = (
        items: TreeItemData[],
        blockId: string
      ): TreeItemData[] => {
        return items.reduce<TreeItemData[]>((acc, item) => {
          if (item.blockId === blockId) {
            // 如果当前项的 blockId 匹配，不包含此项
            return acc;
          } else {
            // 创建一个新的 item 对象，避免直接修改原对象
            const newItem = { ...item };
            if (item.children && item.children.length > 0) {
              newItem.children = updateItem(item.children, blockId); // 更新子项
              if (newItem.children.length === 0) {
                newItem.hasChildren = false;
                newItem.isLeaf = true;
              }
            }
            acc.push(newItem); // 将新对象添加到累加器数组中
            return acc;
          }
        }, []);
      };
      Modal.confirm({
        title: "温馨提示",
        content: "删除后，下面的子文档也会被删除",
        cancelText: "取消",
        okText: "确定",
        onOk: async () => {
          // 表示是否是文档库
          const flag = node.spaceId === useDocLib.getState().docLibId;
          await delDoc(node.blockId);
          if (flag) {
            const newDocList = updateItem(
              useDocListStore.getState().docList,
              node.blockId
            );
            const newPinDocList = updateItem(
              useDocListStore.getState().pinDocList,
              node.blockId
            );
            set({ docList: newDocList, pinDocList: newPinDocList });
          } else {
            const space = useSpaceList
              .getState()
              .spaceList.filter((item) => item.spaceId === node.spaceId);
            if (space.length > 0) {
              const newSpaceList = updateItem(
                useSpaceList.getState().spaceList,
                node.blockId
              );
              const newPinSpaceList = updateItem(
                useSpaceList.getState().pinSpaceList,
                node.blockId
              );
              useSpaceList.setState({
                spaceList: newSpaceList,
                pinSpaceList: newPinSpaceList,
              });
            }
          }
          message.success(successMsg);
        },
      });
    } catch {
      message.error(failMsg);
    }
  },
  renameDoc: async (node, title) => {
    try {
      // 表示是否是文档库
      const flag = node.spaceId === useDocLib.getState().docLibId;
      const newTitle = title.trim();
      await updateDoc({ blockId: node.blockId, data: { title: newTitle } });
      const renameItem = (items: TreeItemData[]): TreeItemData[] => {
        return items.map((item) => {
          if (item.blockId === node.blockId) {
            return { ...item, title: newTitle, name: newTitle };
          }
          if (item.children) {
            return { ...item, children: renameItem(item.children) };
          }
          return item;
        });
      };
      // 表示是在文档库列表下的而不是空间下的
      if (flag) {
        const newDocList = renameItem(useDocListStore.getState().docList);
        const newPinDocList = renameItem(useDocListStore.getState().pinDocList);
        set({ docList: newDocList, pinDocList: newPinDocList });
      } else {
        const space = useSpaceList
          .getState()
          .spaceList.filter((item) => item.spaceId === node.spaceId);
        if (space.length > 0) {
          const newSpaceList = renameItem(useSpaceList.getState().spaceList);
          const newPinSpaceList = renameItem(
            useSpaceList.getState().pinSpaceList
          );
          useSpaceList.setState({
            spaceList: newSpaceList,
            pinSpaceList: newPinSpaceList,
          });
        }
      }
      message.success("修改成功");
    } catch {
      message.error("修改失败");
    }
  },
  collectDoc: async (node) => {
    let hasCollected = false;
    // 判断是不是文档库中的文档
    const flag = node.spaceId === useDocLib.getState().docLibId;
    await collectedDoc(node.blockId);
    const updateItem = (items: TreeItemData[]): TreeItemData[] => {
      return items.map((item) => {
        if (item.blockId === node.blockId) {
          if (!item.isFavorite) {
            hasCollected = true;
          } else {
            hasCollected = false;
          }
          return { ...item, isFavorite: !item.isFavorite };
        }
        if (item.children) {
          return { ...item, children: updateItem(item.children) };
        }
        return item;
      });
    };
    if (flag) {
      const newDocList = updateItem(useDocListStore.getState().docList);
      const newPinDocList = updateItem(useDocListStore.getState().pinDocList);
      set({ docList: newDocList, pinDocList: newPinDocList });
    } else {
      // 查询当前文档的空间
      const space = useSpaceList
        .getState()
        .spaceList.filter((item) => item.spaceId === node.spaceId);
      if (space.length > 0) {
        const newSpaceList = updateItem(useSpaceList.getState().spaceList);
        const newPinSpaceList = updateItem(
          useSpaceList.getState().pinSpaceList
        );
        useSpaceList.setState({
          spaceList: newSpaceList,
          pinSpaceList: newPinSpaceList,
        });
      }
    }
    if (hasCollected) {
      message.success("收藏成功");
    } else {
      message.success("取消收藏");
    }
  },
  // 置顶文档
  pinDoc: async (node) => {
    let hasPinned = false;
    const flag = node.spaceId === useDocLib.getState().docLibId;
    await pinedDoc(node.blockId);
    const updateItem = (items: TreeItemData[]): TreeItemData[] => {
      return items.map((item) => {
        if (item.blockId === node.blockId) {
          if (!item.isPinned) {
            hasPinned = true;
            const pinDocList = [
              ...useDocListStore.getState().pinDocList,
              { ...item, isPinned: true },
            ];
            set({ pinDocList });
          } else {
            hasPinned = false;
            const pinDocList = useDocListStore
              .getState()
              .pinDocList.filter((item) => item.blockId !== node.blockId);
            set({ pinDocList });
          }
          return { ...item, isPinned: !item.isPinned };
        }
        if (item.children) {
          return { ...item, children: updateItem(item.children) };
        }
        return item;
      });
    };
    if (flag) {
      const newDocList = updateItem(useDocListStore.getState().docList);
      set({ docList: newDocList });
    } else {
      // 查询当前文档的空间
      const space = useSpaceList
        .getState()
        .spaceList.filter((item) => item.spaceId === node.spaceId);
      if (space.length > 0) {
        const newSpaceList = updateItem(useSpaceList.getState().pinSpaceList);
        useSpaceList.setState({ pinSpaceList: newSpaceList });
      }
    }
    if (hasPinned) {
      message.success("置顶成功");
    } else {
      message.success("取消置顶");
    }
  },
  // 修改emoji
  changeEmoji: async (node, emoji) => {
    try {
      // 表示在当前文档下
      const flag = node.spaceId === useDocLib.getState().docLibId;
      await updateDoc({ blockId: node.blockId, data: { emoji } });
      const updateItem = (items: TreeItemData[]): TreeItemData[] => {
        return items.map((item) => {
          if (item.blockId === node.blockId) {
            return { ...item, emoji: emoji };
          }
          if (item.children) {
            return { ...item, children: updateItem(item.children) };
          }
          return item;
        });
      };
      // 先调用一下
      // 表示是在文档库列表下的而不是空间下的
      if (flag) {
        const newDocList = updateItem(useDocListStore.getState().docList);
        const newPinDocList = updateItem(useDocListStore.getState().pinDocList);
        set({ docList: newDocList, pinDocList: newPinDocList });
      } else {
        // 先找到是在哪个空间下的
        const space = useSpaceList
          .getState()
          .spaceList.filter((item) => item.spaceId === node.spaceId);
        if (space.length > 0) {
          const newSpaceList = updateItem(useSpaceList.getState().spaceList);
          const newPinSpaceList = updateItem(
            useSpaceList.getState().pinSpaceList
          );
          useSpaceList.setState({
            spaceList: newSpaceList,
            pinSpaceList: newPinSpaceList,
          });
        }
      }
      message.success("修改成功");
    } catch {
      message.error("修改失败");
    }
  },
}));

export default useDocListStore;
