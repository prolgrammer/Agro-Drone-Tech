import { Footer } from '@features/footer/footer'
import { Header } from '@features/header/header'
import { Layout, Menu } from 'antd'
import { Content} from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

interface SiteLayoutProps {
  children: ReactNode
}

export const PrivateLayout = ({ children }: SiteLayoutProps) => {

  const menuItems = [
    {
      key: '1',
      label: 'Домашняя страница',
      link: '/'
    },
    {
      key: '2',
      label: 'Профиль',
      link: '/private-office/profile'
    },
    {
      key: '3',
      label: 'Мои участки',
      link: '/private-office/area'
    },
    {
      key: '4',
      label: 'Мои запросы',
      link: '/private-office/query'
    },
    {
      key: '5',
      label: 'Список пользователей',
      link: '/private-office/users'
    }
  ]

  const items = menuItems.map(item => (
    <Menu.Item key={item.key}>
      <Link to={item.link}>{item.label}</Link>
    </Menu.Item>
  ))
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Header/>
      <Layout>
        <Sider width={'20%'} style={{ backgroundColor: '#CEE0D3', padding: '10px' }}>
          <MenuChildren>
            {items}
          </MenuChildren>
        </Sider>  
        <Content style={{ padding: '40px 40px 40px', backgroundColor: '#FFFFFF' }}>{children}</Content>
      </Layout>
      <Footer/>
    </Layout>
  )
}

const MenuChildren = styled(Menu)`
  background-color: #CEE0D3;
`