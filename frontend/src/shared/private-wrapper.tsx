import { Button } from "antd"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"

interface PrivateWrapperProps {
  children: ReactNode
  title?: string
  submit?: any
  buttonText?: string
  route?: string
}

export const PrivateWrapper = ({children, title, buttonText, route, submit}: PrivateWrapperProps) => {
  const navigate = useNavigate()

  const handleGo = () => {
    if(route) {
      navigate(route)
    }
  }

  return (
    <Wrapper>
      {title && (
        <Title>{title}</Title>
      )}
      {children}
      {route && buttonText && (
        <Button type="primary" ghost style={{borderRadius: '20px', display: 'block'}} onClick={handleGo}>
          {buttonText}
        </Button>
      )}

      {submit && buttonText && (
        <Button type="primary" ghost style={{borderRadius: '20px', display: 'block'}} onClick={submit}>
          {buttonText}
        </Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px;
  border-radius: 12px;
  background-color: #F3F7F4;
  & > *:not(:last-child) {
    margin-bottom: 2%; 
  }
  margin-bottom: 2%;
  margin-top: 2%;
`
const Title = styled.div`
  color: #0B6623;
  text-decoration: underline;
  font-size: 23px;
  margin-bottom: 3%;
`
