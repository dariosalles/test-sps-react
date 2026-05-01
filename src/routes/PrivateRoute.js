import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // Função para validar token JWT
  function isTokenValid(token) {
    try {
      const decoded = jwtDecode(token);
      // Verifica se o token não expirou
      if (decoded.exp) {
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Se não tem usuário ou token inválido, redireciona para login
  if (!user || !token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}