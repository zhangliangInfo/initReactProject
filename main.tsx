import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './src/app'
import './src/index.css'

ReactDOM.createRoot(document.getElementById('app') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)