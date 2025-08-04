import FetchItems from "../components/FetchItems";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <FetchItems />
      <Outlet />
        {/* 👇 Toast container globally at root */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        
      <Footer />
    </>
  );
}

export default App;
