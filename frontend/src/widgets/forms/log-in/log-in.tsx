import { InputField } from "@shared/inputs"
import { useForm } from "effector-forms"
import { $$form } from "./model"
import { Button, Form } from "antd"
import { styled } from "styled-components"
import { Link } from "react-router-dom"

export const LogInForm = () => {
  const { fields } = useForm($$form)
  return (
    <Box>
      <Title>
        Вход
      </Title>

      <StyledForm>
        <InputField
          placeholder="Логин"
          field={fields.login}
          size="large"
        />
        <InputField
          placeholder="Пароль"
          field={fields.password}
          size="large"
        />
      </StyledForm>

      <Button type="primary" block style={{ borderRadius: '30px', width: '10%', margin: '29px auto 0px auto' }}>
        Продолжить
      </Button>

      <Registrate>
        <span>Еще нет аккаунта?</span> 
        <Link to={"/sign-up"}>
        <span style={{ color: '#0B6623', marginLeft: '5px' }}>Зарегистрироваться</span>
        </Link>
      </Registrate>
    </Box>
  )
}

const Registrate = styled(Form)`
  margin: 44px auto 0 auto;
`
const StyledForm = styled(Form)`
  width: 20%;
  margin: auto; 
   & > *:not(:last-child) {
    margin-bottom: 16px; 
  }
  margin-top: 50px;
`

const Box = styled.div`
  border-top: 2px solid #0B6623;
  padding: 80px 20px 130px;
  display: flex;
  flex-direction: column;
  justify-items: center;
`

const Title = styled.div`
  margin: 0 auto; 
  color: #0B6623;
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
`
