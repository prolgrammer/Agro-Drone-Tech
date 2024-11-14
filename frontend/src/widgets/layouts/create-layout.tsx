import { ReactNode } from 'react'
import { PrivateLayout } from './private-layout'
import { styled } from 'styled-components'

interface SiteLayoutProps {
  children: ReactNode
  title?: string
}

export const CreateLayout = ({ children, title }: SiteLayoutProps) => {

  return (
    <PrivateLayout>
      <Title>{title}</Title>
      <div>{children}</div><br />
    </PrivateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 30px;
`
