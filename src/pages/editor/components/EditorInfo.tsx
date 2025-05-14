import { memo } from "react";
import { Avatar } from "antd";
import { Tooltip } from "antd";
import { WebSocketStatus } from "@hocuspocus/provider";
import { cn } from "@/utils";
import { getConnectionText } from "@/utils/getConnecttionText";
import { EditorUser } from "../types";

export interface EditorInfoProps {
  characters: number;
  words: number;
  users: EditorUser[];
  collabState: WebSocketStatus;
}

export const EditorInfo = memo(
  ({ characters, users, collabState }: EditorInfoProps) => {
    return (
      <div className="flex items-center">
        <div className="flex flex-col justify-center pr-4 mr-4 text-right border-r border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {characters} 字符
          </div>
        </div>
        <div className="flex items-center gap-2 mr-2">
          <div
            className={cn("w-2 h-2 rounded-full", {
              "bg-yellow-500 dark:bg-yellow-400": collabState === "connecting",
              "bg-green-500 dark:bg-green-400": collabState === "connected",
              "bg-red-500 dark:bg-red-400": collabState === "disconnected",
            })}
          />
          <span className="max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
            {getConnectionText(collabState)}
          </span>
        </div>
        {collabState === "connected" && (
          <div className="flex flex-row items-center">
            <div className="relative flex flex-row items-center ml-3">
              {users.slice(0, 3).map((user: EditorUser) => (
                <div key={user.clientId} className="-ml-3">
                  <Tooltip title={user.name}>
                    {user.avatar ? (
                      <Avatar src={user.avatar} size="large" />
                    ) : (
                      <Avatar
                        size="large"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name.slice(0, 1).toUpperCase()}
                      </Avatar>
                    )}
                  </Tooltip>
                </div>
              ))}
              {users.length > 3 && (
                <div className="-ml-3">
                  <Tooltip title={`共有 ${users.length} 个协作者`}>
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                      +{users.length - 3}
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
