import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import "../styles/Users.css";

function UserNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    type: "user",
    password: "",
  });

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await UserService.criar(formData);
      mostrarMensagem("Usuário criado com sucesso!", "sucesso");

      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-container">
      <Header />

      <div className="users-content-wrapper">
        <div className="back-button-container">
          <button 
            className="btn-voltar"
            onClick={() => navigate("/users")}
            disabled={loading}
          >
            ← Voltar
          </button>
        </div>

        <main className="user-content">
          <div className="users-main">
            {mensagem && (
              <div className={`mensagem ${mensagem.tipo}`}>
                {mensagem.texto}
              </div>
            )}

            <form className="form-card" onSubmit={handleSubmit}>
              <h2>Novo Usuário</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                    <option value="gerente">Gerente</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Digite uma senha segura"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-salvar"
                  disabled={loading}
                >
                  {loading ? "Criando..." : "Criar Usuário"}
                </button>
                <button 
                  type="button" 
                  className="btn-cancelar"
                  onClick={() => navigate("/users")}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default UserNew;
