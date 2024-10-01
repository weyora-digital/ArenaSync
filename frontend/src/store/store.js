import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    auth: {
        username: '',
        active: false,
        token: null,
    },
    setUsername: (name) => set((state) => ({
        auth: { ...state.auth, username: name, active: true }
      })),
      setToken: (token) => set((state) => ({
        auth: { ...state.auth, token: token }
      })),
      logout: () => set((state) => ({
        auth: { username: '', active: false, token: null }
      })),
}))

export const useAdminStore = create((set) => ({
  admin: {
    email: '',
    isAuthenticated: false,
  },
  loginAdmin: (email) => set({ admin: { email, isAuthenticated: true } }),
  logoutAdmin: () => set({ admin: { email: '', isAuthenticated: false } }),
}));