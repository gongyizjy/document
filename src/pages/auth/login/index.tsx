import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, Space, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { captcha, login, LoginData } from "@/apis";
import { useUserInfo, useDocLib } from "@/store";
import { Icon } from "@/components/ui/Icon";

function Login() {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();
  const { setDocLibId } = useDocLib();
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
    onSuccess: (res) => {
      message.success("登陆成功");
      // 登陆成功后，存储用户信息
      setUserInfo({
        username: res.data.username,
        avatar: res.data.avatar,
        email: res.data.email,
        id: res.data.id,
      });
      setDocLibId(res.data.defaultSpaceId!);

      navigate("/docs/f2c3fbc5-45bf-49b6-88eb-6a2449d1e247");
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
      <Form name="login" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          required
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            placeholder="请输入用户名"
            prefix={<Icon name="User" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item
          required
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
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
