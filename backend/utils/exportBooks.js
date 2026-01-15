import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import BookService from '../book/services/bookService.js';

export async function exportBooksJSON() {
  try {
      await mongoose.connect(process.env.MONGO_URL);

      const books = await BookService.getAllBooks();
      const allBookIds = books.map(b => b._id.toString());
      const filePath = path.resolve('./preference/all_books.json');
      fs.writeFileSync(filePath, JSON.stringify(allBookIds, null, 2));
      console.log(`Экспортировано ${allBookIds.length} книг в ${filePath}`);
  } catch (err) {
      console.log('Ошибка при экспорте книг:', err);
  } finally {
      await mongoose.disconnect();
  }
}
