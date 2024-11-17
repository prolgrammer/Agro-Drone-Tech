import { Button, Form, Input, message, Radio } from "antd"
import { signUpThunk } from "@entities/slices/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "app/store"
import Cookies from 'js-cookie'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {
  const dispatch: AppDispatch = useDispatch()
  const [role, setRole] = useState("ROLE_USER")

  const navigate = useNavigate()

  const rules = [{
    required: true,
    message: 'Вы пропустили обязательное поле'
  }]

  const onFinish = async (data: any) => {
    try {
      const dataWithRole = {
        ...data,
        roles: ["ROLE_USER"]
      }
      const response = await dispatch(signUpThunk(dataWithRole)).unwrap()
      
      message.success({
        content: 'Вы успешно зарегистрировались',
      })
      Cookies.set('accessToken', response?.access)
      Cookies.set('refreshToken', response?.refresh)
      navigate('/private-office/profile')
    } catch (error) {
      message.error({
        content: 'Произошла ошибка при регистрации'
      })
      console.log(error)
    }
  }

  return (
    <Form layout="vertical" size="large" onFinish={onFinish}>
      <Radio.Group defaultValue="user" buttonStyle="solid" style={{marginBottom: '5%'}}> 
        <Radio.Button value="user" type="primary" onClick={() => setRole("ROLE_USER")}>
          Пользователь
        </Radio.Button>
        <Radio.Button value="admin" type="primary" onClick={() => setRole("ROLE_ADMIN")}>
          Администратор
        </Radio.Button>
      </Radio.Group>

      <Form.Item
        name="username"
        label="Имя"
        rules={rules}
      >
        <Input
          placeholder="Иван"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={rules}
      >
        <Input.Password
          placeholder="12345678"
        />
      </Form.Item>
      {role === "ROLE_ADMIN" && (
        <Form.Item
          name="passwordAdmin"
          label="Пароль администратора"
          rules={rules}
        >
          <Input.Password
            placeholder="12345678"
          />
        </Form.Item>
      )}

      <Button type="primary" block htmlType="submit">
        Продолжить
      </Button>
    </Form>
  )
}
