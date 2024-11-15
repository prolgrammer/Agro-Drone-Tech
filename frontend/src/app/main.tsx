import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Provider as ReduxProvider} from 'react-redux'
import { store } from "./store"
import './index.css'

const customTheme = {
  token: {
    colorPrimary: '#0B6623',
  },  
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
    <ReduxProvider store={store}>
        {/* <AccessProvider> */}
          <RouterProvider router={router} />
        {/* </AccessProvider> */}
      </ReduxProvider>
    </ConfigProvider>
  </React.StrictMode>
)