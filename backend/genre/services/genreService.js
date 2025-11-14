import { Genre } from '../model/Genre.js';
import ApiError from '../../common/exceptions/apiError.js';

class GenreService {
  async createGenre(name) {
    const candidate = await Genre.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest('Такой жанр уже есть в списке!');
    }
    await Genre.create({ name });
  }

  async deleteGenre(_id) {
    const candidate = await Genre.findOne({ _id });
    if (!candidate) {
      throw ApiError.BadRequest('Такого жанра нет и в помине!');
    }
    await Genre.deleteOne({ _id });
  }

  async getAllGenres () {
    return Genre.find();
  }
}

export default new GenreService();