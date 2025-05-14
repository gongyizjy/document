import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
function Auth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1 className="auth-title">多人文档在线编辑</h1>
        <Outlet />
        <div className="auth-footer">
          <button
            onClick={() =>
              navigate(
                pathname === "/auth/login" ? "/auth/register" : "/auth/login"
              )
            }
          >
            {pathname === "/auth/login"
              ? "没有账号？ 前往注册>>>"
              : "已有账号？ 前往登录>>>"}
          </button>
        </div>
      
      </div>
      <div className="mask" />
    </div>
  );
}

export default Auth;
