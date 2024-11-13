import logo from '@public/logo.svg'
import { styled } from 'styled-components'
import { Button, Flex } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  const handleGoLogIn = () => {
    navigate('/log-in')
  }
  const handleGoSignUp = () => {
    navigate('/sign-up')
  }

  return (
    <Wrapper>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <Flex gap={20} style={{ width: '40%' }}>
        <LoginButton type="primary" onClick={handleGoLogIn}>
          Войти
        </LoginButton>
        <LoginButton type="primary" onClick={handleGoSignUp}>
          Зарегистрироваться
        </LoginButton>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #84B290;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3%;
  padding-bottom: 0.5%;
`
const LoginButton = styled(Button)`
  border-radius: 30px;
  height: 45px;
  width: 30vh;
  color: #0B6623;
  background-color: white;
  margin-right: 40px;
`
