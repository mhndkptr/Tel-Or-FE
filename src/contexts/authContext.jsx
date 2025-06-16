"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import request, { axiosBaseConfig } from "@/utils/baseRequest";
import { Bounce, toast } from "react-toastify";
import ToastContent from "@/components/_shared/toast/ToastContent";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const axiosInstance = axios.create(axiosBaseConfig);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const res = await request.get(`/users/${decoded.userId}`);
        setUser(res.data.data);
        setRole(decoded.role);
      }
    } catch (error) {
      console.error("Error checking user login status:", error);
      if (error.response?.data?.status === 200) {
        toast.error(<ToastContent title={"Terjadi kesalahan!"} description={error.response?.data?.message} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      if (res.data.status === 200) {
        Cookies.set("accessToken", res.data.data.accessToken, { secure: true, sameSite: "strict" });
        Cookies.set("refreshToken", res.data.data.refreshToken, { secure: true, sameSite: "strict" });
        const decoded = jwtDecode(res.data.data.accessToken);
        await checkUserLoggedIn();
        setRole(decoded.role);
        return { success: true, redirectPath: "/dashboard" };
      } else {
        return {
          success: false,
          code: res.data.code,
          statusCode: res.data.status,
          message: `${res.data?.res.data?.name || res.data?.code}: ${res.data?.res.data?.message || res.data?.message}`,
        };
      }
    } catch (error) {
      if (error.name === "AxiosError") {
        return {
          success: false,
          statusCode: error.response?.status || 500,
          message: error.response?.data?.message || "An unexpected error occurred",
        };
      } else {
        console.error("Login error:", error);
        throw Object.assign(new Error(error.message ? error.message : "Something Went Wrong!"), { statusCode: 500 });
      }
    }
  };

  const logout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await request.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
      toast.success(<ToastContent title={"Berhasil keluar!"} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/auth/login");
    }
  };

  const isAuthenticated = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        await checkUserLoggedIn();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Authentication error: ", error);
      return false;
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ user, role, loading, login, logout, isAuthenticated, checkUserLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
