import { ReactNode } from 'react'
import { PrivateLayout } from './private-layout'
import { styled } from 'styled-components'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface SiteLayoutProps {
  children: ReactNode
  title?: string
  route?: string
}

export const ArchiveLayout = ({ children, title, route }: SiteLayoutProps) => {
  const navigate = useNavigate()

  const handleGo = () => {
    if(route) {
      navigate(route)
    }
  }
  
  return (
    <PrivateLayout>
      <Container>
        <Title>{title}</Title>
        { route ? (
          <Button type="primary" style={{borderRadius: '20px'}} onClick={handleGo}>
            Создать
          </Button>
        ) : (
          <></>
        )}
      </Container>
      <div>{children}</div>
    </PrivateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 30px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 40%;
`
