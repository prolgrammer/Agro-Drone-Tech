import { styled } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { SignInForm } from "@features/forms"

export const SignIn = () => {
  return (
    <Box>
      <Title>
        Вход
      </Title>

      <SignInForm />

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
