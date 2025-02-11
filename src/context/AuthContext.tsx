"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import apiService from "@/app/api/api";

type User = {
      fullName: string;
      email: string;
      role: {
            name: string;
            privileges: string[];
            merchant: string | null;
      };
      profilePhoto: string | null;
};

type AuthContextType = {
      isAuthenticated: boolean;
      user: User | null;
      token: string | null;
      login: (token: string) => void;
      logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
      isAuthenticated: false,
      user: null,
      token: null,
      login: () => { },
      logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
      const [user, setUser] = useState<User | null>(null);
      const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
      const [loading, setLoading] = useState(true);


      useEffect(() => {
            const storedToken = Cookies.get("token") || localStorage.getItem("token");  // ✅ Cek juga di localStorage
            // console.log("AuthProvider - Token ditemukan:", storedToken);
 
            if (storedToken) {
                  setToken(storedToken);
                  fetchUserData(storedToken);
            } else {
                  setLoading(false);
            }
      }, []);

      const fetchUserData = async (authToken: string) => {
            try {
                  console.log("Fetching user dengan token:", authToken);  // ✅ Debug token sebelum dikirim

                  const response = await apiService.get("/v1/user", {
                        headers: {
                              Authorization: `Bearer ${authToken}`,
                              Accept: "*/*",
                        },
                  });

                  if (!response.data) throw new Error("User data kosong");

                  console.log("User data berhasil didapatkan:", response.data);
                  setUser(response.data);
            } catch (error) {
                  console.error("Gagal fetch user:", error);
                  logout();
            } finally {
                  setLoading(false);
            }
      };


      const login = (authToken: string) => {
            console.log("Login - Token disimpan:", authToken);

            Cookies.set("token", authToken, { secure: process.env.NODE_ENV === "production", expires: 7 });
            localStorage.setItem("token", authToken);  // ✅ Simpan ke localStorage juga

            setToken(authToken);
            fetchUserData(authToken);
      };


      const logout = () => {
            Cookies.remove("token");
            setUser(null);
            setToken(null);
      };

      return (
            <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout }}>
                  {!loading && children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
