import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginType } from "@/types";
import { AuthContext } from "@/contexts/AuthContext";
import CryptoJS from "crypto-js";
import { config } from "@/config/env";

export const LoginForm = () => {
  const [form] = Form.useForm<LoginType>();
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const secret = config.SECRET_KEY;

  const rememberKey = "stoque_remember";
  const usernameKey = "stoque_username";
  const passwordKey = "stoque_password";

  useEffect(() => {
    const rememberMe = localStorage.getItem(rememberKey);
    const username = localStorage.getItem(usernameKey);
    const password = localStorage.getItem(passwordKey);

    const remember = rememberMe == "true";

    if (remember && username && password) {
      const decryptPass = CryptoJS.AES.decrypt(password, secret).toString(
        CryptoJS.enc.Utf8
      );

      form.setFieldsValue({
        username: username,
        password: decryptPass,
        remember: remember,
      });
    }
  }, [secret]);

  const onFinish = async (values: LoginType) => {
    try {
      setLoading(true);
      const result = await signIn({
        username: values.username,
        password: values.password,
      });

      if (values.remember) {
        const encryptPass = CryptoJS.AES.encrypt(
          values.password,
          secret
        ).toString();

        localStorage.setItem(rememberKey, values.remember.toString());
        localStorage.setItem(usernameKey, values.username.toString());
        localStorage.setItem(passwordKey, encryptPass);
      } else {
        localStorage.removeItem(rememberKey);
        localStorage.removeItem(usernameKey);
        localStorage.removeItem(passwordKey);
      }

      if (!result) toast.success("Login efetuado com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      className="mt-10 w-full"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Nenhum campo pode ficar vazio" }]}
        label="E-mail"
        layout="vertical"
      >
        <Input
          className="rounded-md"
          size="large"
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Nenhum campo pode ficar vazio" }]}
        label="Senha"
        layout="vertical"
      >
        <Input.Password
          className="rounded-md"
          id="password"
          type="password"
          placeholder="Digite sua senha"
          size="large"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item name="remember" noStyle>
        <Checkbox id="remember">Lembrar de mim</Checkbox>
      </Form.Item>

      <Form.Item className="mt-4">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
