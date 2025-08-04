// import { Outlet, Link } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="admin-dashboard">
//       <aside className="admin-sidebar">
//         <h3>📊 Admin</h3>
//         <nav>
//           <Link to="/admin/users">Users</Link>
//           <Link to="/admin/products">Products</Link>
//           <Link to="/admin/orders">Orders</Link>
//           <Link to="/admin/sales">Sales</Link>
//         </nav>
//       </aside>

//       <main className="admin-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;


import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, Users, Package, ClipboardList, BarChart2 } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-12 space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart2 size={24} /> Admin Panel
        </h2>
        <nav className="space-y-3">
          <Link
            to="/admin/users"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            <Users className="inline mr-2" size={18} /> Users
          </Link>
          <Link
            to="/admin/products"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            <Package className="inline mr-2" size={18} /> Products
          </Link>
          <Link
            to="/admin/orders"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            <ClipboardList className="inline mr-2" size={18} /> Orders
          </Link>
          <Link
            to="/admin/sales"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            <BarChart2 className="inline mr-2" size={18} /> Sales
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

