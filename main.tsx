import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Router from 'router'
import { RouterProvider } from 'react-router-dom'
import Loading from '@component/loading'
import zhCN from 'antd/locale/zh_CN'
import { App, ConfigProvider } from 'antd'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import '@assets/css/app.less'

ReactDOM.createRoot(document.getElementById('app') as Element).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={{
      components: {
        Segmented: {
          itemSelectedBg: '#1677ff',
          itemSelectedColor: '#ffffff',
        }
      }
    }}>
      <div className='rootWrap'>
        <App>
          <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
            <RouterProvider router={Router} fallbackElement={<Loading />} />
          </StyleProvider>
        </App>
      </div>
    </ConfigProvider>
  </React.StrictMode>
)