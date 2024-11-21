import { Footer } from '@features/footer/footer'
import { Header } from '@features/header/header'
import { Layout, Menu, Spin } from 'antd'
import { Content} from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { menuItems, tokenDataSlice } from './model'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/store'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface SiteLayoutProps {
  children: ReactNode
}

export const PrivateLayout = ({ children }: SiteLayoutProps) => {
  const dispatch: AppDispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const items = menuItems.map(item => (
    <Menu.Item key={item.key}>
      <Link to={item.link}>{item.label}</Link>
    </Menu.Item>
  ))

  useEffect(() => {
    const token = Cookies.get('accessToken')

    if (token) {
      try {
        const decoded = jwtDecode(token)
        dispatch(tokenDataSlice.actions.setProfile(decoded))
      } catch (error) {
        console.log('Ошибка токена', error)
        dispatch(tokenDataSlice.actions.clearProfile())

        if (window.location.pathname !== '/log-in') {
          window.location.replace('/log-in')
        }
      }
    } else {
      dispatch(tokenDataSlice.actions.clearProfile())
      
      if (window.location.pathname !== '/log-in') {
        window.location.replace('/log-in')
      }
    }

    setIsLoading(false)
  }, [dispatch])

  if (isLoading) return <Spin fullscreen spinning percent={100} indicator={<Spin size="large" />} size='large'/>

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