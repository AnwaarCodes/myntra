import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import Bag from "./routes/Bag.jsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/Home.jsx'
import myntraStore from './store/index.js'
import {Provider} from "react-redux"
import ProductInfoPage from './components/ProductInfo/ProductInfoPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home/>  },
      {
        path: "/bag",
        element: < Bag/>,
        // action: createPostAction,
      },
      {
        path: "/product/:id",
        element: <ProductInfoPage />
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myntraStore} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
