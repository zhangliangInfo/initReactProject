import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './src/app'
import './src/index.css'
import './index.d.ts'

const option = {
  appName: 'shop',
  sideMenuId: 1233
};

// 设置不展示哪些模块，如 'header'、'navigation'、'sidebar'、'widget'、'footer' 分别为 顶部条、菜单导航、左侧菜单、右侧挂件、底部信息，比如不展示左侧菜单：['sidebar']
const hideModules: string[] = [];

ReactDOM.createRoot(document.getElementById('app') as Element).render(
  <React.StrictMode>
    <window.ShopPageframe option={option} hideModules={hideModules}>
      <App />
    </window.ShopPageframe>
  </React.StrictMode>
)