import { v4 as uuid } from "uuid";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { TiptapTransformer } from "@hocuspocus/transformer";
import type { EditorUser } from "@/pages/editor/types";
import * as Y from "yjs";

type OperationType = "insert" | "delete" | "replace" | "format" | "other";

interface HistoryRecord {
  id: string;
  timestamp: number;
  username: string;
  operation: OperationType;
  content: Uint8Array;
  decription: string;
}

interface CollaborationHistoryOptions {
  provider: HocuspocusProvider | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    collaborationHistory: {
      rollbackToVersion: (version: string) => ReturnType;
    };
  }
}

const CollaborationHistoryKey = new PluginKey("collaborationHistory");

function diff(oldVal: any, newVal: any, yDoc: Y.Doc) {
  return {
    id: uuid(),
    timestamp: Date.now(),
    operation: "insert",
    decription: "新增节点",
    usernane: "gongyi",
    content: Y.encodeStateAsUpdate(yDoc),
  };
}

function analyzeUpdate(update: Uint8Array, curThis: any) {
  // 和lastSnapshot进行比较
  const provider = curThis.options.provider;
  if (!provider) return;
  // 文档内容
  const yDoc = provider.document;
  const json1 = TiptapTransformer.fromYdoc(yDoc, "prosemirror");
  const lastSnapshotDoc = new Y.Doc();

  Y.applyUpdate(lastSnapshotDoc, curThis.storage.lastSnapshot.content);
  const lastSnapshotXmlFragment = lastSnapshotDoc.get(
    "prosemirror",
    Y.XmlFragment
  ) as Y.XmlFragment;
  const json2 = TiptapTransformer.fromYdoc(lastSnapshotDoc, "prosemirror");
  const newLastSnapshot = diff(json2, json1, yDoc);
  const historyArray = yDoc.getArray("history");
  const doc = provider.document;
  doc.transact(() => {
    historyArray.push([newLastSnapshot]);
  });
  curThis.storage.lastSnapshot = newLastSnapshot;
}

function createHistoryRecord(update: Uint8Array, origin: any, curThis: any) {
  console.log(curThis.storage.clientIDMap);
  if (origin instanceof HocuspocusProvider) {
    for (const [clientID, { user }] of origin.awareness!.getStates()) {
      if (!curThis.storage.clientIDMap.has(clientID)) {
        curThis.storage.clientIDMap.set(clientID, user);
      }
    }
  } else if (origin instanceof PluginKey) {
    // 这时候可以拿到本地更新的内容,
    console.log("CollaborationHistory: 收到更新", "本地更新", origin);
    analyzeUpdate(update, curThis);
  }
}

export const CollaborationHistory =
  Extension.create<CollaborationHistoryOptions>({
    name: "collaborationHistory",

    addOptions() {
      return {
        provider: null,
      };
    },
    addStorage() {
      return {
        historyRecords: [] as HistoryRecord[],
        clientIDMap: new Map<number, EditorUser>(),
        origin: [] as Uint8Array[],
        lastSnapshot: {} as HistoryRecord,
      };
    },
    onCreate() {
      if (!this.options.provider) {
        console.error("CollaborationHistory: 必须提供 provider 选项");
        return;
      }
      let initialized = false;
      this.options.provider.on("synced", () => {
        // 可以拿到初始化的数据，可以存储到storage中空文档
        this.storage.origin = this.options.provider?.document
          .getMap("meta")
          .get("origin") as Uint8Array;
        const arr = this.options.provider?.document
          .getArray("history")
          .toArray();
        this.storage.historyRecords = arr;
        // 更新此时的lastSnapshot
        this.storage.lastSnapshot = arr?.length
          ? arr[arr.length - 1]
          : {
              id: "initial",
              timestamp: 0,
              usernam: "unknown",
              operation: "other",
              content: this.options.provider?.document
                .getMap("meta")
                .get("origin") as Uint8Array,
              description: "初始化文档内容",
            };
        console.log(this.storage.lastSnapshot);
      });
      this.options.provider.document.on(
        "update",
        (update: Uint8Array, origin: any) => {
          console.log();
          if (!initialized) {
            initialized = true;
            // 跳过第一次的恢复数据
            for (const [clientID, { user }] of origin.awareness.getStates()) {
              this.storage.clientIDMap.set(clientID, user);
            }
            return;
          }
          createHistoryRecord(update, origin, this);
        }
      );
    },
    addCommands() {
      return {
        rollbackToVersion: (version: string) => () => {
          console.log(version);
          const { provider } = this.options;
          if (!provider) return;

          const doc = provider.document;
          const historyArray = doc
            .getArray("history")
            .toArray() as HistoryRecord[];
          const historyRecord = historyArray.find(
            (record) => version === record.id
          );
          console.log(historyArray);
          
          console.log(historyRecord);
          
          if (!historyRecord) return;
          console.log(historyRecord);
          doc.transact(() => {
            Y.applyUpdate(doc, historyRecord.content);
            // editor.commands.setContent(
            //   TiptapTransformer.fromYdoc(doc, "prosemirror")
            // );
          });
        },
      };
    },
  });
export default CollaborationHistory;
