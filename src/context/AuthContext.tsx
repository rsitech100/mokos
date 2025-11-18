"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import apiService from "@/app/api/api";

type User = {
      fullName: string;
      email: string;
      phone?: string;
      role: {
            name: string;
            privileges: string[];
            merchant: string | null;
      };
      profilePhoto: string | null | { id: string; uri: string; name?: string; module?: string };
      dob?: string;
      gender?: string;
};

type AuthContextType = {
      isAuthenticated: boolean;
      user: User | null;
      token: string | null;
      login: (token: string) => void;
      logout: (callback?: () => void) => void;
      updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType>({
      isAuthenticated: false,
      user: null,
      token: null,
      login: () => { },
      logout: () => { },
      updateUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
      const [user, setUser] = useState<User | null>(null);
      const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
      const [loading, setLoading] = useState(true);


      useEffect(() => {
            const storedToken = Cookies.get("token") || localStorage.getItem("token");  
 
            if (storedToken) {
                  setToken(storedToken);
                  fetchUserData(storedToken);
            } else {
                  setLoading(false);
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const fetchUserData = async (authToken: string) => {
            try {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const response: any = await apiService.get("/v1/user", {
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
                  // Token invalid atau expired, logout dan redirect ke login
                  logout(() => {
                        if (typeof window !== 'undefined') {
                              window.location.href = '/auth/login';
                        }
                  });
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


      const logout = (callback?: () => void) => {
            Cookies.remove("token");
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            
            // Call callback jika ada (untuk redirect)
            if (callback) {
                  callback();
            }
      };

      const updateUser = (userData: Partial<User>) => {
            setUser((prevUser) => (prevUser ? { ...prevUser, ...userData } : null));
      };

      return (
            <AuthContext.Provider value={{ isAuthenticated: !!token && !!user, user, token, login, logout, updateUser }}>
                  {!loading && children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
