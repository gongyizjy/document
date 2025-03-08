import { Form, Input, Space } from "antd";
import { Icon } from "@/components/ui/Icon";
function Login() {
  return (
    <div className="login-container">
      <Form name="login" style={{ width: 520 }}>
        <div className="title-container">
          <h1>多人文档在线编辑</h1>
        </div>
        <Form.Item name="username">
          <Input
            prefix={<Icon name="User" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            prefix={<Icon name="KeyRound" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Input
              maxLength={6}
              prefix={<Icon name="ShieldCheck" className="text-icon" />}
              className="h-10"
            />
            <div className="h-10"></div>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
