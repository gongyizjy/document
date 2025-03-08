import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { RuleObject } from "antd/es/form";
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
  const validator = (rule: RuleObject, value: string) => {
    if (rule.type === "email") {
      if (!value) {
        // 如果值为空，返回必填的错误消息
        return Promise.reject("请输入邮箱");
      }
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        return Promise.reject("请输入正确的邮箱");
      }
    }
    return Promise.resolve();
  };
  const handleSubmit =  () => {
    form.validateFields().then((values: RegisterData) => {
     run(values);
    });
  };
  return (
    <div>
      <Form name="register" form={form}>
        <Form.Item
          name="username"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "请输入用户名" }]}
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
          rules={[
            {
              type: "email",
              validator: validator,
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
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password
            placeholder="请输入密码"
            prefix={<Icon name="KeyRound" className="text-icon" />}
            className="h-10"
          />
        </Form.Item>
      </Form>
      <div className="login-footer">
        <Button type="primary" onClick={handleSubmit}>
          注册
        </Button>
      </div>
    </div>
  );
}

export default Register;
