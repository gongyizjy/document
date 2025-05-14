import { useEffect, useRef, useCallback } from "react";
import { message as Message } from "antd";
import { toast } from "react-toastify";
import { useNotificationStore } from "@/store";
import { Invitaion } from "./types";

interface WebSocketData {
  type: string;
  data: Invitaion;
}

function useWebSocket() {
  const { addNotification } = useNotificationStore();
  const wsRef = useRef<WebSocket | null>(null);
  const sendMessage = useCallback((message: WebSocketData) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      Message.error("WebSocket 连接未就绪");
    }
  }, []);
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080?token=${localStorage.getItem("token")}`
    );

    wsRef.current = ws;
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "invitation": {
          const { data } = message;
          toast.info(
            <div>
              <h3>协作邀请</h3>
              <p>
                {data.inviter} 邀请您加入 {data.name}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => {
                    sendMessage({
                      type: "accept-invitation",
                      data: {
                        type: data.type,
                        targetId: data.targetId,
                        name: data.name,
                        inviter: data.inviter,
                        invitee: data.invitee,
                        status: "accepted",
                        accessLevel: "read",
                      },
                    });
                  }}
                >
                  同意
                </button>
                <button
                  onClick={() => {
                    // sendMessage({
                    //   type: message.type,
                    //   targetId: message.targetId,
                    //   name: message.name,
                    //   inviter: message.inviter,
                    //   invitee: message.invitee,
                    //   status: "rejected",
                    //   accessLevel: "read",
                    // });
                  }}
                >
                  拒绝
                </button>
              </div>
            </div>
          );
          addNotification({ ...data });
          break;
        }
        case "accepted": {
          toast("邀请已同意");
          break;
        }
        case "rejected": {
          toast("邀请已拒绝");
          break;
        }
      }
    };
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [addNotification, sendMessage]);
  return { sendMessage };
}
export default useWebSocket;
