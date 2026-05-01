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
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    action: null,
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    type: "user",
    password: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limparFormulario = () => {
    setFormData({
      nome: "",
      email: "",
      type: "user",
      password: "",
    });
    setEditandoId(null);
    setMostraFormulario(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editandoId) {
        // Atualizar usuário
        await UserService.atualizar(editandoId, formData);
        mostrarMensagem("Usuário atualizado com sucesso!", "sucesso");
      } else {
        // Criar novo usuário
        await UserService.criar(formData);
        mostrarMensagem("Usuário criado com sucesso!", "sucesso");
      }

      limparFormulario();
      carregarUsuarios();
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (usuario) => {
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      type: usuario.type,
      password: usuario.password,
    });
    setEditandoId(usuario.id);
    setMostraFormulario(true);
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
        {!mostraFormulario && (
          <button 
            className="btn-novo-usuario"
            onClick={() => setMostraFormulario(true)}
            disabled={loading}
          >
            + Novo Usuário
          </button>
        )}
      </div>

      <div className="users-main">
        {mensagem && (
          <div className={`mensagem ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        {mostraFormulario && (
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>{editandoId ? "Editar Usuário" : "Novo Usuário"}</h2>

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
                  required={!editandoId}
                  disabled={loading}
                  placeholder={editandoId ? "Deixar em branco para não mudar" : ""}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-salvar"
                disabled={loading}
              >
                {loading ? "Salvando..." : editandoId ? "Atualizar" : "Criar"}
              </button>
              <button 
                type="button" 
                className="btn-cancelar"
                onClick={limparFormulario}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="users-table-card">
          <h2>Lista de Usuários</h2>

          {loading && !mostraFormulario ? (
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
                          className="btn-editar"
                          onClick={() => handleEditar(usuario)}
                          disabled={loading}
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

