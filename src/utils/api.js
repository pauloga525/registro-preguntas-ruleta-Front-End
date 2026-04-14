const API_BASE = ' http://localhost:8000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res;
}

export async function getNiveles() {
  const res = await fetch(`${API_BASE}/niveles/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener niveles');
  return res.json();
}

export async function getMaterias() {
  const res = await fetch(`${API_BASE}/materias`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener materias');
  return res.json();
}

export async function getPreguntas() {
  const res = await fetch(`${API_BASE}/preguntas`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener preguntas');
  return res.json();
}

export async function createPregunta(data) {
  const res = await fetch(`${API_BASE}/preguntas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.detail || 'Error al crear pregunta');
  }
  return res.json();
}

export async function deletePregunta(id) {
  const res = await fetch(`${API_BASE}/preguntas/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.detail || 'Error al eliminar pregunta');
  }
  return res.json();
}


export const updatePregunta = async (id, payload) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}/preguntas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
};

export async function logout() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.detail || 'Error al cerrar sesión');
  }

  return res.json();
}
