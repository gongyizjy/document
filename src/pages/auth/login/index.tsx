import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, Space, Button, message } from "antd";
import { captcha, login, LoginData } from "@/apis";
import { Icon } from "@/components/ui/Icon";

function Login() {
  const [form] = Form.useForm();
  const [svg, setSvg] = useState("");
  const { run: getCaptcha } = useRequest(captcha, {
    manual: true,
    onSuccess: (res: string) => {
      setSvg(res);
    },
  });
  const { run } = useRequest(login, {
    manual: true,
    onSuccess: () => {
      message.success("登陆成功");
    },
    onError: () => {
      getCaptcha();
    },
  });
  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values: LoginData) => {
        run(values);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="login-container">
      <Form name="login" form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            placeholder="请输入用户名"
            prefix={<Icon name="User" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password
            placeholder="请输入密码"
            prefix={<Icon name="KeyRound" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Space>
            <Input
              placeholder="请输入验证码"
              maxLength={6}
              prefix={<Icon name="ShieldCheck" className="text-icon" />}
              className="h-10"
            />
            <div
              className="h-10"
              onClick={getCaptcha}
              dangerouslySetInnerHTML={{ __html: svg }}
            ></div>
          </Space>
        </Form.Item>
      </Form>
      <div className="login-footer">
        <Button type="primary" onClick={handleSubmit}>
          登陆
        </Button>
      </div>
    </div>
  );
}

export default Login;
