import { Footer } from '@features/footer/footer'
import { Header } from '@features/header/header'
import { Layout } from 'antd'
import { Content} from 'antd/es/layout/layout'
import { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

export const SiteLayout = ({ children }: SiteLayoutProps) => {

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Header/>
      <Content>{children}</Content>
      <Footer/>
    </Layout>
  )
}

