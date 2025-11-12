import { Author } from '../model/Author.js';
import ApiError from '../../common/exceptions/apiError.js';

class AuthorService {
  async createAuthor(name) {
    const candidate = await Author.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest('Такой автор уже есть в списке!');
    }
    await Author.create({ name });
  }

  async deleteAuthor(_id) {
    const candidate = await Author.findOne({ _id });
    if (!candidate) {
      throw ApiError.BadRequest('Такого авторы нет и в помине!');
    }
    await Author.deleteOne({ _id });
  }

  async getAllAuthors () {
    return Author.find();
  }
}

export default new AuthorService();