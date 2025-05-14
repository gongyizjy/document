import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useRequest } from "ahooks";
import { Icon } from "@/components/ui/Icon";
import { RegisterData, register } from "@/apis";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { run } = useRequest(register, {
    manual: true,
    onSuccess: () => {
      message.success("注册成功");
      navigate(-1);
    },
  });
  const handleSubmit = () => {
    form.validateFields().then((values: RegisterData) => {
      run(values);
    });
  };
  return (
    <div>
      <Form name="register" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          validateTrigger="onBlur"
          required
          rules={[
            { required: true, message: "请输入用户名" },
            {
              pattern: /^[a-zA-Z0-9_-]{4,16}$/,
              message: "请输入4-16位包含字母、数字、下划线或短横线的用户名",
            },
          ]}
        >
          <Input
            placeholder="请输入用户名"
            prefix={<Icon name="User" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item
          name="email"
          validateTrigger="onBlur"
          required
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: "请输入正确格式的邮箱",
            },
          ]}
        >
          <Input
            placeholder="请输入邮箱"
            prefix={<Icon name="Mail" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item
          name="password"
          validateTrigger="onBlur"
          required
          rules={[
            { required: true, message: "请输入密码" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\s\W]).{6,18}$/,
              message: "请输入6-18位包含大小写字母和特殊字符的密码",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入密码"
            prefix={<Icon name="KeyRound" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
