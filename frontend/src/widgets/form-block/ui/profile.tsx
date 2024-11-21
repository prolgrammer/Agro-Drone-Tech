import { ChangePasswordForm, ProfileForm } from "@features/forms"
import { FormWrapper } from "@shared/form-wrapper"
import { Button, Flex } from "antd"
import { styled } from "styled-components"
import { refreshToken } from "@entities/GateWay/auth"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"
import { RootState } from "app/store"

export const Profile = () => {
  const refreshTokenString = Cookies.get('refreshToken')
  const userId = useSelector((state: RootState) => state.token.id)

  return (
    <>
      <Title>Профиль пользователя</Title>
      <Flex gap='large' vertical>
      <Button type="primary" onClick={() => {refreshToken(userId!, {refresh: refreshTokenString!})}}>refresh</Button>
        <FormWrapper
          title={"Учетная запись"}
        >
          <ProfileForm />
        </FormWrapper>
      
        <FormWrapper
          title={"Доступ и безопасность"}
        >
          <ChangePasswordForm />
        </FormWrapper>
      </Flex>
    </>
  )
}

const Title = styled.h1`
  color: #0B6623;
`
