import { Outlet, Navigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

export default function Body() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(removeUser());
      } else {
        console.error("Session check failed:", err);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && ["/", "/login", "/signup"].includes(pathname)) {
    return <Navigate to="/feed" replace />;
  }

  // Guests should not access protected pages.
  if (!user && ["/feed", "/profile"].includes(pathname)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-base-200 text-base-content">
      <a
        href="#main-content"
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:z-50"
      >
        Skip to content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 lg:py-16"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
