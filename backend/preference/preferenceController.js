import { PREFERENCE_QUESTIONS } from './preferenceConfig.js';
import PreferenceService from './services/preferenceService.js';

class PreferenceController {
    getQuestions (req, res, next) {
        try {
            res.json(PREFERENCE_QUESTIONS);
        } catch (err) {
            next(err);
        }
    }

    async sendAnswers(req, res, next) {
        try {
            const answers = req.body;
             const userId = req.user.id;

            const books = await PreferenceService.recommendBooks(userId, answers);
            res.json(books);
        } catch (e) {
          next(e);
        }
    }

    async getBooks(req, res, next) {
        try {
             const userId = req.user.id;
            const books = await PreferenceService.getRecommendedBooks(userId);
            res.json(books);
        } catch (e) {
          next(e);
        }
    }

}

export default new PreferenceController();