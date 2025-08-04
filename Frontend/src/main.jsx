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
import WishlistPage from './pages/WishlistPage.jsx'

import Login from './auth/Login.jsx'
import Signup from './auth/Signup.jsx'
import ProtectedRoute from "./auth/ProtectedRoute.jsx"
import { Navigate } from "react-router-dom";
import {WishlistProvider} from './context/WishlistContext.jsx'
import PlaceOrderPage from './routes/order/PlaceOrderPage.jsx'
import OrdersPage from './pages/OrderPage/OrdersPage.jsx'
import RequireAdmin from './routes/RequireAdmin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminUsers from './pages/admin/adminUser/AdminUsers.jsx'
import AdminProducts from './pages/admin/adminProduct/AdminProducts.jsx'
import AdminOrders from './pages/admin/adminOrder/AdminOrders.jsx'
import AdminSales from './pages/admin/adminSales/AdminSales.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminAddProduct from './pages/admin/adminAddProduct/AdminAddProduct.jsx'


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
  { path: "/orders", element: <OrdersPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/bag", element: <Bag /> },
  { path: "/product/:id", element: <ProductInfoPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/placeorder", element: <PlaceOrderPage /> },

  // 🛠️ FIX THIS BLOCK 👇
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      {
        path: "users", // ✅ now this is /admin/users
        element: <AdminUsers />
      },
      // Add other admin routes later like:
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "sales", element: <AdminSales /> },
    ],
  },
  { path: "/admin/products/add", element: <AdminAddProduct /> }
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myntraStore}>
       <WishlistProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
       </WishlistProvider>
    </Provider>
  </StrictMode>
)
