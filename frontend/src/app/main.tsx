import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './index.css'
// import { SessionProvider } from '@widgets/session/session-provider'

const customTheme = {
  token: {
    colorPrimary: '#0B6623',
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      {/* <SessionProvider> */}
        <RouterProvider router={router} />
      {/* </SessionProvider> */}
    </ConfigProvider>
  </React.StrictMode>
)
