import { Button, Form, Input, InputNumber, message, notification, Radio } from "antd"
import { styled } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { signUpThunk } from "@entities/slices/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "app/store"
import Cookies from 'js-cookie'
import { useState } from "react"

export const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [role, setRole] = useState("ROLE_USER")

  const rules = [{
    required: true,
    message: 'Вы пропустили обязательное поле'
  }]

  const handleLogIn = () => {
    navigate('/log-in')
  }

  const onFinish = async (data: any) => {
    try {
      const dataWithRole = {
        ...data,
        role: role
      }
      const response = await dispatch(signUpThunk(dataWithRole)).unwrap()
      message.success({
        content: 'Вы успешно зарегистрировались',
      })
      Cookies.set('token', response)
      navigate('/private-office/profile')
    } catch (error) {
      message.error({
        content: 'Произошла ошибка при регистрации'
      })
      console.log(error)
    }
  }

  return (
    <Box>
      <Title>
        Регистрация
      </Title>

      <Form layout="vertical" size="large" onFinish={onFinish}>
        <Radio.Group defaultValue="user" buttonStyle="solid"> 
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

      <Registrate>
        <span>Уже есть аккаунт?</span>
        <Link to={"/log-in"}>
          <span onClick={handleLogIn} style={{ color: '#0B6623', marginLeft: '5px' }}>Войти</span>
        </Link>
      </Registrate>
    </Box>
  )
}

const Registrate = styled(Form)`
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
