import BookService from '../../book/services/bookService.js';

class PreferenceService {
    async recommendBooks() {
        return await BookService.getBookById('6917451dd727715b157fe276');
    }
}

export default new PreferenceService();