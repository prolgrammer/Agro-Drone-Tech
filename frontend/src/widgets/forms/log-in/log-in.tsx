import { Button, Form, Input, message } from "antd"
import { styled } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { signInThunk } from "@entities/slices/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "app/store"
import Cookies from 'js-cookie'

export const LogInForm = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const onFinish = async (data: any) => {
    try {
      const response = await dispatch(signInThunk(data)).unwrap()
      message.success({
        content: 'Вы успешно вошли',
      })
      Cookies.set('token', response)
      navigate('/private-office/profile')
    } catch (error) {
      message.error({
        content: 'Произошла ошибка при входе'
      })
      console.log(error)
    }
  }
    
  const rules = [{
    required: true,
    message: 'Вы пропустили обязательное поле'
  }]

  return (
    <Box>
      <Title>
        Вход
      </Title>

      <Form  layout="vertical" size="large" onFinish={onFinish}>
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

      <Registrate>
        <span>Еще нет аккаунта?</span> 
        <Link to={"/sign-up"}>
          <span style={{ color: '#0B6623', marginLeft: '5px' }}>Зарегистрироваться</span>
        </Link>
      </Registrate>
    </Box>
  )
}

const Registrate = styled.div`
  margin: 44px auto 0 auto;
`
const Box = styled.div`
  border-top: 2px solid #0B6623;
  padding: 80px 20px 130px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`
const Title = styled.div`
  margin: 0 auto; 
  color: #0B6623;
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
`
