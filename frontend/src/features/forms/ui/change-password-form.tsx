import { Form, Input } from "antd"

export const ChangePasswordForm = () => {
  return (
    <Form size="large">
      <Form.Item label="Логин" name={"username"}>
        <Input
          placeholder="login"
        />
      </Form.Item>

      <Form.Item label="Пароль" name={"password"}>
        <Input
          placeholder="password"
        />
      </Form.Item>
    </Form>
  )
}