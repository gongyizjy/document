import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Splitter, Badge, Button, Drawer, List, Space } from "antd";
import { ToastContainer } from "react-toastify";
import { BellOutlined, InfoCircleFilled } from "@ant-design/icons";
import useWebSocket from "@/hooks/useWebSocket";
import { useNotificationStore } from "@/store";
import { Invitaion } from "@/hooks/types";
import Side from "./components/sider";
import "./index.css";

const Layout: React.FC = () => {
  const [open, setOpne] = useState(false); // 侧边栏是否展开[true展开，false收起
  const { total, fetchNotifications, notifications, removeNotification } =
    useNotificationStore();
  // 开启websocket
  const { sendMessage } = useWebSocket();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleClick = (type: "accepted" | "rejected", data: Invitaion) => {
    sendMessage({
      type,
      data,
    });
  };
  return (
    <Splitter>
      <Splitter.Panel
        defaultSize={268}
        max="50%"
        min={268}
        className="layout-sider"
      >
        <Side />
      </Splitter.Panel>
      <Splitter.Panel className="layout-content">
        <Outlet />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Badge
          count={total}
          overflowCount={99}
          className="fixed right-20 bottom-8"
        >
          <Button
            onClick={() => {
              setOpne(true);
            }}
          >
            <BellOutlined />
          </Button>
        </Badge>
        <Drawer
          title="通知"
          width={350}
          height={400}
          open={open}
          onClose={() => setOpne(false)}
        >
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item key={`${item.type}-${item.targetId}`} actions={[]}>
                <List.Item.Meta
                  style={{ alignItems: "center" }}
                  avatar={<InfoCircleFilled className="text-addFile text-xl" />}
                  title="协作邀请"
                  description={
                    <>
                      <p>
                        <span className="font-bold">{item.inviter}</span>{" "}
                        邀请您加入 {item.type === "doc" ? "文档" : "空间"}{" "}
                        {item.name} 的协作
                      </p>
                      <Space className="mt-3">
                        <Button
                          type="primary"
                          onClick={() => {
                            handleClick("accepted", item);
                            removeNotification(item.targetId);
                          }}
                        >
                          同意
                        </Button>

                        <Button
                          color="danger"
                          variant="solid"
                          onClick={() => {
                            handleClick("rejected", item);
                            removeNotification(item.targetId);
                          }}
                        >
                          拒绝
                        </Button>
                      </Space>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Drawer>
      </Splitter.Panel>
    </Splitter>
  );
};

export default Layout;
