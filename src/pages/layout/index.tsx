import React from "react";
import { Outlet } from "react-router-dom";
import { Splitter } from "antd";
import Side from "./components/sider";
import "./index.css";

const Layout: React.FC = () => {

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
      </Splitter.Panel>
    </Splitter>
  );
};

export default Layout;
