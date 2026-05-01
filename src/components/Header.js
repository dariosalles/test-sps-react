import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

export default function Header({ showHomeBtn = true }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="home-header">
      <div className="header-content">
        <div className="header-left">
          {showHomeBtn && (
            <button className="home-btn" onClick={() => navigate("/")} title="Voltar ao Home">
              🏠
            </button>
          )}
          <h2>SPS GROUP</h2>
          <p>Painel de Controle</p>
        </div>
        <div className="header-right">
          <span className="user-name">{user?.nome}</span>
          <button className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
