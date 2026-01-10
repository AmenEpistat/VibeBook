import axios from 'axios';
import { PREFERENCE_QUESTIONS } from '../preferenceConfig.js';
import { Book } from '../../book/model/Book.js';
import BookDto from '../../book/dto/bookDto.js';

function encodeAnswers(answers) {
  const vector = [];
  for (const q of PREFERENCE_QUESTIONS) {
    const val = answers[q.id];
    const option = q.options.find(o => o.value === val);
    vector.push(option ? option.weight : 0);
  }
  return vector;
}

class PreferenceService {
  async recommendBooks(userAnswers) {
    const answers = encodeAnswers(userAnswers);

    const { data } = await axios.post('http://localhost:5000/predict', { answers });

    const books = await Book.find({ _id: { $in: data.recommend } })
      .populate('author_id', 'name surname')
      .populate('genres_id', 'name');

    return books.map(book => new BookDto(book));
  }
}

export default new PreferenceService();
