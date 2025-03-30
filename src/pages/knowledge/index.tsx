import { useState } from "react";
import {
  Avatar,
  Button,
  Empty,
  Input,
  message,
  Tooltip,
  Typography,
} from "antd";
// import { useRequest } from "ahooks";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { CreateSpaceModal } from "@/containers";
import { useUserInfo, useSpaceList } from "@/store";
import { Icon } from "@/components/ui/Icon";
import AddOrUpload from "@/components/add-or-upload";

import "./index.css";

function Konwledge() {
  const [open, setOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const { pinSpace, spaceList } = useSpaceList();

  return (
    <div className="konwledge-container">
      <div className="konwledge-header">
        <span className="konwledge-title">
          空间
          <Icon name="BookOpenText" className="w-5 h-5 text-side-icon ml-2" />
        </span>
        {userInfo.avatar ? (
          <Avatar src={userInfo.avatar} size="large" />
        ) : (
          <Avatar size="large" style={{ backgroundColor: "#f56a00" }}>
            {userInfo?.username.slice(0, 1).toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className="konwledge-content">
        <AddOrUpload type="addFile" className="mr-2" />
        <AddOrUpload type="addSpace" className="mr-2" />
      </div>
      {spaceList &&
        spaceList.length > 0 &&
        spaceList.find((item) => item.isPinned) && (
          <div className="konwledge-content-list ">
            <div className="konwledge-content-list-title mb-5">
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  marginLeft: "24px",
                }}
              >
                置顶的空间
              </p>
            </div>
            <div className="konwledge-content-list-content">
              {spaceList.map((item) => {
                if (item.isPinned) {
                  return (
                    <div
                      key={item.spaceId}
                      className="wiki-space w-[140px] h-[196px] cursor-pointer relative p-4 mr-6 mb-6 rounded-lg"
                    >
                      <div className="grid-background absolute top-0 left-0 w-full h-full rounded-lg">
                        <img
                          className="w-full h-full rounded-lg block"
                          src={item.cover}
                          alt=""
                        />
                        <Tooltip title={item.isPinned ? "取消置顶" : "置顶"}>
                          <div
                            className="pin right-2 top-2 absolute flex items-center justify-center rounded-md hover:bg-[#1f232914] w-5 h-5 opacity-0"
                            onClick={() => pinSpace(item.spaceId)}
                          >
                            <Icon
                              name={item.isPinned ? "PinOff" : "Pin"}
                              className="text-side-icon"
                            />
                          </div>
                        </Tooltip>
                      </div>
                      <h3 className="wiki-space-grid-item-title ellipsis-multi">
                        {item.name}
                      </h3>
                      <p className="wiki-space-grid-item-desc ellipsis-multi">
                        {item.description}
                      </p>
                      <button
                        className="wiki-button flex items-center justify-center absolute bottom-0 left-0 w-full h-9 text-white bg-[#0000008c] rounded-b-lg opacity-0"
                        onClick={() => {
                          message.success("暂未开放");
                        }}
                      >
                        <SettingOutlined />
                        <span className="ml-1">空间设置</span>
                      </button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      <div className="konwledge-content-list ">
        <div className="konwledge-content-list-title mb-5">
          <p style={{ fontSize: "16px", fontWeight: 500, marginLeft: "24px" }}>
            全部空间
          </p>
          <Input
            prefix={
              <SearchOutlined style={{ fontSize: "16px", color: "#d2d8dc" }} />
            }
            placeholder="搜索空间"
            className="w-52 h-8"
          />
        </div>
        {spaceList && spaceList.length > 0 ? (
          <div className="konwledge-content-list-content">
            {spaceList.map((item) => {
              return (
                <div
                  key={item.spaceId}
                  className="wiki-space w-[140px] h-[196px] cursor-pointer relative p-4 mr-6 mb-6 rounded-lg"
                >
                  <div className="grid-background absolute top-0 left-0 w-full h-full rounded-lg">
                    <img
                      className="w-full h-full rounded-lg block"
                      src={item.cover}
                      alt=""
                    />
                    <Tooltip title={item.isPinned ? "取消置顶" : "置顶"}>
                      <div
                        className="pin right-2 top-2 absolute flex items-center justify-center rounded-md hover:bg-[#1f232914] w-5 h-5 opacity-0"
                        onClick={() => pinSpace(item.spaceId)}
                      >
                        <Icon
                          name={item.isPinned ? "PinOff" : "Pin"}
                          className="text-side-icon"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <h3 className="wiki-space-grid-item-title ellipsis-multi">
                    {item.name}
                  </h3>
                  <p className="wiki-space-grid-item-desc ellipsis-multi">
                    {item.description}
                  </p>
                  <button
                    className="wiki-button flex items-center justify-center absolute bottom-0 left-0 w-full h-9 text-white bg-[#0000008c] rounded-b-lg opacity-0"
                    onClick={() => {
                      message.success("暂未开放");
                    }}
                  >
                    <SettingOutlined />
                    <span className="ml-1">空间设置</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            className="flex flex-col items-center justify-center mt-10"
            description={<Typography.Text>暂无知识空间</Typography.Text>}
          >
            <Button
              type="primary"
              onClick={() => {
                setOpen(!open);
              }}
            >
              新建空间
            </Button>
          </Empty>
        )}
      </div>
      <CreateSpaceModal open={open} setOpen={setOpen} />
    </div>
  );
}
export default Konwledge;
