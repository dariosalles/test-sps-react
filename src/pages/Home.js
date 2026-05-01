import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import spsLogo from "../assets/SPSConstultoria_007.png";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-container">
      <Header showHomeBtn={false} />

      <main className="home-content">
        <div className="welcome-section">
          <div className="welcome-card">
            <h1>Bem-vindo!</h1>
            <p>Você está autenticado como <strong>{user?.email}</strong></p>
            <p>Gerencie usuários do sistema através do card abaixo.</p>
          </div>

          <div className="logo-card">
            <img src={spsLogo} alt="SPS Group Logo" className="home-logo" />
          </div>
        </div>

        <div className="card-grid">
          <div className="info-card users-card" onClick={() => navigate("/users")}>
            <h3>👥 Gerenciar Usuários</h3>
            <p>Crie, edite, visualize e delete usuários do sistema.</p>
            <button className="card-action-btn">Acessar →</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}