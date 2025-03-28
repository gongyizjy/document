import { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { Icon } from "@/components/ui/Icon";
import "./index.css";
import SiderDoc from "./sider-doc";
import SiderPinDoc from "./sider-pin-doc";
function Side() {
  const [activeLink, setActiveLink] = useState("/");
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };
  return (
    <>
      <nav className="side-nav-container">
        <Input className="side-nav-item" />

        <Link
          className={classNames("text-sm", "side-nav-item", {
            selected: activeLink === "/",
          })}
          onClick={() => handleLinkClick("/")}
          to="/"
        >
          <Icon
            name="House"
            className={classNames("text-side-icon", "w-5", "h-5", "mr-2", {
              "text-side-icon-active": activeLink === "/",
            })}
          />
          主页
        </Link>

        <Link
          className={classNames("text-sm", "side-nav-item", {
            selected: activeLink === "/wiki",
          })}
          to="/wiki"
          onClick={() => handleLinkClick("/wiki")}
        >
          <Icon
            name="LibraryBig"
            className={classNames("text-side-icon", "w-5", "h-5", "mr-2", {
              "text-side-icon-active": activeLink === "/wiki",
            })}
          />
          知识库
        </Link>
      </nav>
      <div>
        <SiderPinDoc />
        <SiderDoc />
      </div>
    </>
  );
}
export default Side;
