import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { signInThunk } from "@entities/slices/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "app/store"
import Cookies from 'js-cookie'

export const SignInForm = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const rules = [{
    required: true,
    message: 'Вы пропустили обязательное поле'
  }]

  const onFinish = async (data: any) => {
    try {
      const response = await dispatch(signInThunk(data)).unwrap()
      console.log(response)
      message.success({
        content: 'Вы успешно вошли',
      })
      Cookies.set('accessToken', response?.access)
      Cookies.set('refreshToken', response?.refresh)
      navigate('/private-office/profile')
    } catch (error) {
      message.error({
        content: 'Произошла ошибка при входе'
      })
      console.log(error)
    }
  }

  return (
    <Form layout="vertical" size="large" onFinish={onFinish}>
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
      
      <Button type="primary" block htmlType="submit">
        Продолжить
      </Button>
    </Form>
  )
}