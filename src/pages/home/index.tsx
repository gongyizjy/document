import { Avatar } from "antd";
// import { Outlet } from "react-router-dom";
import AddOrUpload from "@/components/add-or-upload";
import { useUserInfo } from "@/store";
import "./index.css";
function Home() {
  const { userInfo } = useUserInfo();
  return (
    <div className="home-container">
      <div className="home-header">
        <span className="home-title">主页</span>
        {userInfo.avatar ? (
          <Avatar src={userInfo.avatar} size="large" />
        ) : (
          <Avatar size="large" style={{ backgroundColor: "#f56a00" }}>
            {userInfo?.username.slice(0, 1).toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className="home-content">
        <AddOrUpload type="addFile" className="mr-2" />
        <AddOrUpload type="upload" />
      </div>
      <div className="home-content-list">
        在这可以查看最近浏览，与我共享，还有收藏的文档。后期可以写一下这方面的接口
      </div>
    </div>
  );
}
export default Home;
