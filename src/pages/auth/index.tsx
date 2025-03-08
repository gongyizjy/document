import { Outlet, Link } from "react-router-dom"
import './index.css'
function Auth() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>多人文档在线编辑</h1>
      </div>
      <div className="auth-content">
        <div className="auth-title">
          <Link className="" to="/auth/login">登录</Link>
          <Link to="/auth/register">注册</Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth
