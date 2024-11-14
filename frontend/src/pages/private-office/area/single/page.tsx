import { InputField } from "@shared/inputs"
import { PrivateWrapper } from "@shared/private-wrapper"
import { CreateLayout } from "@widgets/layouts/create-layout"
import { Radio, RadioChangeEvent, Space } from "antd"
import { useState } from "react"
import styled from "styled-components"

export const AreaSinglePage = () => {
  const [value, setValue] = useState(0)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio', e.target.value)
    setValue(e.target.value)
  }

  return (
    <CreateLayout
      title="Редактирование участка"
    >
      <PrivateWrapper
        buttonText="Сохранить"
      >
        <Title>Название</Title>
        <InputField 
          label="Введите значение"
        />
        <Title>Расположение</Title>
        <Title>Тип почвы</Title>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Глинистая</Radio>
            <Radio value={2}>Суглинистая</Radio>
            <Radio value={3}>Известковая</Radio>
            <Radio value={4}>Песчаная</Radio>
            <Radio value={5}>Супесчаная</Radio>
            <Radio value={6}>Болотистая</Radio>
          </Space>
        </Radio.Group>
        <Title>Посаженная культура</Title>
        <InputField 
          label="Введите значение"
        />
      </PrivateWrapper>
    </CreateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 18px;
`