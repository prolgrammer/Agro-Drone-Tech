import { InputField } from "@shared/inputs"
import { CreateLayout } from "@widgets/layouts/create-layout"
import { Radio, RadioChangeEvent, Space } from "antd"
import { useState } from "react"
import styled from "styled-components"
import { FormWrapper } from "@shared/form-wrapper"

export const AreaCreatePage = () => {
  const [value, setValue] = useState(0)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio', e.target.value)
    setValue(e.target.value)
  }

  const handleClick = () => {
    console.log('заглушка')
  }

  return (
    <CreateLayout
      title="Создание нового участка"
    >
      <FormWrapper
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
      </FormWrapper>
    </CreateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 18px;
`