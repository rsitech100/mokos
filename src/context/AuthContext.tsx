"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export default function AuthProvider({
  children,
  initialUser,
  initialToken,
}: {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken =
      Cookies.get("token") || localStorage.getItem("token");

    if (initialUser && initialToken) {
      setLoading(false);
      return;
    }

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
      const res: any = await apiService.get("/v1/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "*/*",
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("User fetch gagal:", err);
      logout(() => {
        window.location.href = "/auth/login";
      });
    } finally {
      setLoading(false);
    }
  };

  const login = (authToken: string) => {
    Cookies.set("token", authToken, {
      secure: process.env.NODE_ENV === "production",
      expires: 7,
    });

    localStorage.setItem("token", authToken);

    setToken(authToken);
    fetchUserData(authToken);
  };

  const logout = (callback?: () => void) => {
    Cookies.remove("token");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    if (callback) callback();
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !!user,
        user,
        token,
        login,
        logout,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
