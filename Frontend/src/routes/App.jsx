import FetchItems from "../components/FetchItems";
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

function App() {

  return (
    <>
      <FetchItems/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
