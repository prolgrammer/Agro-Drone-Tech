import { PrivateWrapper } from "@shared/private-wrapper"
import { ArchiveLayout } from "@widgets/layouts/archive-layout"
import { Flex } from "antd"
import styled from "styled-components"

export const UserArchivePage = () => {
  return (
    <ArchiveLayout
      title="Пользователи"
    >
      <PrivateWrapper
        title="Пользователь 1"
        buttonText="Редактировать"
        route="/private-office/user/:id"
      >
        <Flex gap={'10%'}>
          <div style={{fontWeight: 'bold'}}>
            <Columns>Фио</Columns>
            <Columns>Телефон</Columns>
            <Columns>E-mail</Columns>
            <Columns>Количество участоков</Columns>
            <Columns>Количество запросов</Columns>
          </div>
          <div>
            <Columns>Ивано Иван Иванович</Columns>
            <Columns>Ивано Иван Иванович</Columns>
            <Columns>Ивано Иван Иванович</Columns>
            <Columns>Ивано Иван Иванович</Columns>
            <Columns>Ивано Иван Иванович</Columns>
          </div>
        </Flex>
      </PrivateWrapper>
    </ArchiveLayout>
  )
}

const Columns = styled.div`
  margin-bottom: 10%;
`
