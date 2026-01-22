import { $api } from '@/apiConfig.ts';
import type { Answer } from '@/types/preference.ts';

export default class PreferenceService {
    static async getQuestions() {
        return $api.get('/api/questions');
    }
    static async sendAnswers(answers: Answer[]) {
        return $api.post('/api/answers', answers);
    }
    static async getRecommnedBooks() {
        return $api.get('/api/recommend-books');
    }
}
