import mongoose from 'mongoose';

const UserRecommendSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

UserRecommendSchema.index({ user_id: 1, book_id: 1 }, { unique: true });

export const UserRecommend = mongoose.model('UserRecommend', UserRecommendSchema);
