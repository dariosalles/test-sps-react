import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import UserService from "../services/UserService";
import "../styles/Users.css";

function Users() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    action: null,
  });

  // Carregar usuários ao montar
  useEffect(() => {
    carregarUsuarios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const dados = await UserService.listar();
      setUsuarios(dados);
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem(null), 3000);
  };

  const abrirModal = (title, message, type = "info", action = null) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      action,
    });
  };

  const fecharModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
      type: "info",
      action: null,
    });
  };

  const handleEditar = (usuario) => {
    navigate(`/users/${usuario.id}/edit`);
  };

  const handleDeletar = (id) => {

    const usuario = usuarios.find(u => u.id === id);

    if (usuario.email === "admin@spsgroup.com.br") {
      mostrarMensagem("Não é permitido deletar o usuário administrador do sistema!", "erro");
      return;
    }

    abrirModal(
      "Confirmar Exclusão",
      `Tem certeza que deseja deletar o usuário <b>${usuario.nome}</b>? Esta ação não pode ser desfeita.`,
      "error",
      async () => {
        fecharModal();
        setLoading(true);
        try {
          await UserService.deletar(id);
          mostrarMensagem("Usuário deletado com sucesso!", "sucesso");
          carregarUsuarios();
        } catch (erro) {
          mostrarMensagem(erro.message, "erro");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="users-container">
      <Header />
      
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.action}
        onCancel={fecharModal}
        confirmText={modal.type === "error" ? "Deletar" : "Confirmar"}
        cancelText="Cancelar"
      />
      <div className="users-content-wrapper">
      <div className="back-button-container">
        <button 
          className="btn-voltar"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          ← Voltar
        </button>
      </div>
      <main className="user-content">
      <div className="users-header">
        <h1>Gerenciar Usuários</h1>
        <button 
          className="btn-novo-usuario"
          onClick={() => navigate("/users/novo")}
          disabled={loading}
        >
          + Novo Usuário
        </button>
      </div>

      <div className="users-main">
        {mensagem && (
          <div className={`mensagem ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        <div className="users-table-card">
          <h2>Lista de Usuários</h2>

          {loading ? (
            <p style={{ textAlign: "center", color: "#999" }}>Carregando...</p>
          ) : usuarios.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum usuário cadastrado</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Data de Criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.type}</td>
                    <td>
                      {new Date(usuario.dataCriacao).toLocaleDateString("pt-BR")}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className={`btn-editar ${usuario.email === "admin@spsgroup.com.br" ? "disabled-admin" : ""}`}
                          onClick={() => handleEditar(usuario)}
                          disabled={loading || usuario.email === "admin@spsgroup.com.br"}
                          title={usuario.email === "admin@spsgroup.com.br" ? "Não é permitido editar o usuário administrador" : ""}
                        >
                          Editar
                        </button>
                        <button
                          className={`btn-deletar ${usuario.email === "admin@spsgroup.com.br" ? "disabled-admin" : ""}`}
                          onClick={() => handleDeletar(usuario.id)}
                          disabled={loading || usuario.email === "admin@spsgroup.com.br"}
                          title={usuario.email === "admin@spsgroup.com.br" ? "Não é permitido deletar o usuário administrador" : ""}
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </main>
    </div>
    <Footer />
    </div>
  );
}

export default Users;

