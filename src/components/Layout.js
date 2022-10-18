import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { extendedApiSlice } from "../features/posts/postSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  dispatch(extendedApiSlice.endpoints.getPosts.initiate());
  return (
    <>
      <Navbar />
      <main className="app">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
