import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from './providers/RouterProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>,
)
