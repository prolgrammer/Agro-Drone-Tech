import { ChangePasswordForm, ProfileForm } from "@features/forms"
import { FormWrapper } from "@shared/form-wrapper"
import { Flex } from "antd"
import { styled } from "styled-components"

export const Profile = () => {
  return (
    <>
      <Title>Профиль пользователя</Title>
      <Flex gap='large' vertical>
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
