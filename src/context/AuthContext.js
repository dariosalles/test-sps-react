import { createContext, useContext, useState } from "react";
import { 
  getUser, 
  saveUser, 
  removeUser, 
  saveToken, 
  clearAuth,
  loadUsersCache,
  saveUsersCache
} from "../helpers/storageHelpers";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return getUser();
  });

  async function login(email, password) {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const userData = data.user;

      console.log("Token recebido:", data.token ? `${data.token.substring(0, 20)}...` : "VAZIO");

      setUser(userData);
      saveUser(userData);
      saveToken(data.token);

      // Sincronizar admin ao cache (localStorage) de usuários
      const usuarios = loadUsersCache();
      
      // Verificar se admin já existe no cache (localStorage)
      if (!usuarios.some(u => u.email === userData.email)) {
        usuarios.push(userData);
        saveUsersCache(usuarios);
      }

      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  }

  function logout() {
    setUser(null);
    removeUser();
    clearAuth();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}