import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Input, Popover, Button, Avatar, Tooltip } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useUserInfo } from "@/store";

interface ShareProps {
  type: "popover" | "modal";
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}
function Share({ open, onOpen, type }: ShareProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { userInfo } = useUserInfo();

  const content = (
    <div className="w-[480px] h-[329px]">
      {!searchValue && (
        <div className="flex justify-between items-center px-4 pt-3 pb-2">
          <h3 className="text-base">分享文档</h3>
          <div className="hover:bg-bg-emojiHover p-1 rounded-md cursor-pointer">
            权限设置
          </div>
        </div>
      )}
      <div className="flex justify-between items-center px-4 h-[54px]">
        <div>邀请协作者</div>
        <Tooltip title={`所有者: ${userInfo.username}`}>
          <div className="flex items-center justify-between w-[54px] h-[34px] cursor-pointer hover:bg-bg-emojiHover rounded-lg">
            {userInfo.avatar ? (
              <Avatar src={userInfo.avatar} />
            ) : (
              <Avatar style={{ backgroundColor: "#f56a00" }}>
                {userInfo?.username.slice(0, 1).toUpperCase()}
              </Avatar>
            )}
            <CaretRightOutlined style={{ color: "#8f959e" }} />
          </div>
        </Tooltip>
      </div>
      <div className="mx-4">
        <Input
          placeholder="可搜索用户名添加协作者"
          autoFocus={true}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Modal></Modal>
    </div>
  );
  return (
    <>
      {type === "modal" ? (
        <Modal
          open={open}
          onCancel={() => onOpen(false)}
          footer={null}
          closeIcon={false}
        >
          {content}
        </Modal>
      ) : (
        <Popover
          overlayClassName="my-popover"
          content={content}
          trigger="click"
          placement="bottomRight"
        >
          <Button type="primary">分享</Button>
        </Popover>
      )}
    </>
  );
}
export default Share;
