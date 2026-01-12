import fs from 'fs';
import path from 'path';
import { PREFERENCE_QUESTIONS } from '../preference/preferenceConfig.js';

async function createDataset() {
  const booksPath = path.resolve('./preference/all_books.json');
  const allBookIds = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const dataset = [];
  const NUM_EXAMPLES = 200;

  for (let i = 0; i < NUM_EXAMPLES; i++) {
    const answers = {};

    for (const q of PREFERENCE_QUESTIONS) {
      const option = getRandom(q.options);
      answers[q.id] = option.weight;
    }

    const books = [];
    const count = Math.floor(Math.random() * 2) + 1;

    while (books.length < count) {
      const id = getRandom(allBookIds);
      if (!books.includes(id)) books.push(id);
    }

    dataset.push({ answers, books });
  }

  fs.writeFileSync(
    path.resolve('./preference/synthetic_dataset.json'),
    JSON.stringify(dataset, null, 2)
  );

  console.log('✅ Dataset generated');
}

createDataset();
