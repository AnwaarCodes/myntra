import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import myntraStore from './store/index.js'

import App from './routes/App.jsx'
import Home from './routes/Home.jsx'
import Bag from "./routes/Bag.jsx"
import ProductInfoPage from './routes/ProductInfoPage.jsx'

import Login from './auth/Login.jsx'
import Signup from './auth/Signup.jsx'
import ProtectedRoute from "./auth/ProtectedRoute.jsx"
import { Navigate } from "react-router-dom";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <App />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: "/", element: <Home /> },
//     ],
//   },
//   { path: "/bag", element: <Bag /> },
//   { path: "/product/:id", element: <ProductInfoPage /> },
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
// ]);



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signup" /> 
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
    ],
  },
  { path: "/bag", element: <Bag /> },
  { path: "/product/:id", element: <ProductInfoPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
