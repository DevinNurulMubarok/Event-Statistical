import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
  role: "CUSTOMER" | "ORGANIZER";
  pointsBalance: number;
  avatarUrl?: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const getUserFromStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined") return null;
    return JSON.parse(userStr) as User;
  } catch (err) {
    return null;
  }
};

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  user: getUserFromStorage(),
  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  updateUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
