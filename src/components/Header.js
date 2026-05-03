import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/SPSConstultoria_007.png";
import "../styles/Header.css";

export default function Header({ showHomeBtn = true }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="home-header">
      <div className="header-content">
        <div className="header-left">
          <img src={logo} alt="SPS Consultoria" className="logo" />
          <p>Painel de Controle</p>
        </div>
        <div className="header-right">
           {showHomeBtn && (
            <button className="home-btn" onClick={() => navigate("/")} title="Voltar ao Home">
              🏠
            </button>
          )}
          <span className="user-name">{user?.nome}</span>
          <button className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
