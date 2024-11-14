import { InputField } from "@shared/inputs"
import { PrivateWrapper } from "@shared/private-wrapper"
import { PrivateLayout } from "@widgets/layouts/private-layout"
import { Switch } from "antd"
import { styled } from "styled-components"

export const ProfilePage = () => {
  const handleClick = () => {
    console.log('заглушка')
  }
  return (
    <PrivateLayout>
      <Title>Профиль пользователя</Title>
      <PrivateWrapper
        title={"Учетная запись"}
        buttonText="Обновить"
        submit={handleClick}
      >
        <InputField 
          label="ФИО"
        />
        <InputField 
          label="Телефон"
        />
        <InputField 
          label="Почта"
        />
      </PrivateWrapper>

      <PrivateWrapper
        title={"Доступ и безопасность"}
        buttonText="Обновить"
      >
        <InputField 
          label="Логин"
        />
        <InputField 
          label="Пароль"
        />
      </PrivateWrapper>

      <PrivateWrapper
        title={"Уведомления"}
        buttonText="Обновить"  
      >
        <Container>
          <div>Уведомления</div>
          <Switch />
        </Container>
      </PrivateWrapper>
    </PrivateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 30px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1%);
  column-gap: 10%;
`