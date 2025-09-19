// src/api/imageService.js
import axios from 'axios';

export default class ImageService {
  async AdcionarImage(imagem, token) {
    try {
      const { data } = await axios.post('/media/images/', imagem, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
      throw error;
    }
  }

  async DeletarImagem(id, token) {
    if (!id) return;
    try {
      const { data } = await axios.delete(`/media/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      throw error;
    }
  }
}
