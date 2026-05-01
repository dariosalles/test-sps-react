// ============ LocalStorage Helpers ============

const CACHE_KEY = "usuarios_cache";
const USER_KEY = "user";
const TOKEN_KEY = "token";

// Salvar no localStorage com tratamento de erro
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error);
  }
}

// Carregar do localStorage com tratamento de erro
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
}

// Remover do localStorage
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover ${key} do localStorage:`, error);
  }
}

// ============ Usuarios Cache Helpers ============

export function loadUsersCache() {
  return getLocalStorage(CACHE_KEY) || [];
}

export function saveUsersCache(usuarios) {
  setLocalStorage(CACHE_KEY, usuarios);
}

export function clearUsersCache() {
  removeLocalStorage(CACHE_KEY);
}

// ============ Auth Helpers ============

export function saveUser(userData) {
  setLocalStorage(USER_KEY, userData);
}

export function getUser() {
  return getLocalStorage(USER_KEY);
}

export function removeUser() {
  removeLocalStorage(USER_KEY);
}

export function saveToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Erro ao salvar token:", error);
  }
}

export function getToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Erro ao recuperar token:", error);
    return null;
  }
}

export function removeToken() {
  removeLocalStorage(TOKEN_KEY);
}

export function clearAuth() {
  removeUser();
  removeToken();
}
