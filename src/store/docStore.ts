import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { ItemData, getDocList } from "@/apis";

interface CacheItem {
  data: ItemData[];
  timestamp: number;
}

interface DocState {
  spaces: {
    docs: {
      own: ItemData[];
      shared: ItemData[];
    };
    knowledge: {
      own: ItemData[];
      shared: ItemData[];
    };
  };
  childrenCache: Map<string, CacheItem>;
  setSpaces: (spaces: DocState["spaces"]) => void;
  getChildren: (blockId?: string, spaceId?: string) => Promise<ItemData[]>;
  preloadChildren: (blockId: string, spaceId: string) => void;
  clearExpiredCache: () => void;
}

// 缓存过期时间：10分钟
const CACHE_EXPIRY = 10 * 60 * 1000;

const useDocStore = create<DocState>((set, get) => ({
  spaces: {
    docs: {
      own: [],
      shared: [],
    },
    knowledge: {
      own: [],
      shared: [],
    },
  },
  childrenCache: new Map(),

  setSpaces: (spaces) => set({ spaces }),

  getChildren: async (blockId, spaceId) => {
    const cache = get().childrenCache;
    const now = Date.now();

    // 检查缓存是否存在且未过期
    const cachedItem = cache.get(blockId!);
    if (cachedItem && now - cachedItem.timestamp < CACHE_EXPIRY) {
      return cachedItem.data;
    }

    try {
      const response = await getDocList(spaceId, blockId);
      const children = response.data.map((item: ItemData) => ({
        ...item,
        key: item.blockId || uuid(),
        title: item.title || item.name,
        emoji: item.emoji || "📄",
        hasChildren: item.hasChildren || false,
      }));

      // 添加到缓存，包含时间戳
      cache.set(blockId!, {
        data: children,
        timestamp: now,
      });

      return children;
    } catch (error) {
      console.error("加载子节点失败:", error);
      return [];
    }
  },

  preloadChildren: (blockId: string, spaceId: string) => {
    const state = get();
    const now = Date.now();
    const cachedItem = state.childrenCache.get(blockId);

    // 只有在没有缓存或缓存已过期的情况下才预加载
    if (!cachedItem || now - cachedItem.timestamp >= CACHE_EXPIRY) {
      const idleCallback =
        window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      idleCallback(async () => {
        await state.getChildren(blockId, spaceId);
      });
    }
  },

  // 清理过期缓存
  clearExpiredCache: () => {
    const cache = get().childrenCache;
    const now = Date.now();

    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp >= CACHE_EXPIRY) {
        cache.delete(key);
      }
    }
  },
}));

export default useDocStore;
