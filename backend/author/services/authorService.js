import { Author } from '../model/Author.js';
import ApiError from '../../common/exceptions/apiError.js';

class AuthorService {
  async createAuthor(name, surname) {
      const candidate = await Author.findOne({ name, surname });
      if (candidate) {
          throw ApiError.BadRequest('Такой автор уже есть в списке!');
      }

      return await Author.create({ name, surname })
  }

  async deleteAuthor(_id) {
    const candidate = await Author.findOne({ _id });
    if (!candidate) {
      throw ApiError.BadRequest('Такого авторы нет и в помине!');
    }
    return await Author.deleteOne({ _id });
  }

  async getAllAuthors () {
    return Author.find();
  }
}

export default new AuthorService();