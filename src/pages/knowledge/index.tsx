import { Avatar, Input } from "antd";
// import { useRequest } from "ahooks";
import { SearchOutlined } from "@ant-design/icons";
// import { Outlet } from "react-router-dom";
import AddOrUpload from "@/components/add-or-upload";
import { useUserInfo } from "@/store";
import { Icon } from "@/components/ui/Icon";
import "./index.css";

function Home() {
  const { userInfo } = useUserInfo();
  return (
    <div className="konwledge-container">
      <div className="konwledge-header">
        <span className="konwledge-title">
          知识库
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
        <AddOrUpload type="add" className="mr-2" />
      </div>
      <div className="konwledge-content-list">
        <div className="konwledge-content-list-title">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>全部知识库</p>
          <Input prefix={<SearchOutlined style={{  fontSize: '16px', color: '#d2d8dc' }} />}  placeholder="搜索知识库" className="w-52 h-8" />
        </div>
        
      </div>
    </div>
  );
}
export default Home;
