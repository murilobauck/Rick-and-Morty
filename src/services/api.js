import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const characterService = {
  // Buscar personagens com paginação e filtro
  getCharacters: async (page = 1, name = '') => {
    try {
      const params = { page: page.toString() };
      if (name && name.trim() !== '') {
        params.name = name.trim();
      }
      
      const response = await api.get('/character', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar personagem por ID
  getCharacterById: async (id) => {
    try {
      const response = await api.get(`/character/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar personagens por URL (para paginação)
  getCharactersByUrl: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;