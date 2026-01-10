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
            const answers = req.body.answers;
            const books = await PreferenceService.recommendBooks(answers);
            res.json(books);
        } catch (e) {
          next(e);
        }
    }

}

export default new PreferenceController();