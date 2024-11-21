import logo from '@public/logo.svg'
import { styled } from 'styled-components'
import { Button, Flex, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { tokenDataSlice } from '@widgets/layouts/private-layout/model'

export const Header = () => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.token.id)
  const dispatch: AppDispatch = useDispatch()

  const handleGoLogIn = () => {
    navigate('/log-in')
  }
  const handleGoSignUp = () => {
    navigate('/sign-up')
  }

  const handleLogOut = () => {
    dispatch(tokenDataSlice.actions.clearProfile())
    message.success('Вы успешно вышли')
    navigate('/log-in')
  }

  return (
    <Wrapper>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <Flex>
        {userId ? (
          <LoginButton type="primary" onClick={handleLogOut} size='large'>
            Выйти
          </LoginButton>
        ) : (
          <>
            <LoginButton type="primary" onClick={handleGoLogIn} size='large'>
              Войти
            </LoginButton>
            <LoginButton type="primary" onClick={handleGoSignUp} size='large'>
              Зарегистрироваться
            </LoginButton>
          </>
        )}
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
  color: #0B6623;
  background-color: white;
  margin-right: 40px;
`
