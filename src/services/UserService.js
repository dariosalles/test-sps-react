import { getToken, loadUsersCache, saveUsersCache } from "../helpers/storageHelpers";

const API_URL = process.env.REACT_APP_SERVER_URL;

const UserService = {

  // Listar todos os usuários
  async listar() {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const textResponse = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Erro ao listar usuários";
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      try {
        const usuarios = JSON.parse(textResponse);
        // Salva no cache
        saveUsersCache(usuarios);
        return usuarios;
      } catch {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      // Retorna do cache como fallback
      return loadUsersCache();
    }
  },

  // Criar novo usuário
  async criar(userData) {
    try {
      const token = getToken();
      console.log("🔐 Token enviado:", token ? `${token.substring(0, 20)}...` : "VAZIO");
      
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const textResponse = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Erro ao criar usuário";
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      try {
        const response = JSON.parse(textResponse);
        const novoUsuario = response.usuario;
        
        // Adiciona ao cache
        const usuarios = loadUsersCache();
        usuarios.push(novoUsuario);
        saveUsersCache(usuarios);
        
        return response;
      } catch {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  // Obter um usuário
  async obter(id) {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const textResponse = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Erro ao obter usuário";
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      try {
        const usuario = JSON.parse(textResponse);
        return usuario;
      } catch {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      throw error;
    }
  },

  // Atualizar usuário
  async atualizar(id, userData) {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const textResponse = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Erro ao atualizar usuário";
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      try {
        const response = JSON.parse(textResponse);
        const usuarioAtualizado = response.usuario;
        
        // Atualiza no cache
        const usuarios = loadUsersCache();
        const index = usuarios.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
          usuarios[index] = usuarioAtualizado;
          saveUsersCache(usuarios);
        }
        
        return response;
      } catch {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  },

  // Deletar usuário
  async deletar(id) {
    try {
      const token = getToken();
      
      // Buscar usuário para validar se é admin
      const usuario = await this.obter(id);
      
      // Validar se é o email de entrada do sistema
      if (usuario.email === "admin@spsgroup.com.br") {
        throw new Error("Não é permitido deletar o usuário administrador do sistema!");
      }

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const textResponse = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Erro ao deletar usuário";
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      try {
        const response = JSON.parse(textResponse);
        
        // Remove do cache
        const usuarios = loadUsersCache();
        const usuariosAtualizado = usuarios.filter(u => u.id !== parseInt(id));
        saveUsersCache(usuariosAtualizado);
        
        return response;
      } catch {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  },
};

export default UserService;
