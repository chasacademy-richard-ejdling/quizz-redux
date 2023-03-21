import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'hooks-for-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Admin from './Admin'
import Quizz from './Quizz'
import Home from './Home'

const router = createBrowserRouter([
  {
    element: <Root />,
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'admin',
        element: <Admin />
      },
      {
        path: 'quizz',
        element: <Quizz />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
