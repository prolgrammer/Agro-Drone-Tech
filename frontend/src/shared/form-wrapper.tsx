import { Form } from "antd"
import { ReactNode } from "react"
import { styled } from "styled-components"

interface FormWrapperProps {
  children: ReactNode
  title?: string
}

export const FormWrapper = ({children, title }: FormWrapperProps) => {
  return (
    <Wrapper>
      {title && (
        <Title>{title}</Title>
      )}
      <div>
        {children}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 30px 40px;
  border-radius: 12px;
  background-color: #F3F7F4;
`
const Title = styled.h2`
  color: #0B6623;
  text-decoration: underline;
  margin-bottom: 2%;
`
